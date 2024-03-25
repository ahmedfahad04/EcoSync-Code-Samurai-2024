import { EllipsisVerticalIcon, PencilIcon } from "@heroicons/react/16/solid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LogOut } from "lucide-react";
import * as React from "react";

export const AccountMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleEdit = () => {
    setAnchorEl(null); // Close the menu
    // setShowUpdateModal(true); // Open the update modal
  };

  const handleDelete = () => {
    setAnchorEl(null); // Close the menu
    // setShowDeleteModal(true); // Open the delete modal
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  return (
    <div>
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <EllipsisVerticalIcon
          width={20}
          height={20}
          className="cursor-pointer hover:text-slate-500 text-black"
          color="white"
        />
      </button>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              bottom: 0, // Changed top to bottom
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(50%) rotate(45deg)", // Adjusted transform
              zIndex: 0,
            },
          },
        }}
        className="relative -mt-24 -ml-44 cursor-pointer"
      >
        {/* Menu content */}

        <MenuItem
          onClick={handleEdit}
          className="w-full text-sm text-black flex items-center"
        >
          <PencilIcon className="mr-2 text-black" width={20} />
          Edit Profile
        </MenuItem>

        <hr className="mx-2" />

        <MenuItem
          onClick={handleDelete}
          className="w-52 text-sm text-black flex items-center"
        >
          <LogOut className="mr-2  rotate-180 text-red-500" width={20} />
          <p className="text-red-500">Logout</p>
        </MenuItem>
      </Menu>

      {/* {showUpdateModal && (
        <UpdateBlog blog={blog} onClose={() => setShowUpdateModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteBlog
          blogId={blog.postId}
          onClose={() => setShowDeleteModal(false)}
        />
      )} */}
    </div>
  );
};
