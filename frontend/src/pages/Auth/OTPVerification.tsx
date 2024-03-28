import { ArrowLeft } from "@mui/icons-material";
import { MailIcon, Undo2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OTPPage = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);

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

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    //! Add logic to verify OTP
    if (otp === "123456") {
      navigate("/reset-password");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <MailIcon className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-extrabold text-gray-900">
                Verify OTP
              </h2>
              <h4 className="text-xs mt-2 font-light text-gray-500">
                Please enter the OTP sent to your email.
              </h4>
            </div>
            <form
              className="space-y-6 mt-14"
              method="POST"
              onSubmit={handleVerifyOTP}
            >
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <div className="mt-1">
                  <input
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter OTP"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Verify OTP
                </button>
              </div>
            </form>
            <div className="flex flex-col justify-between items-center mt-3">
              <div className="w-full mb-5">
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
                    <Undo2Icon className="h-5 w-5 mr-2" />{" "}
                    {resendDisabled
                      ? `Resend OTP in ${timer} seconds`
                      : "Resend OTP"}
                  </div>
                </button>
              </div>
              <div
                className="flex flex-1 gap-2 justify-center items-center cursor-pointer"
                onClick={() => navigate("/forgot-password")}
              >
                <ArrowLeft sx={{ color: "black" }} />
                <p>Back to Forgot Password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
