import { Token } from '../models/Token';

const save = async(userId: number, refreshToken: string) => {
  const token = await Token.findOne({
    where: { userId },
  });

  if (token) {
    token.dataValues.refreshToken = refreshToken;

    await token.save();

    return;
  }

  await Token.create({ userId, refreshToken });
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
