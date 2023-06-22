function createPublicApi({ navigateTo, eventNames }) {
  window.bootstrap = {
      router: {
          navigateTo,
      },
      eventNames,
  };
}

export { createPublicApi }
