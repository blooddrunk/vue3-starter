import { ElMessage } from 'element-plus';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useSimpleFormStore = defineStore('simple-form', () => {
  const {
    data: products,
    isLoading: isProductLoading,
    execute: fetchProducts,
  } = useSimpleFormList();

  const { addProduct } = useAddProduct();
  const { removeProduct } = useRemoveProduct();

  return {
    products,
    isProductLoading,
    fetchProducts,
    addProduct: async (product) => {
      await addProduct(product);
      products.value = [product, ...products.value];
    },
    removeProduct: async (product) => {
      const { errorMessage } = await removeProduct(product);
      if (errorMessage.value) {
        ElMessage.error(errorMessage.value);
        throw new Error(errorMessage.value);
      } else {
        products.value = products.value.filter((p) => p.id !== product.id);
      }
    },
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSimpleFormStore, import.meta.hot));
}
