export type Message<T = any> = {
  routingKey: string;
  data: T;
};
