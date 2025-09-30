import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import DisplayData from "./DisplayData";

function App() {
const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/" }),
  cache: new InMemoryCache(),
});
  return (
    <ApolloProvider client={client}>
      <div>List of Users</div>
      <DisplayData />
    </ApolloProvider>
  );
}

export default App;
