import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./MyProfile.css";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="profile-container">
      <h2>Account Settings</h2>
      <div className="profile-tabs">
        <button onClick={() => setActiveTab("profile")}>Profile</button>
        <button onClick={() => setActiveTab("settings")}>Settings</button>
        <button onClick={() => setActiveTab("help")}>Help Center</button>
        <button onClick={() => setActiveTab("signout")}>Sign Out</button>
      </div>

      <div className="profile-content">
        {activeTab === "profile" && (
          <div className="profile-section">
            <h3>My Profile</h3>
            <div className="profile-actions">
              <button>Switch Account</button>
              <button>Add Profile</button>
              <button>Edit Profile</button>
            </div>
            <p>Current Profile: Mercy</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-section">
            <h3>Settings</h3>
            <label>
              Language:
              <select>
                <option>English</option>
                <option>Filipino</option>
              </select>
            </label>
            <label>
              Autoplay Previews:
              <input type="checkbox" defaultChecked />
            </label>
            <label>
              Parental Controls:
              <button>Manage</button>
            </label>
          </div>
        )}

        {activeTab === "help" && (
          <div className="help-section">
            <h3>Help Center</h3>
            <ul>
              <li><NavLink to="/help/account">Managing Your Account</NavLink></li>
              <li><NavLink to="/help/billing">Billing & Payments</NavLink></li>
              <li><NavLink to="/help/troubleshooting">Troubleshooting Playback</NavLink></li>
              <li><NavLink to="/help/contact">Contact Support</NavLink></li>
            </ul>
          </div>
        )}

        {activeTab === "signout" && (
          <div className="signout-section">
            <h3>Sign Out</h3>
            <p>Are you sure you want to sign out?</p>
            <button className="signout-btn">Confirm Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
