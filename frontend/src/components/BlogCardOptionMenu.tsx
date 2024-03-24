import { BlogProps } from "@/models/Blog";
import { TrashIcon } from "@/ui/Icons";
import { EllipsisVerticalIcon, PencilIcon } from "@heroicons/react/16/solid";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import DeleteBlog from "./Modals/DeleteBlog";
import UpdateBlog from "./Modals/UpdateBlog";

interface MenuProps {
  blog: BlogProps;
}

export const BlogCardOptionMenu: React.FC<MenuProps> = ({ blog }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleEdit = () => {
    setAnchorEl(null); // Close the menu
    setShowUpdateModal(true); // Open the update modal
  };

  const handleDelete = () => {
    setAnchorEl(null); // Close the menu
    setShowDeleteModal(true); // Open the delete modal
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <EllipsisVerticalIcon
          width={20}
          height={20}
          className="cursor-pointer"
          color="white"
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className="mt-2"
      >
        <MenuItem
          onClick={handleEdit}
          className="w-full text-sm text-black flex items-center"
        >
          <PencilIcon className="mr-2 text-black" width={20} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={handleDelete}
          className="w-full text-sm text-black flex items-center"
        >
          <TrashIcon className="mr-2 text-black" width={20} />
          Delete
        </MenuItem>
      </Menu>

      {showUpdateModal && (
        <UpdateBlog blog={blog} onClose={() => setShowUpdateModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteBlog
          blogId={blog.postId}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};
