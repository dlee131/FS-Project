import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as tripActions from '../../store/trip'
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import * as reviewsActions from "../../store/review";
import moment from 'moment'

function ReservationIndex() {
    const sessionUser = useSelector(state => state.session.user);
    const reservations = Object.values(useSelector(state => state.reservations));
    const listings = useSelector(state => state.listings);
    const dispatch = useDispatch();
    const currentDate = moment();


    return (
        <div> hi </div>
    )

}

export default ReservationIndex;