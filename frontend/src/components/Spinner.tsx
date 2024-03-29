import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

interface SpinnerProps {
  path: string; // Define the 'path' prop
}

const Spinner: React.FC<SpinnerProps> = (props) => {
  const { path } = props; // Destructure 'path' from props
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 500);

    count === 0 &&
      navigate(path, {
        state: location.pathname,
      });

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  const defaultLoaderProps = {
    color: "#70BD5B",
    loading: true,
    size: 60,
    // speedMultiplier: 2,
  };

  return (
    <div className="fixed flex-col inset-0 flex justify-center items-center bg-white bg-opacity-75">
      <BarLoader {...{ ...defaultLoaderProps }} />
      {/* <h1 className="text-center mt-5 text-xl">
        Redirecting you in {count} seconds!{" "}
      </h1> */}
    </div>
  );
};

export default Spinner;
