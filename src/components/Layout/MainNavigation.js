import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import classes from "./MainNavigation.module.css";
import { useAuthCtx } from "../../Context/AuthContext";

const MainNavigation = () => {
  const { isLogin, logout } = useAuthCtx();
  const history=useHistory();
  const logoutHandler=()=>{
    logout();
    history.replace('/');
    localStorage.removeItem('token');
  }
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLogin && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLogin && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLogin && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
