'use strict';

import { Users } from '../models/Users';

const createUser = async(
  name: string,
  email: string,
  password: string,
  activationToken: string,
): Promise<Users> => {
  return Users.create({
    name,
    email,
    password,
    activationToken,
  });
};

export const authService = {
  createUser,
};
