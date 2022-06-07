import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/homePage";
import Footer from "./components/footer.js";
import Header from "./components/header.js";
import Support from "./components/contactSupport";

import SearchActivities from "./pages/SearchActivities";
import ProfilePage from "./pages/ProfilePage";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("id_token");
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default function App() {
    return (
        // Wrap everything in the ApolloProvider and client being passed in a `props`
        <ApolloProvider client={client}>
            <Router>
                <>
                    <Header />
                    <Routes>
                        <Route path="/" element={<SearchActivities />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="*" element={<h1 className="display-2">Wrong page!</h1>} />

                        <Route path="/old-home" element={<Home />} />
                    </Routes>
                    <Footer />
                </>
            </Router>
        </ApolloProvider>
    );
}
