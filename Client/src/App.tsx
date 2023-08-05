import './App.css'
import Header from "./Components/Header.tsx";
import UsersPage from "./Pages/UsersPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
});
const route = createBrowserRouter([
    {
        path: "/",
        element: <Header/>,
        children: [
            {
                path:'/',
                element:
                <ApolloProvider client={client}>
                    <UsersPage/>
                </ApolloProvider>
            },
        ],
    },

]);



function App() {
  

  return (
    <>
      <div className="App">
          <RouterProvider router={route}/>
      </div>
    </>
  )
}

export default App
