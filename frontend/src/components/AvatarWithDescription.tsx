import Avatar from "@/components/Avatar";

interface AvatarDescriptionProps {
  avatar: string;
  title: string;
  subTitle?: string;
  customParentClass?: string;
  customTitleClass?: string;
  customSubTitleClass?: string;
}

const AvatarWithDescription: React.FC<AvatarDescriptionProps> = ({
  avatar,
  title,
  subTitle,
  customParentClass = "",
  customTitleClass = "",
  customSubTitleClass = "",
}: AvatarDescriptionProps) => {
  return (
    <div className={`flex items-center ${customParentClass}`}>
      <div className="w-12">
        <Avatar
          image={avatar}
          fullName={title}
          divCustomClass={
            avatar.length ? "w-12 h-11 items-end" : "w-11 h-11 items-center"
          }
          circle={true}
          imgCustomClass={"border-2 border-gray-200"}
        />
      </div>

      <div className="ml-4 mt-1 text-sm">
        <p className={customTitleClass}>{title}</p>
        <p className={`text-[#9AA2B1] ${customSubTitleClass}`}>{subTitle}</p>
      </div>
    </div>
  );
};

export default AvatarWithDescription;
