import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DateModule } from './core/adapter/date/date.module';
import { NotesModule } from './modules/notes/notes.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      dbName: 'tarefas',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
    UserModule,
    NotesModule,
    DateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
