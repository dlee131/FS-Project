import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchListings, getListings } from "../../store/listings"
import  ListingsItem  from './ListingsItem';
import { useHistory } from "react-router-dom"
import { Filter } from '../Filters/filter'

function ListingsIndexPage() {
    const dispatch = useDispatch();
    const listings = useSelector(getListings)
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchListings())
      },[dispatch])

    // const handleClick = (listingId) => {
    //     history.push(`/listings/${listingId}`)
    //     window.scrollTo(0,0)
    // }
    const handleClick = (listingId) => {
      // console.log('handleClick called with listingId:', listingId);
      history.push(`/listings/${listingId}`);
      window.scrollTo(0, 0);
    };


      

        // to scroll up to the top-left corner when redirecting to an indiv listing
    // const listingItem = listings.map(listing => <ListingsItem key={listing.id} listing={listing}/>)
     
    return (

      <div><Filter/>
      <div className="listings-index">
        {listings.map(listing => (
          <div key={listing.id}>
            <ListingsItem listing={listing} handleClick={() => handleClick(listing.id)}/>
          </div>
        ))}
      </div>
      </div>
    );
};

// return (
//   <div className="listings-index">
//    <div>
//      <div key={listings.id} onClick={()=>handleClick(listings.id)}>
//      <div>{listingItem }</div>
//      </div>
//   </div>
//   </div>
//  )




export default ListingsIndexPage;