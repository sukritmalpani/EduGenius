import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

type UserToolTipProps = {
  username: string;
  userProfileImage: string;
  role?: string;
};

const UserToolTip = ({
  username,
  userProfileImage,
  role = "Instructor",
}: UserToolTipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-gray-400">Course by</span>
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 px-2 py-1 h-auto bg-[#8A2BE2] text-white"
            >
              <Avatar className="h-5 w-5 border border-white">
                <AvatarImage
                  src={userProfileImage || "/userProfile.png"}
                  alt={username}
                />
                <AvatarFallback className="bg-[#2C3E50] text-white">
                  <User className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
              <span>{username}</span>
            </Badge>
          </div>
        </TooltipTrigger>

        <TooltipContent
          side="bottom"
          align="center"
          className="p-0 overflow-hidden border border-[#8A2BE2] bg-[#1A1A2E] text-white shadow-lg"
        >
          <div className="flex flex-col items-center p-4">
            <Avatar className="h-16 w-16 mb-2 border border-[#8A2BE2]">
              <AvatarImage
                src={userProfileImage || "/userProfile.png"}
                alt={username}
              />
              <AvatarFallback className="text-lg bg-[#2C3E50] text-white">
                {username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-[#00FFFF]">{username}</h3>
            <p className="text-xs text-gray-400">{role}</p>
          </div>
          <TooltipArrow className="fill-[#8A2BE2]" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserToolTip;
