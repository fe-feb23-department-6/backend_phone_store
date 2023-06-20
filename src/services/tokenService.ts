import { Token } from '../models/Token';

const save = async(userId: number, refreshToken: string) => {
  try {
    const token = await Token.findOne({
      where: { userId },
    });

    if (token) {
      await token.update({ refreshToken });

      return;
    }

    await Token.create({ userId, refreshToken });
  } catch (error) {
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
