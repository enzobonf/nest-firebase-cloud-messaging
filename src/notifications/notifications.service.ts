import { FcmService } from '@doracoder/fcm-nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  constructor(private readonly fcmService: FcmService) {}

  async sendNotification() {
    const devices = JSON.parse(process.env.DEVICES);

    return await this.fcmService.sendNotification(
      devices,
      {
        data: {
          propriedades: 'Sim',
          aviarios: 'não',
        },
        notification: {
          body: 'aaaaaa',
          title: 'Teste de notificação',
        },
      },
      false,
    );
  }
}
