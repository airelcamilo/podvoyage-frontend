import { PodcastData } from "./PodcastData";

export interface SearchResult {
	resultCount: number;
	results: PodcastData[];
}