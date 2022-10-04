import { FcmService } from '@doracoder/fcm-nestjs';
import { Injectable } from '@nestjs/common';

import { getFirestore } from 'firebase-admin/firestore';

enum TipoNotificacao {
  NOTIFICACAO = '1',
  ALARME = '2',
}

@Injectable()
export class NotificationsService {
  constructor(private readonly fcmService: FcmService) {}

  async sendNotification() {
    const tokens = await this.getTokens();

    return await this.fcmService.sendNotification(
      tokens,
      {
        data: {
          propriedades: 'Sim',
          aviarios: 'não',
          tipo: TipoNotificacao.NOTIFICACAO,
          value: '30° C',
          value_1: '14:44 30/09/2022',
          icon_1: 'time',
          value_2: 'Temperatura maior que 27° C',
          icon_2: 'time',
          value_3: 'Aviario Galpao A',
          icon_3: 'time',
          value_4: 'Sonda na posicao 3',
          icon_4: 'time',
          value_5: '',
          icon_5: '',
        },
      },
      false,
    );
  }

  async sendAlarme() {
    const tokens = await this.getTokens();

    return await this.fcmService.sendNotification(
      tokens,
      {
        data: {
          tipo: TipoNotificacao.ALARME,
          id_aviario: '1',
          value: '75 °C',
          value_1: '14:44 30/09/2022',
          icon_1: 'schedule',
          value_2: 'Temperatura maior que 27 °C',
          icon_2: 'info',
          value_3: 'Aviário Galpão A',
          icon_3: 'home',
          value_4: 'Sonda na posição 3',
          icon_4: 'wifi-tethering',
          value_5: 'null',
          icon_5: 'null',
        },
      },
      false,
    );
  }

  private async getTokens() {
    const db = getFirestore();
    const doc = await db.collection('users').doc(process.env.EMAIL_DOC).get();
    return doc.data().tokens;
  }
}
