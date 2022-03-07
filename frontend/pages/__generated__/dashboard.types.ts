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
export type TestQueryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestQueryQuery = { __typename?: 'Query', hello?: string | null };


export const TestQueryDocument = `
    query TestQuery {
  hello
}
    `;
export const useTestQueryQuery = <
      TData = TestQueryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: TestQueryQueryVariables,
      options?: UseQueryOptions<TestQueryQuery, TError, TData>
    ) =>
    useQuery<TestQueryQuery, TError, TData>(
      variables === undefined ? ['TestQuery'] : ['TestQuery', variables],
      fetcher<TestQueryQuery, TestQueryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, TestQueryDocument, variables),
      options
    );