import gql from 'graphql-tag'

export const SEARCH_REPOSITORIES = gql`
  query searchRepositories($after: String, $before: String, $first: Int, $last: Int, $query: String!) {
    search(after: $after, before: $before, first: $first, last: $last, query: $query, type: REPOSITORY) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          ... on Repository {
            name
            url
            stargazers {
              totalCount
            }
            viewerHasStarred
          }
        }
      }
    }
  }
`

export const ME = gql`
  query me {
    user(login: "iteachonudemy") {
      id
      name
    }
  }
`