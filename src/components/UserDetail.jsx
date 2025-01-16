import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserDetail = ({ userData }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const foundUser = userData.find((user) => user.id === parseInt(userId));
    setUser(foundUser);
  }, [userId, userData]);

  if (!user) {
    return <div className="user-not-found">User not found...</div>;
  }

  return (
    <div className="user-detail-container">
      <div className="user-detail-card">
        <h2 className="user-name">{user.name}</h2>

        <div className="user-info">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="user-info">
          <strong>Phone:</strong> {user.phone}
        </div>
        <div className="user-info">
          <strong>Company:</strong> {user.company.name}
        </div>
        <div className="user-info">
          <strong>Website:</strong> {user.website}
        </div>
        <div className="user-info">
          <strong>Address:</strong> {user.address.street}, {user.address.city},{" "}
          {user.address.zipcode}
        </div>
        <button onClick={() => navigate("/")} className="go-back-button">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
