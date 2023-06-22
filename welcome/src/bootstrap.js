
function goToMusicMicroFrontend() {
  if (!window.bootstrap) {
      console.log('Bootstrap is not available');
      return;
  }
  window.bootstrap.router.navigateTo('/play')
}

function getEventNames() {
  if (!window.bootstrap) {
      console.log('Bootstrap is not available');
      return {};
  }
  return window.bootstrap.eventNames;
}

export {
  goToMusicMicroFrontend,
  getEventNames,
}
