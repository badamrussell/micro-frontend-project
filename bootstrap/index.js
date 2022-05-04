
function download(url) {
  const request = new XMLHttpRequest();
  request.timeout = 5000;
  request.responseType = 'document';

  return new Promise((res, rej) => {
    request.onerror = () => rej(new Error('Error while downloading'));
    request.ontimeout = () => rej(new Error('Request timed out'));

    request.onload = () => {
      if (request.status >= 400) {
        rej(new Error(`Weird HTTP Status: ${request.status}`));
      }
      res(request.response);
    };
    request.open('GET', url);
    request.send();
  });
}


function getNameFromPath(pathname = window.location.pathname) {
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

function createOrUpdateBaseTag(name) {
  const baseEl = document.createElement('base');
  baseEl.setAttribute('href', `/mfe/${name}/`);
  document.head.appendChild(baseEl);
}

function moveNodeToDoc(parent, doc) {
  return function moveNode(node) {
    if (node.tagName === 'SCRIPT') {
      const clonedNode = doc.createElement(node.tagName);
      [...node.attributes].forEach(att => clonedNode.setAttribute(att.name, att.value));
      clonedNode.innerHTML = node.innerHTML;

      parent.appendChild(clonedNode);
      return;
    }

    const newNode = doc.adoptNode(node);
    parent.appendChild(newNode);
  }
}

function mountMicroFrontEnd(name, doc) {
  createOrUpdateBaseTag(name);

  const headNodes = doc.querySelectorAll('head>*');
  const bodyNodes = doc.querySelectorAll('body>*');

  headNodes.forEach(moveNodeToDoc(document.head, document));
  bodyNodes.forEach(moveNodeToDoc(document.body, document));
}


const mFrontEndName = getNameFromPath();
const microFrontEndPath = `/mfe/${mFrontEndName}/index.html`;
download(microFrontEndPath).then(doc => {
  mountMicroFrontEnd(mFrontEndName, doc);
});
