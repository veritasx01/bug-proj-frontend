import { useState } from "react";
import { userService } from "../services/user.service.js";
import { UserMsg } from "./UserMsg";
import { NavLink } from "react-router-dom";
import { LoginSignup } from "./LoginSignup";
import { useNavigate } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export function AppHeader() {
  const navigate = useNavigate();
  const [loggedinUser, setLoggedinUser] = useState(
    userService.getLoggedinUser()
  );
  async function onLogin(credentials) {
    console.log(credentials);
    try {
      const user = await userService.login(credentials);
      setLoggedinUser(user);
      navigate("/");
    } catch (err) {
      console.log("Cannot login :", err);
      showErrorMsg(`Cannot login`);
    }
  }

  async function onSignup(credentials) {
    console.log(credentials);
    try {
      const user = await userService.signup(credentials);
      setLoggedinUser(user);
      showSuccessMsg(`Welcome ${user.fullname}`);
      navigate("/");
    } catch (err) {
      console.log("Cannot signup :", err);
      showErrorMsg(`Cannot signup`);
    }
    // add signup
  }

  async function onLogout() {
    console.log("logout");
    try {
      await userService.logout();
      setLoggedinUser(null);
      navigate("/");
    } catch (err) {
      console.log("can not logout");
    }
    // add logout
  }
  return (
    <header className="app-header container">
      <div className="header-container">
        <h1>Bugs are Forever</h1>
        <section>
          {!loggedinUser && (
            <LoginSignup onLogin={onLogin} onSignup={onSignup} />
          )}

          {loggedinUser && (
            <div className="user-preview">
              <h3>Hello {loggedinUser.fullname}</h3>
              <button onClick={onLogout}>Logout</button>
            </div>
          )}
        </section>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
      <UserMsg />
    </header>
  );
}
