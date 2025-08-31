import { ensureShared } from '../validators/shared.validator';

export const rabbitmqConfig = {
  getConfig() {
    const e = ensureShared();
    return {
      url: e.RMQ_URL,
      exchange: e.RMQ_EXCHANGE,
      prefetch: e.RMQ_PREFETCH,
    };
  },
};
