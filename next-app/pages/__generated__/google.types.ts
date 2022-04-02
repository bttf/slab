import * as Types from '../../types';

import { useMutation, UseMutationOptions } from 'react-query';

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
export type AuthWithGoogleMutationVariables = Types.Exact<{
  code: Types.Scalars['String'];
}>;


export type AuthWithGoogleMutation = { __typename?: 'Mutation', authWithGoogle?: string | null };


export const AuthWithGoogleDocument = `
    mutation AuthWithGoogle($code: String!) {
  authWithGoogle(code: $code)
}
    `;
export const useAuthWithGoogleMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AuthWithGoogleMutation, TError, AuthWithGoogleMutationVariables, TContext>
    ) =>
    useMutation<AuthWithGoogleMutation, TError, AuthWithGoogleMutationVariables, TContext>(
      ['AuthWithGoogle'],
      (variables?: AuthWithGoogleMutationVariables) => fetcher<AuthWithGoogleMutation, AuthWithGoogleMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AuthWithGoogleDocument, variables)(),
      options
    );