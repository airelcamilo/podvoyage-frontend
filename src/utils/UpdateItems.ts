import { BaseResponse } from "@/interface/types/BaseResponse";
import { ItemData } from "@/interface/types/ItemData";
import { PodcastData } from "@/interface/types/PodcastData";

export const updateItems = async (setItems: (data: ItemData[]) => void) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_POD_API_URL +
    '/api/all'
  );

  const data: BaseResponse<ItemData[]> = await response.json();
  setItems(data);
}

export const updatePodcasts = async (setPodcasts: (data: PodcastData[]) => void) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/podcasts'
    );

    const data: BaseResponse<PodcastData[]> = await response.json();
    setPodcasts(data);
  }