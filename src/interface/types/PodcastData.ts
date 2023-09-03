export interface PodcastData {
  id: number;
  trackId: number;
  userId: number;
  trackName: string;
  artistName: string;
  feedUrl: string;
  artworkUrl600: string;
  desc: string;
  link: string;
  categories: CategoryData[];
  episodes: EpisodeData[];
}

export interface CategoryData {
  id: number;
  name: string;
}

export interface EpisodeData {
  id: number;
  podcastId: number;
  trackId: number;
  userId: number;
  title: string;
  desc: string;
  season: number;
  date: string;
  duration: number;
  audio: string;
  artworkUrl: string;
  played: boolean;
  currentTime: number;
}
