import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ListingIndex from "./components/ListingsIndex";
import ListingPage from "./components/ListingPage";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
        <Route exact path="/">
          <ListingIndex />
        </Route>
        <Route exact path="/listings/:listingId">
          <ListingPage />
        </Route>
        </Switch>
    </>
  );
}

export default App;
