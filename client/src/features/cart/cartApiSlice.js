import apiSlice from "../../app/apiSlice";

const CartApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query({
      query: () => ({
        url: "/api/cart",
        method: "GET",
      }),
    }),
    addItemToCart: build.mutation({
      query: (newCart) => ({
        url: "/api/cart",
        method: "POST",
        body: newCart,
      }),
    }),
    updateCartItemQty: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/api/cart/${id}`,  
        method: "PUT",
        body: updatedData,
      }),
    }),
       home: build.mutation({
      query: (home) => ({
        url: `/home`,  
        method: "PUT",
        body: home,
      }),
    }),
    removeCartItem: build.mutation({
      query: (id) => ({
        url: `/api/cart/${id}`,  
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddItemToCartMutation,
  useUpdateCartItemQtyMutation,
  useRemoveCartItemMutation,
} = CartApiSlice;
