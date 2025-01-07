import axiosDJ from '../config/axiosDJ';
import { logger } from '../utils/logger';

export async function getPaginatedUsers(qParams = { limit: 10, skip: 0 }) {
  const query = new URLSearchParams(qParams);
  try {
    const res = await axiosDJ.get(`/users?${query.toString()}`);
    return res.data;
  }
  catch (e) {
    logger.error(e);
    return [];
  }
}

export async function getSingleUser(id) {
  try {
    const res = await axiosDJ.get(`/users/${id}`);
    return res.data;
  }
  catch (e) {
    logger.error(e);
    return null;
  }
}
