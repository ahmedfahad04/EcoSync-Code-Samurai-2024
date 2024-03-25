import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Vehicles from "./pages/Vehicles";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/users" element={<Users />} />
          <Route path="dashboard/vehicles" element={<Vehicles />} />
        </Route>

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
