import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bayutApi = createApi({
  reducerPath: "bayutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pg-review-guard-backend.onrender.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "bd9812d039mshaf648f73f6fe561p1d9206jsnc85ea1d15d4e"
        // Old key "b0834bc328msh0d81b6138d53f5ep1bdadejsn4c1a3d09b114"
      );
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProperyList: builder.query({
      query: () => `/properties?page=1&page_size=60`,
    }),
    getProperyDetails: builder.query({
      query: (id) => `/properties/${id}`,
    }),
    getAgencyList: builder.query({
      query: (phrase) => `/agencies/list?query=${phrase}`,
    }),
    searchProperties: builder.query({
      query: ({ city, query, page = 1, page_size = 15 }) => {
        const searchParams = new URLSearchParams({ page, page_size });
        if (city) searchParams.append("city", city);
        if (query) searchParams.append("city", query);

        return `/properties/search/city?${searchParams.toString()}`;
      },
    }),
  }),
});

export const {
  useGetProperyListQuery,
  useGetProperyDetailsQuery,
  useGetAgencyListQuery,
  useSearchPropertiesQuery,
} = bayutApi;
