import { useRef } from "react";
import useChangePassword from "../../Login/useChangePassword";
import classes from "./ProfileForm.module.css";
import { useAuthCtx } from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const inputRef = useRef();
  const history = useHistory();
  const { token } = useAuthCtx();
  const { passwordHandler } = useChangePassword();

  // submit event
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = inputRef.current.value;
    passwordHandler(token, enteredPassword);
    history.replace("/");
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={inputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
