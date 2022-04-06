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
export type DashboardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DashboardQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', uuid: any, email: string } | null };


export const DashboardDocument = `
    query Dashboard {
  viewer {
    uuid
    email
  }
}
    `;
export const useDashboardQuery = <
      TData = DashboardQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: DashboardQueryVariables,
      options?: UseQueryOptions<DashboardQuery, TError, TData>
    ) =>
    useQuery<DashboardQuery, TError, TData>(
      variables === undefined ? ['Dashboard'] : ['Dashboard', variables],
      fetcher<DashboardQuery, DashboardQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DashboardDocument, variables),
      options
    );