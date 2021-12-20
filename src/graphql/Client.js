import { ApolloClient, InMemoryCache } from '@apollo/client';

const Client = new ApolloClient({
    uri: "https://api-projectmanager.herokuapp.com/graphql",
    cache: new InMemoryCache()
})

export default Client;