import Spinner from "@/components/Spinner";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let user = "hello";

  return <>{user ? <Outlet /> : <Spinner path={"/auth/signin"} />}</>;
};

export default PrivateRoute;
