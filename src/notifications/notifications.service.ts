import { FcmService } from '@doracoder/fcm-nestjs';
import { Injectable } from '@nestjs/common';

enum TipoNotificacao {
  NOTIFICACAO = '1',
  ALARME = '2',
}

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
          tipo: TipoNotificacao.NOTIFICACAO,
          title: 'Notificação na Propriedade Teste',
          body: 'descrição',
        },
      },
      false,
    );
  }

  async sendAlarme() {
    const devices = JSON.parse(process.env.DEVICES);

    return await this.fcmService.sendNotification(
      devices,
      {
        data: {
          propriedades: 'Sim',
          aviarios: 'não',
          id_aviario: '1',
          tipo: TipoNotificacao.ALARME,
          title: 'Alarme na Propriedade Teste',
          body: 'descrição',
        },
      },
      false,
    );
  }
}
