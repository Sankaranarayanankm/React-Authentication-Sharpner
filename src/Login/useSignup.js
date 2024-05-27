import { useState } from "react";
import { useHistory } from "react-router-dom";


const useSignup = () => {
  const [sending, setSending] = useState(false);
  const [data, setData] = useState("");
  const history=useHistory();

  const signupHandler = async (email, password) => {
    setSending(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEBJMrbbMUfwE61UR-q8YBvB9tTY5Cp44",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to signup");
      }
      const data = await response.json();
     setData(data);
     history.replace('/');
    } catch (error) {
      alert(error);
    } finally {
      setSending(false);
    }
  };

  return { data, signupHandler, sending };
};

export default useSignup;