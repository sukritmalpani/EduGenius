import { BaseEnvironment } from "./BaseEnvironment";
import axios from "axios";

const env = new BaseEnvironment();

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export const getYoutubeVideos = async (query: string) => {
  const param = {
    part: "snippet",
    q: query,
    maxResults: 1,
    type: "video",
    key: env.NEXT_PUBLIC_YOUTUBE_API_KEY, // Ensure this key is set in your environment variables
  };

  const response = await axios.get(YOUTUBE_BASE_URL, { params: param });
  return response.data.items;
};
