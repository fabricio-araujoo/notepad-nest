import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface AuthenticatedRequest {
  user?: UserEntity;
}
