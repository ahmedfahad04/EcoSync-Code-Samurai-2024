import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useAuth();

  return <>{user ? <Outlet /> : <Spinner path={"/auth/signin"} />}</>;
};

export default PrivateRoute;
