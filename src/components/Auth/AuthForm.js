import { useState } from "react";
import classes from "./AuthForm.module.css";
import useSignup from "../../Login/useSignup";
import useLogin from "../../Login/useLogin";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  let { sending, signupHandler } = useSignup();
  const { loginHandler } = useLogin();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (isLogin) {
      loginHandler(state.email, state.password);
    } else {
      signupHandler(state.email, state.password);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            name="email"
            value={state.email}
            onChange={changeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            name="password"
            value={state.password}
            onChange={changeHandler}
          />
        </div>
        <div className={classes.actions}>
          <button>{!sending ? "Sign in" : "Sending Request..."}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
