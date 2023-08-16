import { PodcastData } from "./PodcastData";

export interface FolderData {
    id: number;
    folderName: string;
    podcasts: PodcastData[];
}