import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    fetch
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
});

export default client;