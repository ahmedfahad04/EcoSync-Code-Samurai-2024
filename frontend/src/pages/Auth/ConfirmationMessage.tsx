import { CheckCircleIcon, MailIcon, Undo2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const ConfirmationMessage = () => {
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState<number>(10);

  const handleResendEmail = () => {
    // Disable the button
    setResendDisabled(true);

    //! logic to resend email

    // Start the timer countdown
    setTimer(10);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // Start the timer countdown if the button is disabled
    if (resendDisabled) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    // Cleanup function to clear the interval when component unmounts or button is enabled
    return () => {
      clearInterval(intervalId);
    };
  }, [resendDisabled]);

  // Enable the button when timer reaches 0
  useEffect(() => {
    if (timer === 0) {
      setResendDisabled(false);
    }
  }, [timer]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex items-center justify-center mb-6">
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Check your email!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Thanks! An email was sent that will ask you to click on a link
                to verify that you own this account.
              </p>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${}"
                disabled={resendDisabled}
                onClick={() => window.open("https://www.gmail.com", "_blank")}
              >
                <MailIcon className="h-5 w-5 mr-2" /> Open email inbox
              </button>
            </div>
            <div className="mt-2">
              {resendDisabled ? (
                <button
                  type="button"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-700  ${
                    resendDisabled
                      ? "bg-gray-200 text-black"
                      : " bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 "
                  }`}
                  onClick={handleResendEmail}
                  disabled={true}
                >
                  <div className="flex flex-row">00:{timer}</div>
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={handleResendEmail}
                >
                  <div className="flex flex-row">
                    <Undo2Icon className="h-5 w-5 mr-2" /> <p>Resend email</p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessage;
