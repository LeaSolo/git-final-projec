import apiSlice from "../../app/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "/products",
    }),
    getProductById: build.query({
      query: (id) => `/products/${id}`,
    }),
    createProduct: build.mutation({
      query: (data) => ({
        url: "products/createproduct",
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
