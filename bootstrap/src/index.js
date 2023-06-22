import { navigateTo } from './router';
import { createPublicApi } from './publicApi';
import { eventNames } from "./events";

createPublicApi({
  navigateTo,
  eventNames,
});

navigateTo(window.location.pathname);