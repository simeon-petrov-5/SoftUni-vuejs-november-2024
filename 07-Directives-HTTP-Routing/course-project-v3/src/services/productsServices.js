import axiosDJ from '../config/axiosDJ';

const ENDPOINT = 'products';

export async function getAllProducts() {
  try {
    const response = await axiosDJ.get(`/${ENDPOINT}`);
    return response.data.products;
  }
  catch (e) {
    console.error('Oops unexpected', e);
    return [];
  }
}

export async function getProductsByCategory(categorySlug) {
  try {
    const response = await axiosDJ.get(`/${ENDPOINT}/category/${categorySlug}`);
    return response.data.products;
  }
  catch (e) {
    console.error('Oops unexpected', e);
    return [];
  }
}
