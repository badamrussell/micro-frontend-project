
function downloadDocument(url) {
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

export default downloadDocument;
