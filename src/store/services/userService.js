import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "../../middleware/interceptor";

//fetchBaseQuery({
//         baseUrl: 'http://localhost:5000/api/',
//         prepareHeaders: (headers) => {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 headers.set('authorization', `Bearer ${token}`);
//                 headers.set('content-type', 'text/plain');
//             }
//             return headers;
//         }
//     })

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => {
        return {
          url: `user/${id}`,
        };
      },
    }),
    getUsers: build.query({
      query: () => ({
        url: "users",
      }),
    }),
    changeUserInf: build.mutation({
      query: (content) => ({
        url: "user",
        method: "PUT",
        body: content,
      }),
    }),
    createAnswers: build.mutation({
      query: (content) => ({
        url: "tests/save",
        method: "POST",
        body: content,
      }),
    }),
    getAvatar: build.query({
      query: (path) => ({
        url: `avatar/${path}`,
      }),
    }),
    updateImg: build.mutation({
      query: (content) => ({
        url: "avatar",
        method: "POST",
        body: content,
      }),
    }),
  }),
});

export const {
  useUpdateImgMutation,
  useCreateAnswersMutation,
  useGetUserQuery,
  useGetAvatarQuery,
  useGetUsersQuery,
  useChangeUserInfMutation,
} = userAPI;
