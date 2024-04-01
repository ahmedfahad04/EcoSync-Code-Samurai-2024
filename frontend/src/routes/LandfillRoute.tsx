import Spinner from "@/components/Spinner";
import { ROLETYPE } from "@/constants/Global";
import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.role.role_name == ROLETYPE.ROLE3 ||
      user?.role.role_name == ROLETYPE.ROLE1 ? (
        <Outlet />
      ) : (
        <Spinner path={"/auth/signin"} />
      )}
    </>
  );
};

export default PrivateRoute;
