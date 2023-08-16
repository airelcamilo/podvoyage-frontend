import { BaseResponse } from '@/interface/types/BaseResponse';
import ChildrenProps from '@/interface/types/ChildrenProps';
import { ItemData } from '@/interface/types/ItemData';
import { PodcastData } from '@/interface/types/PodcastData';
import { SearchResult } from '@/interface/types/SearchResult';
import { createContext, useContext, useEffect, useState } from 'react';

interface PodcastSearchData {
  results: PodcastData[];
  setResults: (data: PodcastData[]) => void;
  items: ItemData[];
  setItems: (data: ItemData[]) => void;
  podcasts: PodcastData[];
  setPodcasts: (data: PodcastData[]) => void;
  resultCount: number;
  setResultCount: (data: number) => void;
  isSearch: boolean
  isLoading: boolean;
  fetchData: (query: Record<string, string>) => void;
}

export const PodcastSearchContext = createContext<PodcastSearchData>(
  {} as PodcastSearchData
);

export const usePodcastSearchContext = () => useContext(PodcastSearchContext);

export const PodcastSearchContextProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const [results, setResults] = useState<PodcastData[]>([]);
  const [items, setItems] = useState<ItemData[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastData[]>([]);
  const [resultCount, setResultCount] = useState<number>(0);
  const [isLoading, setLoading] = useState(true);
  const [isSearch, setSearch] = useState(true);

  const getPodcasts = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/podcasts'
    );

    const data: BaseResponse<PodcastData[]> = await response.json();
    setPodcasts(data);
  }

  const getItems = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/all'
    );

    const data: BaseResponse<ItemData[]> = await response.json();
    setItems(data);
    setLoading(false);
    setSearch(false);
  }

  const getSearch = async (param: String) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ podcastName: param })
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/search-all', requestOptions
    );

    const data: BaseResponse<SearchResult> = await response.json();
    setResults(data.results);
    setResultCount(data.resultCount)
    setLoading(false);
    setSearch(true);
  }

  const fetchData = async (query: Record<string, string>) => {
    setLoading(true);
    const param = query['podcastName']

    if (param == '' || param == undefined) {
      getItems()
      getPodcasts()
    } else {
      getSearch(param)
    }
  };

  useEffect(() => {
    fetchData({});
  }, []);

  return (
    <PodcastSearchContext.Provider
      value={{ results, setResults, items, setItems, podcasts, setPodcasts, resultCount, setResultCount, isSearch, isLoading, fetchData }}
    >
      {children}
    </PodcastSearchContext.Provider>
  );
};
