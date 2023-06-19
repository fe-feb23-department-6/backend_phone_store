'use strict';

import { Users } from '../models/Users';

const createUser = async(
  name: string,
  email: string,
  password: string,
): Promise<Users> => {
  return Users.create({
    name,
    email,
    password,
  });
};

export const authService = {
  createUser,
};
