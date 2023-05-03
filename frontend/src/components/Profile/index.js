import * as sessionActions from "../../store/session";
import { useSelector } from "react-redux";

function Profile () {

    const sessionUser = useSelector((state) => state.session.user);


    return (
        <>
        <div>Hello!</div>
        </>
    );

}

export default Profile;