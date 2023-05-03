import * as sessionActions from "../../store/session";
import { useSelector } from "react-redux";

function Profile() {
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.session.user);

  return (
    <>
      <div>Hello {user.first_name}!</div>
      
    </>
  );
}

export default Profile;
