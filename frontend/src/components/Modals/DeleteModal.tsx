import { TrashIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { httpClient } from "@/utils/httpClient";
import { mutate } from "swr";

interface DeleteModalProps {
  url: string;
  successTitle: string;
  failureTitle: string;
  baseUrl?: string;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  url,
  onClose,
  successTitle,
  failureTitle,
  baseUrl,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDeletePost = () => {
    setLoading(true);
    try {
      httpClient
        .delete(url, { withCredentials: true })
        .then((res) => {
          console.log("Deleted", res.data);
          toast.success(successTitle);
          mutate(baseUrl);
          onClose();
        })
        .catch((err) => {
          console.log(err);
          toast.error(failureTitle);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log("REQ Err: ", error)
    }
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      {/* Modal content */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
        {/* Close button */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
          viewBox="0 0 320.591 320.591"
          onClick={onClose}
        >
          {/* Close button SVG paths */}
        </svg>
        <div className="my-8 text-center flex flex-col justify-center items-center">
          {/* Delete confirmation message */}
          <TrashIcon width={70} />
          <h4 className="text-xl font-semibold mt-6">
            Are you sure to delete it?
          </h4>
        </div>

        {/* Delete and cancel buttons */}
        <div className="flex flex-col space-y-2">
          <button
            type="button"
            className={`px-6 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 active:bg-red-500"
            }`}
            onClick={handleDeletePost}
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
          <button
            type="button"
            className="px-6 py-2.5 rounded-md text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
