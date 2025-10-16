import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../ReduxSlices/authSlice";
import { BACKEND_URL } from "../utils/api";

const useAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/auth/me`, {
          withCredentials: true,
        });
        dispatch(setUser(res.data)); // ✅ set user
      } catch (err) {
        dispatch(clearUser()); // ❌ clear on fail
      }
    };
    checkAuth();
  }, [dispatch]);
};

export default useAuthCheck;
