import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './modules/notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { DateModule } from './core/adapter/date/date.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    NotesModule,
    DateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
