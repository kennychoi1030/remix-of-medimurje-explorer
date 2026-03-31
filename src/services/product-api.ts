/**
 * Product CRUD Mock API
 * All functions simulate network delay and are structured to be replaced
 * by real Laravel API calls via axios/fetch.
 */

import { ProductData } from "@/data/products";

const SIMULATED_DELAY = 1000;
const delay = (ms = SIMULATED_DELAY) => new Promise((r) => setTimeout(r, ms));

let productStore: ProductData[] = [];

export const initProductStore = (products: ProductData[]) => {
  productStore = [...products];
};
export const getProductStore = () => productStore;

/** POST /api/products */
export async function createProduct(data: Omit<ProductData, "id" | "created_at">): Promise<ProductData> {
  // TODO: Connect to Laravel API — POST /api/products
  // TODO: Connect to Laravel API - Send as Multipart/Form-Data. See Laravel Controller Request validation.
  // TODO: Laravel backend should handle this featured flag
  await delay();
  const product: ProductData = {
    ...data,
    id: `prod-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  productStore = [product, ...productStore];
  return product;
}

/** PUT /api/products/:id */
export async function updateProduct(id: string, data: Partial<ProductData>): Promise<ProductData> {
  // TODO: Connect to Laravel API — PUT /api/products/${id}
  // TODO: Connect to Laravel API - Send as Multipart/Form-Data. See Laravel Controller Request validation.
  // TODO: Laravel backend should handle this featured flag
  await delay();
  productStore = productStore.map((p) => (p.id === id ? { ...p, ...data } : p));
  return productStore.find((p) => p.id === id)!;
}

/** DELETE /api/products/:id (Laravel Soft Delete) */
export async function deleteProduct(id: string): Promise<void> {
  // TODO: Connect to Laravel API — DELETE /api/products/${id}
  await delay();
  productStore = productStore.filter((p) => p.id !== id);
}

/** POST /api/products/:id/restore */
export async function restoreProduct(product: ProductData): Promise<void> {
  // TODO: Connect to Laravel API — POST /api/products/${product.id}/restore
  await delay();
  productStore = [product, ...productStore];
}
