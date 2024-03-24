import { XMarkIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import toast from "react-hot-toast";

import TextEditor from "@/components/TextEditor";
import { API_END_POINTS } from "@/constants/Service";
import { useBlogContext } from "@/context/BlogContext";
import { BlogContent, BlogProps } from "@/models/Blog";
import Button from "@/ui/Button";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { PuffLoader } from "react-spinners";

interface UpdateBlogProps {
  blog: BlogProps;
  onClose?: () => void;
}

const UpdateBlog: React.FC<UpdateBlogProps> = ({
  blog,
  onClose,
}: UpdateBlogProps) => {
  const [formData, setFormData] = useState<BlogContent>({
    title: blog.title,
    description: blog.description,
  });

  const { isUpdated, setIsUpdated } = useBlogContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));
  };

  const handleBlogUpdate = (event: { preventDefault: () => void }) => {
    setIsLoading(true);
    event.preventDefault();

    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("description", formData.description);

    try {
      httpClient
        .put(`${API_END_POINTS.BLOG}/${blog.postId}`, postData, {
          withCredentials: true,
        })
        .then(() => {
          if (onClose) onClose();
          if (setIsUpdated) setIsUpdated(!isUpdated);
          toast.success("Blog updation successful!");
        })
        .catch((err) => {
          console.log("FAIL TO CREATE POST: ", err);
          toast.error("Blog updation failed!");
        });
    } catch (error) {
      console.log("ERROR BLOG CREATION: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      {/* Modal content */}

      <div className="w-full max-w-2xl bg-white shadow-lg rounded-md p-6 relative">
        {/* headline */}
        <div className="flex flex-row justify-between">
          <h2 className="text-primary text-xl font-bold mb-3">Update blog</h2>
          <XMarkIcon
            width={24}
            height={24}
            className="hover:bg-red-600 cursor-pointer bg-red-500"
            onClick={onClose}
          />
        </div>

        <form
          action=""
          className="flex flex-col justify-center items-start mt-2 gap-2"
          onSubmit={handleBlogUpdate}
        >
          <label
            htmlFor="title"
            className="text-lg font-semibold text-secondary text-left"
          >
            Title
          </label>
          <InputField
            id="title"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            customInputClass="bg-slate-200 border-none text-black"
          />

          <h2 className="text-lg font-semibold mt-5 text-secondary">
            Description
          </h2>
          <div className="w-full border text-black border-gray-300 rounded-lg">
            <TextEditor
              value={formData.description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className="flex justify-center items-center w-full">
            {isLoading ? (
              <Button
                buttonVariant="primary"
                buttonType="submit"
                customClass="flex justify-center item-center font-semibold text-base h-10 mt-5 hover:bg-secondary text-white"
                disabled={true}
              >
                <PuffLoader size={25} color="white" />
              </Button>
            ) : (
              <Button
                buttonVariant="primary"
                buttonType="submit"
                customClass="flex justify-center item-center font-semibold text-base w-40 h-10 mt-5 hover:bg-secondary"
              >
                Update Blog
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
