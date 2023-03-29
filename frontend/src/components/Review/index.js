import { useState, useEffect} from "react";
import { getReviews } from "../../store/reviews";
import { useSelector } from "react-redux";

function ReviewsIndex({cleanliness, accuracy, communication, location, checkIn, value, comment}) {
    // const [cleanliness, setCleanliness] = useState(0);
    // const [accuracy, setAccuracy] = useState(0);
    // const [communication, setCommunication] = useState(0);
    // const [location, setLocation] = useState(0);
    // const [checkIn, setCheckIn] = useState(0);
    // const [value, setValue] = useState(0);
    // const [comment, setComment] = useState("");
const reviews = useSelector(getReviews)

   const totalReviews = reviews.length 

   return (
    <div>{totalReviews} review</div>
   )
}


export default ReviewsIndex;