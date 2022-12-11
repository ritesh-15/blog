import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import userContext from "../context/user/userContext";

export const useLoadingWithRefresh = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useContext(userContext);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/refresh`,
          {
            withCredentials: true,
          }
        );
        setUser(data.user);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  return loading;
};
