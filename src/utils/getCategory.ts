'use strict';

export const getCategory = (path: string) => {
  let category: string;

  switch (path) {
    case '/phones':
      category = 'phones';
      break;

    case '/tablets':
      category = 'tablets';
      break;

    case '/accessories':
      category = 'accessories';
      break;

    default:
      category = '';
  }

  return category;
};
