import { React, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ListingIndex from "./components/ListingsIndex";
import ListingPage from "./components/ListingPage";
import ReservationIndex from "./components/Reservation";
import ReviewForm from "./components/Review/ReviewForm";
import ReviewUpdate from "./components/Review/ReviewUpdate";
import Profile from "./components/Profile";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navigation search={search} setSearch={setSearch} />
      <Switch>
        <Route path={"/listings/:listingId/reviews/:reviewId/edit"}>
          <ReviewUpdate />
        </Route>
        <Route exact path="/">
          <ListingIndex search={search} />
        </Route>
        <Route exact path="/listings/:listingId/reviews/new">
          <ReviewForm />
        </Route>
        <Route path="/listings/:listingId">
          <ListingPage />
        </Route>
        <Route path="/reservations">
          <ReservationIndex />
        </Route>
        <Route path="profile">
          <Profile />
        </Route>
      </Switch>
    </>
  );
}

export default App;
