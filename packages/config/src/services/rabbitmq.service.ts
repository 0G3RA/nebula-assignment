import { ensureShared } from '../validators/shared.validator';

const buildAmqpUrl = (user: string, pass: string, host: string, port: number, vhost: string) => {
  const encUser = encodeURIComponent(user);
  const encPass = encodeURIComponent(pass);
  const path = vhost.startsWith('/') ? vhost : `/${vhost}`;
  return `amqp://${encUser}:${encPass}@${host}:${port}${path}`;
};

export const rabbitmqConfig = {
  getConfig() {
    const e = ensureShared();

    const url =
      e.RABBITMQ_URL ??
      buildAmqpUrl(
        e.RABBITMQ_USER,
        e.RABBITMQ_PASS,
        e.RABBITMQ_HOST,
        e.RABBITMQ_PORT,
        e.RABBITMQ_VHOST
      );

    return {
      url,
      exchange: e.RABBITMQ_EXCHANGE,
      prefetch: e.RABBITMQ_PREFETCH,
    };
  },
};
