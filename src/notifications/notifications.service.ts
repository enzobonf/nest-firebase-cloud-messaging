import { FcmService } from '@doracoder/fcm-nestjs';
import { Injectable } from '@nestjs/common';

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import * as fs from 'fs';

enum TipoNotificacao {
  NOTIFICACAO = '1',
  ALARME = '2',
}

@Injectable()
export class NotificationsService {
  credentials: any;

  constructor(private readonly fcmService: FcmService) {
    this.credentials = fs.readFileSync('..\\..\\firebase.credentials.json');
    console.log(this.credentials);
  }

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
