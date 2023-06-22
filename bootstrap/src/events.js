const eventNames = {
  MICRO_FRONTEND_WILL_UNMOUNT: 'bootstrap_micro_frontend_will_unmount',
  MICRO_FRONTEND_DID_UNMOUNT: 'bootstrap_micro_frontend_did_unmount',
  MICRO_FRONTEND_WILL_MOUNT: 'bootstrap_micro_frontend_will_mount',
  MICRO_FRONTEND_DID_MOUNT: 'bootstrap_micro_frontend_did_mount',
}

function dispatchEvent(eventName, eventDetail) {
  window.document.dispatchEvent(
    new window.CustomEvent(eventName, {
      detail: eventDetail,
    }),
  );
}

export {
  eventNames,
  dispatchEvent
}
