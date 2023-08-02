import './App.css'
import Header from "./Components/Header.tsx";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Users from "./Components/Users.tsx";

const client = new ApolloClient({
uri: "http://localhost:5000/graphql",
cache: new InMemoryCache(),
});

function App() {
  

  return (
    <>
        <ApolloProvider client={client}>
      <div className="App">
        <Header />
          <Users />
      </div>
        </ApolloProvider>
    </>
  )
}

export default App
