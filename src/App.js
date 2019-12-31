import React from 'react';
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import client from './client.js'

const ME = gql`
  query me {
    user(login: "iteachonudemy") {
      id
      name
    }
  }
`

function App() {
  return (
    <ApolloProvider client={client}>
      <div>hello graphql</div>
      <Query query={ME}>
        {
          ({ loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return `Error! ${error.message}`
            return <div>{data.user.name}</div>
          }
        }
      </Query>
    </ApolloProvider>
  );
}

export default App;
