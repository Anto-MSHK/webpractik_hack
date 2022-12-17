import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "../../middleware/interceptor";

export const fileAPI = createApi({
  reducerPath: "fileAPI",
  baseQuery: customFetchBase,
  tagTypes: ["Files"],
  providesTags: (result, error, id) => [{ type: "Files", id }],
  endpoints: (build) => ({
    getFiles: build.query({
      query: () => ({
        url: "file",
      }),
      transformResponse: (response) => response.result.folder,
      providesTags: (result) => ["Files"],
    }),
  }),
});

export const { useGetFilesQuery } = fileAPI;
