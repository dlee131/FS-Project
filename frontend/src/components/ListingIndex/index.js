import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"


function ListingIndexPage() {
    const dispatch = useDispatch();
    const listings = useSelector(state => state.listings)

    // useEffect(() =>  {
    //     dispatch(fetchListings)
    // })


    return (
        <div>Listing Index Page</div>
    )

}


export default ListingIndexPage;