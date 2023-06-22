import download from "./download";
import { mountMicroFrontEnd, unmountMicroFrontEnd } from './mount';
import { dispatchEvent, eventNames } from "./events";

function getMicroFrontEndNameFromPath(pathname = window.location.pathname) {
  const [, name] = pathname.split('/');

  switch (name) {
    case 'hello':
      return 'welcome';
    case 'play':
      return 'music';
    default:
      return '';
  }
}

function getMicroFrontEndEntryPoint(mFrontEndName) {
  return `/mfe/${mFrontEndName}/index.html`;
}

const navigationHistory = [];

function navigateTo(pathname) {
  const microFrontendName = getMicroFrontEndNameFromPath(pathname);

  if (!microFrontendName) {
      throw new Error(
          "I don't know which Micro Frontend to load for the current URL :("
      );
  }

    if (navigationHistory.length > 0) {
      const currentMicroFrontend = getMicroFrontEndNameFromPath(
        navigationHistory[navigationHistory.length - 1]
      );
      dispatchEvent(eventNames.MICRO_FRONTEND_WILL_UNMOUNT, {
        microFrontendName: currentMicroFrontend
      });
      unmountMicroFrontEnd();
      dispatchEvent(eventNames.MICRO_FRONTEND_DID_UNMOUNT, {
        microFrontendName: currentMicroFrontend
      });
    }

    dispatchEvent(eventNames.MICRO_FRONTEND_WILL_MOUNT, { microFrontendName });
    navigationHistory.push(pathname);
    window.history.pushState({}, "", pathname);


    const microFrontendEntryPointUrl = getMicroFrontEndEntryPoint(
        microFrontendName
    );
    
    return download(microFrontendEntryPointUrl)
        .then(microFrontendDocument =>
            mountMicroFrontEnd(microFrontendName, microFrontendDocument)
        )
        .then(() => {
            dispatchEvent(eventNames.MICRO_FRONTEND_DID_MOUNT, {
                microFrontendName
            });
        });
}

export { navigateTo };
