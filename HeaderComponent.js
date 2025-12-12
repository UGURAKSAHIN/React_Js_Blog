// I18N
import { useTranslation } from "react-i18next";

// ROUTER
import { Link, NavLink } from "react-router-dom";

// REACT
import React from "react";

// CSS DARK MODE
import DarkMode from "./DarkMode/DarkMode";
import OtherLanguageReusability from "../app/internationalization/OtherLanguageReusability";

function HeaderComponent({ logo }) {
  const { t } = useTranslation();

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div className="container">
          {/* LOGO */}
          <Link className="navbar-brand" style={{ color: "#123" }} to="/">
            <i className={logo}></i>
          </Link>

          {/* TOGGLER */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* NAVBAR CONTENT */}
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog/category/list">
                  {t("blogCategory")}
                </NavLink>
              </li>
              <li className="nav-item ms-3">
                <NavLink className="nav-link" to="/blog/list">
                  {t("blog")}
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav mt-2 mt-lg-0">
              <li className="nav-item d-flex align-items-center me-3">
                <DarkMode />
              </li>

              <li className="nav-item dropdown me-3">
                <button
                  className="btn btn-link nav-link dropdown-toggle"
                  id="languageDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  {t("language")}
                </button>
                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                  <OtherLanguageReusability />
                </div>
              </li>

              <li className="nav-item dropdown me-3">
                <button
                  className="btn btn-link nav-link dropdown-toggle"
                  id="loginDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  {t("account")}
                </button>
                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="loginDropdown">
                  <Link className="dropdown-item" to="/login">
                    {t("login")}
                  </Link>
                  <Link className="dropdown-item" to="/register/create">
                    {t("register")}
                  </Link>
                </div>
              </li>

              <li className="nav-item">
                <form className="d-flex my-2 my-lg-0" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    id="tags"
                    className="form-control me-sm-2"
                    placeholder={t("search")}
                    aria-label={t("search")}
                  />
                  <button type="submit" className="btn btn-outline-success my-2 my-sm-0">
                    {t("search")}
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <span style={{ marginBottom: "2rem", display: "block" }} />
    </header>
  );
}

export default HeaderComponent;
