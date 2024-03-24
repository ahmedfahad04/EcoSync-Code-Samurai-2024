import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

const LoggedInRoute = () => {
  const { user } = useAuth();

  return <>{user ? <Spinner path={"/"} /> : <Outlet />}</>;
};

export default LoggedInRoute;
