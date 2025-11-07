import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-inner-block">
          <Link to="/articles" className="logo">
            Realworld Blog
          </Link>

          <nav className="nav">
            <NavLink to="/articles" className="nav-link">
              Home
            </NavLink>

            {user ? (
              <NavLink to="/new-article" className="nav-link">
                <div className="nav-link-logo"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8125 2.6875L10.5938 3.90625L8.09375 1.40625L9.3125 0.1875C9.4375 0.0625 9.59375 0 9.78125 0C9.96875 0 10.125 0.0625 10.25 0.1875L11.8125 1.75C11.9375 1.875 12 2.03125 12 2.21875C12 2.40625 11.9375 2.5625 11.8125 2.6875ZM0 9.5L7.375 2.125L9.875 4.625L2.5 12H0V9.5Z" fill="#61BB61"/></svg></div>
                <div className="nav-link-text">New Post</div>
              </NavLink>
            ) : (
              <button className="nav-link nav-link-disabled" type="button">
                <div className="nav-link-logo"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path  d="M11.8125 2.6875L10.5938 3.90625L8.09375 1.40625L9.3125 0.1875C9.4375 0.0625 9.59375 0 9.78125 0C9.96875 0 10.125 0.0625 10.25 0.1875L11.8125 1.75C11.9375 1.875 12 2.03125 12 2.21875C12 2.40625 11.9375 2.5625 11.8125 2.6875ZM0 9.5L7.375 2.125L9.875 4.625L2.5 12H0V9.5Z" fill="#61BB61"/></svg></div>
                <div className="nav-link-text">New Post</div>
              </button>
            )}

            <button className="nav-link nav-link-disabled" type="button">
              <div className="nav-link-logo"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.9375 8.3125C5.39583 8.77083 5.94792 9 6.59375 9C7.23958 9 7.79167 8.77083 8.25 8.3125C8.70833 7.85417 8.9375 7.30208 8.9375 6.65625C8.9375 6.01042 8.70833 5.45833 8.25 5C7.79167 4.54167 7.23958 4.3125 6.59375 4.3125C5.94792 4.3125 5.39583 4.54167 4.9375 5C4.47917 5.45833 4.25 6.01042 4.25 6.65625C4.25 7.30208 4.47917 7.85417 4.9375 8.3125ZM11.5625 7.3125L12.9688 8.40625C13.1146 8.51042 13.1354 8.65625 13.0312 8.84375L11.6875 11.1562C11.6042 11.3021 11.4688 11.3438 11.2812 11.2812L9.625 10.625C9.1875 10.9375 8.8125 11.1562 8.5 11.2812L8.25 13.0312C8.20833 13.2188 8.10417 13.3125 7.9375 13.3125H5.25C5.08333 13.3125 4.97917 13.2188 4.9375 13.0312L4.6875 11.2812C4.29167 11.1146 3.91667 10.8958 3.5625 10.625L1.90625 11.2812C1.71875 11.3438 1.58333 11.3021 1.5 11.1562L0.15625 8.84375C0.0520833 8.65625 0.0729167 8.51042 0.21875 8.40625L1.625 7.3125C1.60417 7.16667 1.59375 6.94792 1.59375 6.65625C1.59375 6.36458 1.60417 6.14583 1.625 6L0.21875 4.90625C0.0729167 4.80208 0.0520833 4.65625 0.15625 4.46875L1.5 2.15625C1.58333 2.01042 1.71875 1.96875 1.90625 2.03125L3.5625 2.6875C4 2.375 4.375 2.15625 4.6875 2.03125L4.9375 0.28125C4.97917 0.09375 5.08333 0 5.25 0H7.9375C8.10417 0 8.20833 0.09375 8.25 0.28125L8.5 2.03125C8.89583 2.19792 9.27083 2.41667 9.625 2.6875L11.2812 2.03125C11.4688 1.96875 11.6042 2.01042 11.6875 2.15625L13.0312 4.46875C13.1354 4.65625 13.1146 4.80208 12.9688 4.90625L11.5625 6C11.5833 6.14583 11.5938 6.36458 11.5938 6.65625C11.5938 6.94792 11.5833 7.16667 11.5625 7.3125Z" fill="#61BB61"/></svg></div>
              <div className="nav-link-text">Settings</div>
            </button>

            {user ? (
              <>
                <Link to="/profile" className="nav-link nav-user">
                  <div className="nav-link-logo"><svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.8125 7.4375C3.04167 6.9375 4.21875 6.6875 5.34375 6.6875C6.46875 6.6875 7.63542 6.9375 8.84375 7.4375C10.0729 7.91667 10.6875 8.55208 10.6875 9.34375V10.6875H0V9.34375C0 8.55208 0.604167 7.91667 1.8125 7.4375ZM7.21875 4.5625C6.69792 5.08333 6.07292 5.34375 5.34375 5.34375C4.61458 5.34375 3.98958 5.08333 3.46875 4.5625C2.94792 4.04167 2.6875 3.41667 2.6875 2.6875C2.6875 1.95833 2.94792 1.33333 3.46875 0.8125C3.98958 0.270833 4.61458 0 5.34375 0C6.07292 0 6.69792 0.270833 7.21875 0.8125C7.73958 1.33333 8 1.95833 8 2.6875C8 3.41667 7.73958 4.04167 7.21875 4.5625Z" fill="#61BB61"/></svg></div>
                  <div className="nav-link-text">{user.username}</div>
                </Link>

                <button type="button" className="nav-link" onClick={signOut}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/sign-in" className="nav-link">
                  Sign In
                </NavLink>
                <NavLink to="/sign-up" className="nav-link">
                  Sign Up
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="hero">
        <h1 className="hero-title">Realworld Blog</h1>
        <p className="hero-subtitle">A place to share your knowledge.</p>
      </div>
    </header>
  );
};

export default Header;