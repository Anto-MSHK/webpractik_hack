import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { createToken, removeToken } from "../store/services/tokenService";

const baseUrl = `https://serverpractik-hack.onrender.com/api/`;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().token.tokenValue;
    if (token && endpoint !== "refresh") {
      headers.set("authorization", `Bearer ${token}`);
      // headers.set('content-type', 'text/plain');
    }
    return headers;
  },
});

const customFetchBase = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        credentials: "include",
        url: "refresh",
      },
      { ...api, endpoint: "refresh" },
      extraOptions
    );

    if (refreshResult.data) {
      api.dispatch(createToken(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(removeToken())
    }
  }
  return result;
};

export default customFetchBase;
