import { useState } from "react";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const passwordHandler = async (token, password) => {
    try {
      setLoading(true);
      const response =await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCEBJMrbbMUfwE61UR-q8YBvB9tTY5Cp44",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            password,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        const errorData =await response.json();
        throw new Error(
          errorData.error.message || "Failed to updated Password"
        );
      }
      const resData =await response.json();
      setData(resData);
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { passwordHandler, data, loading };
};

export default useChangePassword;
