import { ItemData } from "@/interface/types/ItemData";
import { PodcastData } from "@/interface/types/PodcastData";

export const updateItems = async (
  setItems: (data: ItemData[]) => void,
  authFetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>) => {
  const response = await authFetch(
    process.env.NEXT_PUBLIC_POD_API_URL +
    '/api/all'
  );

  const data: ItemData[] = await response.json();
  setItems(data);
}

export const updatePodcasts = async (
  setPodcasts: (data: PodcastData[]) => void,
  authFetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>) => {
  const response = await authFetch(
    process.env.NEXT_PUBLIC_POD_API_URL +
    '/api/podcasts'
  );

  const data: PodcastData[] = await response.json();
  setPodcasts(data);
}