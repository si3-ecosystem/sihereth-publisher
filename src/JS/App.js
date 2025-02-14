import "../CSS/App.css";
import "../CSS/responsive.css";
import Error from "../components/404/Error";
import "react-modern-drawer/dist/index.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "../components/PrivateRoutes/index.js";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import Register from "../pages/Register.js";
import { Toaster } from "react-hot-toast";
import PreviewWebPage from "../components/preview/index.js";
import ForgetPassword from "../pages/ForgetPassword.js";
import ResetPassword from "../pages/ResetPassword.js";
function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="*"
          element={
            <Routes>
              <Route path="" element={<PrivateRoutes />}>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/preview" element={<PreviewWebPage />} />
              </Route>
            </Routes>
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
