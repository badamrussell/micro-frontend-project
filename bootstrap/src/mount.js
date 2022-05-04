const CLASS_NAME = 'mounted-by-bootstrap';


function moveNodeToDoc(parent, doc) {
  return function moveNode(node) {
    if (node.tagName === 'SCRIPT') {
      const clonedNode = doc.createElement(node.tagName);
      [...node.attributes].forEach(att => clonedNode.setAttribute(att.name, att.value));
      clonedNode.innerHTML = node.innerHTML;
      clonedNode.classList.add(CLASS_NAME);
      parent.appendChild(clonedNode);
      return;
    }

    const newNode = doc.adoptNode(node);
    newNode.classList.add(CLASS_NAME);
    parent.appendChild(newNode);
  }
}

function createOrUpdateBaseTag(name) {
  const [existingBaseElement] = document.getElementsByTagName('base');

  if (existingBaseElement) {
    existingBaseElement.setAttribute('href', `/mfe/${name}/`);
    return;
  }

  const baseEl = document.createElement('base');
  baseEl.setAttribute('href', `/mfe/${name}/`);
  document.head.appendChild(baseEl);
}

function mountMicroFrontEnd(name, doc) {
  createOrUpdateBaseTag(name);

  const headNodes = doc.querySelectorAll('head>*');
  const bodyNodes = doc.querySelectorAll('body>*');

  headNodes.forEach(moveNodeToDoc(document.head, document));
  bodyNodes.forEach(moveNodeToDoc(document.body, document));
}

function unmountMicroFrontEnd() {
  const els = document.querySelectorAll(`.${CLASS_NAME}`);

  els.forEach(el => {
    if (el.parentElement) {
      el.parentElement.removeChild(el);
    }
  });
}

export { mountMicroFrontEnd, unmountMicroFrontEnd };