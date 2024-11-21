import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { SignUpUseCase } from './use-cases/auth/sign-up.use-case';
import { UserService } from './services/user/user.service';
import { UserRepository } from './repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './controllers/user/user.controller';
import { SignInUseCase } from './use-cases/auth/sign-in.use-case';
import { GetCurrentUseCase } from './use-cases/user/get-current.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController, UserController],
  providers: [
    UserRepository,
    UserService,
    SignUpUseCase,
    SignInUseCase,
    GetCurrentUseCase,
  ],
})
export class UserModule {}
