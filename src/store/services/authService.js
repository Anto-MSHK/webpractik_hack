import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "../../middleware/interceptor";

export const authAPI = createApi({
  reducerPath: "authAPI",
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: `https://serverpractik-hack.onrender.com/api/`,
  //   }),
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (content) => ({
        url: "registration",
        method: "POST",
        body: content,
      }),
    }),
    signUpTop: build.mutation({
      query: (content) => ({
        url: "account/active",
        method: "POST",
        body: content,
      }),
    }),
    signIn: build.mutation({
      query: (content) => ({
        url: "login",
        method: "POST",
        body: content,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignUpTopMutation,
  useSignInMutation,
  useLogoutMutation,
} = authAPI;
