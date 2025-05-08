import { UserEntity } from 'src/modules/user/entities/user.entity';

export type IGetCurrentUseCaseInput = {
  user?: UserEntity;
};

export type IGetCurrentUseCaseOutput = {
  profile: {
    id: string;
    name: string;
    email: string;
    lastLogin?: Date;
  };
};
