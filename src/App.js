import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import client from './client.js'
import { ME } from './graphql'
import { SEARCH_REPOSITORIES } from './graphql'

const DEFAULT_STATE = {
  after: null,
  before: null,
  first: 5,
  last: null,
  query: "フロントエンドエンジニア"
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      ...DEFAULT_STATE,
      query: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    const { query, first, last, before, after } = this.state
    console.log(query)

    return (
      <ApolloProvider client={client}>
        <form>
          <input value={query} onChange={this.handleChange} />
        </form>
        <Query
         query={SEARCH_REPOSITORIES}
         variables={{ query, first, last, before, after }}
        >
          {
            ({ loading, error, data }) => {
              if (loading) return 'Loading...'
              if (error) return `Error! ${error.message}`

              console.log({data})
              console.log(data.search)

              const search = data.search
              const repositoryCount = search.repositoryCount
              const repositoryUnit = repositoryCount === 1 ? 'Repository' : 'Repositories'
              const title = `GitHub Repositories Search Result - ${data.search.repositoryCount} ${repositoryUnit}`
              return <h2>{title}</h2>
            }
          }
        </Query>
      </ApolloProvider>
    )
  }
}

export default App
