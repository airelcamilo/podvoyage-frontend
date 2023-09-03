import { PodcastData } from "./PodcastData";

export interface FolderData {
    id: number;
    userId: number;
    folderName: string;
    podcasts: PodcastData[];
}