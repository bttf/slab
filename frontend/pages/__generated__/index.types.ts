import * as Types from '../../types';

import { useQuery, UseQueryOptions } from 'react-query';

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
export type GoogleAuthUrlQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GoogleAuthUrlQuery = { __typename?: 'Query', googleAuthUrl: string };


export const GoogleAuthUrlDocument = `
    query GoogleAuthUrl {
  googleAuthUrl
}
    `;
export const useGoogleAuthUrlQuery = <
      TData = GoogleAuthUrlQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GoogleAuthUrlQueryVariables,
      options?: UseQueryOptions<GoogleAuthUrlQuery, TError, TData>
    ) =>
    useQuery<GoogleAuthUrlQuery, TError, TData>(
      variables === undefined ? ['GoogleAuthUrl'] : ['GoogleAuthUrl', variables],
      fetcher<GoogleAuthUrlQuery, GoogleAuthUrlQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GoogleAuthUrlDocument, variables),
      options
    );