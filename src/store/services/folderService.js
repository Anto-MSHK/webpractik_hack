import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "../../middleware/interceptor";

export const folderAPI = createApi({
  reducerPath: "folderAPI",
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    getFolders: build.query({
      query: () => ({
        url: "folder",
      }),
      transformResponse: (response) => response.result.folder,
    }),
    getFolder: build.query({
      query: (id) => ({
        url: `folder?id=${id}`,
      }),
      transformResponse: (response) => response.result,
    }),
    createFolder: build.mutation({
      query: (content) => ({
        url: "folder",
        method: "POST",
        body: content,
      }),
    }),
    changeFolder: build.mutation({
      query: (content) => ({
        url: `folder/${content.id}`,
        method: "PUT",
        body: content.data,
      }),
    }),
    deleteFolder: build.mutation({
      query: (id) => ({
        url: `folder/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useChangeFolderMutation,
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useGetFolderQuery,
  useGetFoldersQuery,
} = folderAPI;
