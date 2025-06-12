import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser, deleteUserAccount } from "../services/auth";
import SavedTrivia from "../components/SavedTrivia";

const Profile = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Your Profile</h2>

        {error && <div className="profile-error">{error}</div>}
        {message && <div className="profile-message">{message}</div>}

        {/* Profile Info */}
        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{currentUser?.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Name:</span>
            <span className="info-value">{currentUser?.displayName}</span>
          </div>
        </div>

        {/* Saved Trivia Questions */}
        <h2>Saved Trivia</h2>
        <SavedTrivia />
      </div>
    </div>
  );
};

export default Profile;