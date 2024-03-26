import React from "react";

interface AuthLayoutProps {
  imageSource: string;
  imageAlt?: string;
  children: React.ReactNode;
  imagePosition?: "left" | "right"; // Added prop for image position
}

const AuthLayout: React.FC<AuthLayoutProps> = (props: AuthLayoutProps) => {
  const {
    imageSource,
    imageAlt = "Authorization-Image",
    children,
    imagePosition = "right",
  } = props;

  const flexDirection = imagePosition === "left" ? "row-reverse" : "row";

  return (
    <div
      className={`w-screen h-screen flex justify-between bg-white flex-${flexDirection}`}
    >
      <div className="w-7/12 overflow-auto flex flex-col justify-center ">
        {children}
      </div>
      <div className="w-5/12 relative">
        <img
          className="w-full h-screen object-cover p-5 rounded"
          src={imageSource}
          alt={imageAlt}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
