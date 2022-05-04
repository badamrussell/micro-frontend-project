import download from "./download";
import { mountMicroFrontEnd, unmountMicroFrontEnd } from './mount';

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
    if (navigationHistory.length > 0) {
        unmountMicroFrontEnd();
    }

    const microFrontendName = getMicroFrontEndNameFromPath(pathname);

    if (!microFrontendName) {
        throw new Error(
            "I don't know which Micro Frontend to load for the current URL :("
        );
    }

    navigationHistory.push(pathname);
    window.history.pushState({}, '', pathname);

    const microFrontendEntryPointUrl = getMicroFrontEndEntryPoint(
        microFrontendName
    );

    return download(microFrontendEntryPointUrl).then(microFrontendDocument =>
        mountMicroFrontEnd(microFrontendName, microFrontendDocument)
    );
}

export { navigateTo };
