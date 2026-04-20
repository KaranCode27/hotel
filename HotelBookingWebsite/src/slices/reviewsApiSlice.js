import { apiSlice } from './apiSlice';

const REVIEWS_URL = '/api/v1/reviews';
const HOTELS_URL = '/api/v1/hotels';

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHotelReviews: builder.query({
      query: (hotelId) => ({
        url: `${HOTELS_URL}/${hotelId}/reviews`,
      }),
      keepUnusedDataFor: 5,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${HOTELS_URL}/${data.hotelId}/reviews`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `${REVIEWS_URL}/${reviewId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetHotelReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApiSlice;
