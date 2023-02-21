import csrfFetch from './csrf';


export const RECEIVE_RESERVATION = "reservations/RECEIVE_RESERVATION";
export const RECEIVE_ALL_RESERVATIONS = "reservations/RECEIVE_ALL_RESERVATIONS";
export const REMOVE_RESERVATION = "reservations/REMOVE_RESERVATION";

export const receiveReservation = (reservation) => {
    return {
        type: RECEIVE_RESERVATION,
        reservation
    }
}

export const receiveReservations = (reservations) => {
    return {
        type: RECEIVE_ALL_RESERVATIONS,
        reservations
    }   
}


export const removeReservation = (reservationId) => {
    return {
        type: REMOVE_RESERVATION,
        reservationId
    }
}

export const getReservations = (state) => {
    return state.reservations ? Object.values(state.reservations) : []
}

export const fetchReservations = () => async dispatch => {
    const res = await csrfFetch(`/api/reservations`)
    if (res.ok) {
        let data = await res.json()
        dispatch(receiveReservations(data))
    }
}

export const fetchReservation = (reservationId) => async dispatch => {
    const res = await csrfFetch(`/api/reservation/${reservationId}`)
    if (res.ok) {
        let data = await res.json()
        dispatch(receiveReservation(data))
    }
}

export const createReservation = (reservationObj) => async dispatch => {
        // debugger
    const res = await csrfFetch(`/api/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationObj)
    }) 
    // debugger
    if (res.ok) {
        const reservation = await res.json();
        dispatch(receiveReservations(reservation))
    }
}

export const updateReservation = (reservationObj) => async dispatch => {
    const res = await fetch(`/api/reservations/${reservationObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationObj)
    })
    if (res.ok) {
        const reservation = await res.json();
        dispatch(receiveReservation(reservation))
    }
}

export const deleteReservation = (reservationId) => async dispatch => {
    const res = await fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE'
    })
    if (res.ok)
    dispatch(removeReservation(reservationId))
}

// export const updateReport = (reportObj) => async dispatch => {
//     const response = await fetch(`/api/reports/${reportObj.id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(reportObj)
//     })
//     const report = await response.json();
//     dispatch(receiveReport(report))
// }

// export const deleteReport = (reportId) => async dispatch => {
//     const response = await fetch(`/api/reports/${reportId}`, {
//         method: 'DELETE'
//     })
//     dispatch(removeReport(reportId))
// }

function reservationsReducer (state = {}, action) {
    const newState = { ...state }
    switch (action.type) {
    case RECEIVE_RESERVATION:
        return newState[action.reservation.id] = action.reservation
    case RECEIVE_ALL_RESERVATIONS:
        return { ...action.reservations}
    case REMOVE_RESERVATION:
        delete newState[action.reservation.id]
        return newState
    default:
        return state
    }
}

export default reservationsReducer;