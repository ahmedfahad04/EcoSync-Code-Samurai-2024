import { BASE_URL } from "@/constants/Service";
import { httpClient } from "@/utils/httpClient";
import { ArrowLeft } from "@mui/icons-material";
import { FileLock2Icon, MailIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const handleSendEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      httpClient
        .post(`${BASE_URL}/auth/reset-password/initiate`, {
          email: email,
        })
        .then((res) => {
          console.log("EMAIL SENT: ", res);
          toast.success("Email Sent!");

          localStorage.setItem("verification-mail", email);
          navigate("/otp-verification");
        })
        .catch((err) => {
          console.log("Error in email sent: ", err);
        });
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <FileLock2Icon className="h-12 w-12 mx-auto mb-4 text-secondary" />
              <h2 className="text-3xl font-extrabold text-gray-900">
                Forgot your password?
              </h2>
              <h4 className="text-xs mt-2 font-light text-gray-500">
                Enter your email so that we can send you a password reset link
              </h4>
            </div>
            <form
              className="space-y-6 mt-14"
              method="POST"
              onSubmit={handleSendEmail}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g. username@kinety.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSendEmail}
                >
                  <MailIcon className="h-5 w-5 mr-2" /> Send Email
                </button>
              </div>
            </form>
            <div
              className="mt-6 flex flex-1 gap-2 justify-center items-center cursor-pointer"
              onClick={() => navigate("/auth/signin")}
            >
              <ArrowLeft sx={{ color: "black" }} />
              <p>Back to Login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
