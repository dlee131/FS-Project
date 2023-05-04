import * as sessionActions from "../../store/session";
import { useSelector } from "react-redux";
import { formatDate } from "../Review";
import "./Profile.css"

function Profile() {
  const user = useSelector((state) => state.session.user);

  return (
      <div className="profile-container">
        <div className="user-first-name">Hello {user.first_name}! Welcome to MeloBnB!</div>
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>Joined on {formatDate(user.created_at)}</div>
        <div>{user.profPic}</div>
      </div>
  );
}

export default Profile;
