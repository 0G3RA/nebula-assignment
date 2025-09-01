import { Module } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [PushNotificationService],
  exports: [PushNotificationService],
})
export class PushModule {}
