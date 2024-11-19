/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "mutation Auth($email: String!, $password: String!) {\n  Auth {\n    loginJwt(input: {email: $email, password: $password}) {\n      clientMutationId\n      loginResult {\n        jwtTokens {\n          accessToken\n          refreshToken\n        }\n      }\n    }\n  }\n}": types.AuthDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Auth($email: String!, $password: String!) {\n  Auth {\n    loginJwt(input: {email: $email, password: $password}) {\n      clientMutationId\n      loginResult {\n        jwtTokens {\n          accessToken\n          refreshToken\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').AuthDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
