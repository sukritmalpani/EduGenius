interface UserToolTipProps {
  username: string;
  userProfileImage?: string;
  tooltipContent?: React.ReactNode;
}

export default function UserToolTip({
  username,
  userProfileImage,
  tooltipContent = "View profile",
}: UserToolTipProps) {
  return (
    <div className="relative group inline-block">
      <div className="flex items-center gap-2">
        <img
          src={userProfileImage}
          alt={username}
          className="w-8 h-8 rounded-full"
        />
        <span>{username}</span>
      </div>
      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-sm p-1 rounded">
        View profile
      </div>
    </div>
  );
}
