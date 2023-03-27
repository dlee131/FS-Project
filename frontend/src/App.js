import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ListingIndex from "./components/ListingsIndex";
import ListingPage from "./components/ListingPage";
import ReservationIndex from "./components/Reservation";
import ReviewForm from "./components/Review/ReviewForm";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
        <Route exact path="/">
          <ListingIndex/>
        </Route>
        <Route exact path="/listings/:listingId/reviews/new">
          <ReviewForm/>
        </Route>
        <Route path="/listings/:listingId">
          <ListingPage/>
        </Route>
        <Route path="/reservations">
          <ReservationIndex/>
        </Route>
        </Switch>
    </>
  );
}

export default App;
