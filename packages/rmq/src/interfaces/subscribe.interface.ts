export interface SubscribeOptions {
  queue: string;
  bindingKeys: string[];
  prefetch?: number;
}
