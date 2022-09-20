import { FcmModule } from '@doracoder/fcm-nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

@Module({
  imports: [
    NotificationsModule,
    FcmModule.forRoot({
      firebaseSpecsPath: path.join(
        __dirname,
        '../teste-stac-firebase-adminsdk-vpqqq-df4a6ddfbe.json',
      ),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
