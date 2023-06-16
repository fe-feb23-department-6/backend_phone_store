'use strict';

import { Users } from '../models/Users';
import { UserUpdateParams } from '../types/UserUpdateParams';

const findUser = async(userId: number): Promise<Users | null> => {
  return Users.findByPk(userId);
};

const createUser = async(name: string, email: string): Promise<Users> => {
  return Users.create({
    name,
    email,
  });
};

const removeUser = async(userId: number): Promise<number> => {
  return Users.destroy({
    where: { id: userId },
  });
};

const updateUser = async({ id, name }: UserUpdateParams) => {
  return Users.update({ name }, {
    where: { id },
  });
};

export const usersService = {
  findUser,
  createUser,
  removeUser,
  updateUser,
};
