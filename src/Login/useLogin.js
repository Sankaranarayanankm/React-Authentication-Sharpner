import { useState } from "react";
import { useAuthCtx } from "../Context/AuthContext";
import {useHistory} from 'react-router-dom';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const history=useHistory();
  const { login } = useAuthCtx();
  const loginHandler = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEBJMrbbMUfwE61UR-q8YBvB9tTY5Cp44",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: false,
          }),
        }
      );
      if (!response.ok) {
        const errorMessgae = await response.json();
        throw new Error(errorMessgae.error.message || "failed to log-in");
      }
      const resData = await response.json();
      setData(resData);
      login(resData.idToken);
      history.push('/');
 

    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, loginHandler, data };
};

export default useLogin;
