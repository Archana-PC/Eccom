import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { setUser, authResolved } from "./services/auth/authSlice";
import { useGetMeQuery } from "./services/auth/authApi";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const {
    data,
    isSuccess,
    isError,
    isFetching,
  } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }

    if (isError) {
      // ❗ DO NOT logout here
      dispatch(authResolved());
    }
  }, [isSuccess, isError, data, dispatch]);

  // 🔴 wait until cookie check finishes
  if (loading || isFetching) {
    return <div>Loading...</div>;
  }

  return <AppRoutes />;
};

export default App;
