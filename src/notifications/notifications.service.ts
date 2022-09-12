import { FcmService } from '@doracoder/fcm-nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  constructor(private readonly fcmService: FcmService) {}

  async sendNotification() {
    const devices = [];

    await this.fcmService.sendNotification();
  }
}
