import { ensureShared } from '../validators/shared.validator';

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

export const notificationsConfig = {
  /** Delay for BullMQ (24 hours) */
  getPushDelayMs() {
    return ensureShared().PUSH_DELAY_HOURS * ONE_HOUR_IN_MS;
  },
};
