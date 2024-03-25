import AvatarWithDescription from "@/components/AvatarWithDescription";

export const createAvatar = (
  avatar: string,
  name: string
  // designation: string
) => {
  return (
    <AvatarWithDescription
      avatar={avatar}
      title={name}
      // subTitle={designation}
    />
  );
};

export const getInitials = (name: string) => {
  const parts = name.split(" ");
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};
