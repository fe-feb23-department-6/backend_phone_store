/* eslint-disable no-console */
import { Token } from '../models/Token';

const save = async(userId: number, refreshToken: string) => {
  try {
    console.log('TEST SAVE ID', userId);
    console.log('TEST SAVE TOKEN', refreshToken);

    const token = await Token.findOne({
      where: { userId },
    });

    console.log('TOKEN BEFORE', token);

    if (token) {
      // token.refreshToken = refreshToken;

      await token.update({ refreshToken });

      return;
    }

    console.log('TOKEN AFTER', token);

    const test = await Token.create({ userId, refreshToken });

    console.log('TOKEN CREATE', test);
  } catch (error) {
    console.error('!!!!Error while saving the token!!!!: ', error);
    throw new Error('Failed to save token');
  }
};

const getByToken = async(refreshToken: string) => {
  return Token.findOne({
    where: { refreshToken },
  });
};

const remove = async(userId: number) => {
  return Token.destroy({
    where: { userId },
  });
};

export const tokenService = {
  getByToken,
  save,
  remove,
};
