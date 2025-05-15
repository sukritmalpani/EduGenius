interface UserToolTipProps {
  username: string;
  userProfileImage?: string;
}

export default function UserToolTip({
  username,
  userProfileImage,
}: UserToolTipProps) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={userProfileImage}
        alt={username}
        className="w-8 h-8 rounded-full"
      />
      <span>{username}</span>
    </div>
  );
}
