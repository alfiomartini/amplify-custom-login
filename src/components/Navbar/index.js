import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export const Navbar = ({ user, doSignOut }) => {
  return (
    <div className="navbar">
      <div className="logo">AWS-Amplify</div>

      {!user && (
        <Link to="/signIn" className="link">
          Sign In
        </Link>
      )}
      {!user && (
        <Link to="/signUp" className="link">
          Sign Up
        </Link>
      )}
      {user && (
        <Link to="/" className="link" onClick={() => doSignOut()}>
          Sign Out
        </Link>
      )}
      {user && <div className="auth-user"> {user.attributes.email}</div>}
    </div>
  );
};
