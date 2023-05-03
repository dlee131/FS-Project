import * as sessionActions from "../../store/session";
import { useSelector } from "react-redux";
import { formatDate } from "../Review";

function Profile() {
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.session.user);

  return (
    <>
      <div>Hello {user.first_name}!</div>
      <div>Joined on {formatDate(user.created_at)}</div>
    </>
  );
}

export default Profile;
