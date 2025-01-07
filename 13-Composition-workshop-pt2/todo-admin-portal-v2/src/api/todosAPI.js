import axiosDJ from '../config/axiosDJ';
import { logger } from '../utils/logger';

export async function getAllTodos() {
  try {
    const res = await axiosDJ.get('/todos?limit=0');
    return res.data.todos;
  }
  catch (e) {
    logger.error(e);
    return [];
  }
}
