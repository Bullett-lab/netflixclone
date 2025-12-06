import { useNavigate } from "react-router-dom";
import "./MyProfile.css";

export default function MyProfile() {
  const navigate = useNavigate();

  const handleProfileClick = (name) => {
    navigate("/home", { state: { user: name } });
  };

  return (
    <div className="profile-page">
      <h2>Who's Watching?</h2>

      <div className="profiles">
        {["Mercy", "Guest", "Kids"].map((name) => (
          <div
            key={name}
            className="profile-card"
            onClick={() => handleProfileClick(name)}
          >
            <div className="profile-avatar"></div>
            <div className="profile-name">{name}</div>
          </div>
        ))}
      </div>

      <div className="profile-actions">
        <button>Add Profile</button>
        <button>Edit Profile</button>
      </div>
    </div>
  );
}
