import { Route, Routes } from "react-router-dom";
import "./App.css";

import ForgotPassword from "./pages/Auth/ForgotPassword";
import OTPVerification from "./pages/Auth/OTPVerification";
import ResetPassword from "./pages/Auth/ResetPassword";
import SignIn from "./pages/Auth/SignIn";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Landfill from "./pages/Landfill";
import NotFound from "./pages/NotFound";
import RolesAndPermissions from "./pages/RolesAndPermissions";
import STS from "./pages/STS";
import Users from "./pages/Users";
import Vehicles from "./pages/Vehicles";
import LoggedInRoute from "./routes/LoggedInRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="vehicles" element={<Vehicles />} /> 
          <Route
            path="roles-and-permission"
            element={<RolesAndPermissions />}
          />

          <Route path="sts" element={<STS />} />
          <Route path="landfill" element={<Landfill />} />
          
        </Route>

        <Route path="/auth" element={<LoggedInRoute />}>
          <Route path="signin" element={<SignIn />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
