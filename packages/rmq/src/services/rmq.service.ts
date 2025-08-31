import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import amqp, { Channel, ChannelModel, ConfirmChannel, Options } from 'amqplib';
import { cfg } from '@app/config';
import type { SubscribeOptions } from '../interfaces/subscribe.interface';
import type { Message } from '../interfaces/message.type';

@Injectable()
export class RmqService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RmqService.name);

  private conn!: ChannelModel;
  private pub!: ConfirmChannel;
  private readonly config = cfg.rmq();
  private ready!: Promise<void>;
  async onModuleInit(): Promise<void> {
    this.ready = this.connect();
    await this.ready;
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.pub?.close();
    } catch (error) {
      this.logger.warn('Error closing publish channel', error as any);
    }
    try {
      await this.conn?.close();
    } catch (error) {
      this.logger.warn('Error closing connection', error as any);
    }
  }

  private async connect() {
    this.logger.log(`Connecting RMQ ${this.config.url} ...`);
    this.conn = await amqp.connect(this.config.url);

    this.pub = await this.conn.createConfirmChannel();
    await this.pub.assertExchange(this.config.exchange, 'topic', { durable: true });

    this.logger.log(`RMQ connected. exchange="${this.config.exchange}" (topic)`);
  }

  async publish(routingKey: string, data: unknown, opts?: Options.Publish): Promise<void> {
    await this.ready;
    const buf = Buffer.from(JSON.stringify(data));

    await new Promise<void>((resolve, reject) =>
      this.pub.publish(
        this.config.exchange,
        routingKey,
        buf,
        { contentType: 'application/json', persistent: true, ...opts },
        (err) => (err ? reject(new Error(String(err))) : resolve())
      )
    );

    this.logger.debug(`Published rk="${routingKey}" payload=${JSON.stringify(data)}`);
  }

  async subscribe(
    opts: SubscribeOptions,
    handler: (m: Message) => Promise<void> | void
  ): Promise<void> {
    await this.ready;

    const ch: Channel = await this.conn.createChannel();
    await ch.assertExchange(this.config.exchange, 'topic', { durable: true });

    await ch.assertQueue(opts.queue, {
      durable: true,
    });

    for (const key of opts.bindingKeys) {
      await ch.bindQueue(opts.queue, this.config.exchange, key);
    }

    const prefetch = opts.prefetch ?? this.config.prefetch;
    await ch.prefetch(prefetch);

    this.logger.log(
      `Consuming queue="${opts.queue}" keys=[${opts.bindingKeys.join(', ')}] prefetch=${prefetch}`
    );

    await ch.consume(
      opts.queue,
      (msg) => {
        if (!msg) return;
        void (async () => {
          try {
            const routingKey = msg.fields.routingKey;
            const raw = msg.content?.toString('utf8');
            const data = raw ? (JSON.parse(raw) as unknown) : {};

            await handler({ routingKey, data });
            ch.ack(msg);
            this.logger.debug(`Ack rk="${routingKey}"`);
          } catch (e) {
            this.logger.error('Handler error, nack (no requeue)', e as any);
            ch.nack(msg, false, false);
          }
        })();
      },
      { noAck: false }
    );
  }
}
