import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const usersRepository = new UsersRepository();

export const usersService = new UsersService(usersRepository);
