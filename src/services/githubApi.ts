import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  GitHubSearchResponse,
  GitHubUser,
  GitHubRepository,
  GitHubIssue,
  SearchType,
} from '../types';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/search',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/vnd.github+json');
      headers.set('X-GitHub-Api-Version', '2022-11-28');
      return headers;
    },
  }),
  tagTypes: ['SearchResults'],
  endpoints: (builder) => ({
    searchGithub: builder.query<
      GitHubSearchResponse<GitHubUser | GitHubRepository | GitHubIssue>,
      { query: string; type: SearchType; page: number }
    >({
      query: ({ query, type, page }) => `${type}?q=${query}&page=${page}&per_page=50`,
      providesTags: ['SearchResults'],
    }),
  }),
});

export const { useSearchGithubQuery } = githubApi;
