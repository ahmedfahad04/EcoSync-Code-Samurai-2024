import { BASE_URL } from "@/constants/Service";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { ArrowLeft } from "@mui/icons-material";
import { MailIcon, Undo2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OTPPage = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(10);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (resendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setTimer(30);
    }
    return () => clearInterval(interval);
  }, [resendDisabled]);

  const handleResendOTP = () => {
    // Disable the button
    setResendDisabled(true);
    // Set a timer to re-enable the button after 30 seconds
    setTimeout(() => {
      setResendDisabled(false);
    }, 30000);
    // Add logic to resend OTP
    // For demonstration purposes, let's just reset the timer to 30 seconds
    setTimer(30);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password != confirmPassword) {
      toast.error("Confirm Password didn't matched");
      return;
    } else {
      httpClient
        .post(`${BASE_URL}/auth/reset-password/confirm`, {
          email: localStorage.getItem("verification-mail"),
          otp: otp,
          password: password,
        })
        .then((res) => {
          console.log("Password Changed: ", res);
          toast.success("Password Updated Successfully");

          navigate("/auth/signin");
        })
        .catch((err) => {
          console.log("Error in password change: ", err);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center mb-4">
              <MailIcon className="h-12 w-12 text-green-500 mx-auto" />
              <h2 className="text-3xl font-extrabold text-gray-900 mt-4">
                Reset password
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please kindly set your new password.
              </p>
            </div>

            {/* new password input field */}

            <div className="bg-white w-full py-4 sm:rounded-lg ">
              <form onSubmit={handleSubmit}>
                {/*  otp section */}
                <div className="flex flex-row justify-between">
                  <div>
                    <input
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                      type="text"
                      required
                      className="appearance-none px-5 py-2 mt-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter OTP"
                    />
                  </div>

                  <div className="flex flex-col justify-between items-center mt-3">
                    <button
                      type="button"
                      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium   ${
                        resendDisabled
                          ? "cursor-default bg-slate-400 text-slate-200"
                          : "hover:bg-green-200 bg-green-100 text-green-700"
                      }  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                      onClick={handleResendOTP}
                    >
                      <div className="flex flex-row">
                        <Undo2Icon className="h-5 w-3 mr-2" />{" "}
                        {resendDisabled ? `${timer} seconds` : "Resend OTP"}
                      </div>
                    </button>
                  </div>
                </div>

                {/* new pass word */}
                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New password
                  </label>
                  <div className="mt-1">
                    <InputField
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      // autoComplete="new-password"
                      customInputClass=" bg-[#F3F4F6] border-2 border-gray-200 active:border-none h-12 rounded-md"
                      name={password}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm password
                  </label>
                  <div className="mt-1">
                    <InputField
                      name="confirmPassword"
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      customInputClass=" bg-[#F3F4F6] border-2 border-gray-200 active:border-none h-12 rounded-md"
                    />
                  </div>
                </div>

                {/* submit button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change Password
                  </button>
                  <div
                    className="hover:text-gray-600 flex flex-1 gap-2 text-sm justify-center items-center cursor-pointer mt-3"
                    onClick={() => navigate("/forgot-password")}
                  >
                    <ArrowLeft sx={{ color: "black" }} />
                    <p>Back to Forgot Password</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
