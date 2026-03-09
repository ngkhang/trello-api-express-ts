/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-09
 ------------------------------------------------- */

import { ObjectId } from 'mongodb';

import { BadRequestError } from '~/core/responses/api-error.response';

export const objectToString = (objectId: ObjectId): string => {
  try {
    return objectId.toString();
  } catch (error) {
    throw new BadRequestError(`${error}`);
  }
};

export const stringIdToObject = (stringId: string): ObjectId => {
  try {
    return new ObjectId(stringId);
  } catch (error) {
    throw new BadRequestError(`${error}`);
  }
};

export const slugify = (text: string): string => {
  if (!text || !text.trim()) return '';

  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};
