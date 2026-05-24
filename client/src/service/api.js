import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
  }),
  endpoints: (build) => ({
    registration: build.mutation({
      query: ({ registerData }) => ({
        url: "auth/registration",
        method: "POST",
        body: registerData,
      }),
    }),
  }),
});

export const { useRegistrationMutation } = apiService;
