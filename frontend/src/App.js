import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ListingIndex from "./components/ListingsIndex";
import ListingPage from "./components/ListingPage";
import ReservationIndex from "./components/Reservation";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
        <Route exact path="/">
          <ListingIndex />
        </Route>
        <Route path="/listings/:listingId">
          <ListingPage />
        </Route>
        <Route path="/reservations">
          <ReservationIndex/>
        </Route>
        </Switch>
    </>
  );
}

export default App;
