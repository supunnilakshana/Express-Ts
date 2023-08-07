import { request, GraphQLClient } from 'graphql-request';

interface GraphQLError {
    message: string;
    locations: { line: number; column: number }[];
}

interface GraphQLResponse<T> {
    data: T;
    errors?: GraphQLError[];
}

// Replace 'YOUR_HASURA_GRAPHQL_ENDPOINT' with your Hasura GraphQL endpoint URL
const HASURA_GRAPHQL_ENDPOINT = 'https://test-permit.hasura.app/v1/graphql';

export async function executeGraphQLQuery<T>(
    query: string,
    variables?: any
) {
    const graphQLClient = new GraphQLClient(HASURA_GRAPHQL_ENDPOINT, {
        headers: {
            "x-hasura-admin-secret": "NE2s3eRG6gpWLdW5rFgXTpM65BFZYvT2M7XZrT0BhiKrtyuHPXOegecmFJYeukLa"
        },
    });

    try {
        const data: GraphQLResponse<T> = await graphQLClient.request<T>(query, variables) as GraphQLResponse<T>;
        console.log(data);

        return data;

    } catch (error) {
        console.error('GraphQL Error:', error);
        throw error;
    }
}
