import {GraphQLClient} from 'graphql-request';

import {ENDPOINT_URL} from '../../../environment';

const GRAPHQL_ENDPOINT = `${ENDPOINT_URL}/graphql`;

export const createGraphQLClient = (graphQlEndpoint: string) =>
  new GraphQLClient(graphQlEndpoint);
export const graphQLClient = createGraphQLClient(GRAPHQL_ENDPOINT);
