import { apiSlice } from './apiSlice';

const TRANSPORTS_URL = '/api/v1/transports';

export const transportsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTransport: builder.mutation({
      query: (transport) => ({
        url: TRANSPORTS_URL,
        method: 'POST',
        body: transport,
      }),
      invalidatesTags: ['Transport'],
    }),
    getMyTransports: builder.query({
      query: () => ({
        url: `${TRANSPORTS_URL}/my`,
      }),
      providesTags: ['Transport'],
      keepUnusedDataFor: 5,
    }),
    getTransports: builder.query({
      query: () => ({
        url: TRANSPORTS_URL,
      }),
      providesTags: ['Transport'],
      keepUnusedDataFor: 5,
    }),
    getTransportDetails: builder.query({
      query: (transportId) => ({
        url: `${TRANSPORTS_URL}/${transportId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateTransportStatus: builder.mutation({
      query: (data) => ({
        url: `${TRANSPORTS_URL}/${data.transportId}/status`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Transport'],
    }),
    deleteTransport: builder.mutation({
      query: (transportId) => ({
        url: `${TRANSPORTS_URL}/${transportId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Transport'],
    }),
  }),
});

export const {
  useCreateTransportMutation,
  useGetMyTransportsQuery,
  useGetTransportsQuery,
  useGetTransportDetailsQuery,
  useUpdateTransportStatusMutation,
  useDeleteTransportMutation,
} = transportsApiSlice;
