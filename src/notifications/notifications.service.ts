import { FcmService } from '@doracoder/fcm-nestjs';
import { Injectable } from '@nestjs/common';

import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

enum TipoNotificacao {
  NOTIFICACAO = '1',
  ALARME = '2',
}

@Injectable()
export class NotificationsService {
  credentials: any;

  constructor(private readonly fcmService: FcmService) {}

  async sendNotification() {
    const devices = JSON.parse(process.env.DEVICES);
    const db = getFirestore();

    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });

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
