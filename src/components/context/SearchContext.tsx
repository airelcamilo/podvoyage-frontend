import { BaseResponse } from '@/interface/types/BaseResponse';
import ChildrenProps from '@/interface/types/ChildrenProps';
import { PodcastData } from '@/interface/types/PodcastData';
import { SearchResult } from '@/interface/types/SearchResult';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from '../user/UserContext';

interface SearchContextData {
  results: PodcastData[];
  setResults: (data: PodcastData[]) => void;
  resultCount: number;
  setResultCount: (data: number) => void;

  isLoading: boolean;
  search: (query: Record<string, string>) => void;
}

export const SearchContext = createContext<SearchContextData>(
  {} as SearchContextData
);

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider: React.FC<ChildrenProps> = ({
  children
}) => {
  const [results, setResults] = useState<PodcastData[]>([]);
  const [resultCount, setResultCount] = useState<number>(0);
  const [isLoading, setLoading] = useState(true);
  const { authFetch } = useUserContext();

  const search = async (query: Record<string, string>) => {
    setLoading(true);
    const param = query['podcastName']

    const response = await authFetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/search-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ podcastName: param })
    }
    );

    const data: BaseResponse<SearchResult> = await response.json();
    setResults(data.results);
    setResultCount(data.resultCount)
    setLoading(false);
  };

  return (
    <SearchContext.Provider
      value={{
        results, setResults, resultCount, setResultCount, isLoading, search
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
