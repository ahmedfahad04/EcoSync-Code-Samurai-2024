import { useAuth } from "@/context/AuthContext";
import { EllipsisVerticalIcon, PencilIcon } from "@heroicons/react/16/solid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LogOut } from "lucide-react";
import * as React from "react";
import UpdateUserModal from "./Modals/User/UpdateUserModal";

export const AccountMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showUpdateUserModal, setShowUpdateUserModal] =
    React.useState<boolean>(false);

  const open = Boolean(anchorEl);
  const { user, logout } = useAuth();

  const handleEdit = () => {
    setAnchorEl(null); // Close the menu
    setShowUpdateUserModal(true);
  };

  const handleLogout = () => {
    setAnchorEl(null); // Close the menu
    logout();
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
          onClick={handleLogout}
          className="w-52 text-sm text-black flex items-center"
        >
          <LogOut className="mr-2  rotate-180 text-red-500" width={20} />
          <p className="text-red-500">Logout</p>
        </MenuItem>
      </Menu>

      {showUpdateUserModal && (
        <UpdateUserModal
          isOpen={showUpdateUserModal}
          onClose={() => setShowUpdateUserModal(false)}
          userData={{
            name: user?.name || "",
            role: user?.role.role_name || "",
            email: user?.email || "",
            phone_number: user?.phone_number || "",
            user_id: user?.user_id || "",
          }}
        />
      )}
    </div>
  );
};
