import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "../../middleware/interceptor";

export const folderAPI = createApi({
  reducerPath: "folderAPI",
  baseQuery: customFetchBase,
  tagTypes: ["Folder"],
  providesTags: (result, error, id) => [{ type: "Folder", id }],
  endpoints: (build) => ({
    getFolders: build.query({
      query: () => ({
        url: "folder",
      }),
      transformResponse: (response) => response.result.folder,
      providesTags: (result) => ["Folder"],
    }),
    getFolder: build.query({
      query: (id) => ({
        url: `folder?id=${id}`,
      }),
      transformResponse: (response) => response.result.files,
    }),
    createFolder: build.mutation({
      query: (content) => ({
        url: "folder",
        method: "POST",
        body: content,
      }),
      invalidatesTags: ["Folder"],
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
      invalidatesTags: ["Folder"],
    }),
    getFolderFiles: build.query({
      query: (id) => ({
        url: `folder?id=${id}`,
      }),
      transformResponse: (response) => response.result.files,
      providesTags: (result) => ["Folder"],
    }),
  }),
});

export const {
  useChangeFolderMutation,
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useGetFolderQuery,
  useGetFoldersQuery,
  useGetFolderFilesQuery,
} = folderAPI;
