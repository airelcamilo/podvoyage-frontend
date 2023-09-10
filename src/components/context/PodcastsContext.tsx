import ChildrenProps from '@/interface/types/ChildrenProps';
import { ItemData } from '@/interface/types/ItemData';
import { PodcastData } from '@/interface/types/PodcastData';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from '../user/UserContext';

interface PodcastsData {
  items: ItemData[];
  setItems: (data: ItemData[]) => void;

  podcasts: PodcastData[];
  setPodcasts: (data: PodcastData[]) => void;
  
  isLoading: boolean;
  fetchData: (query: Record<string, string>) => void;
}

export const PodcastsContext = createContext<PodcastsData>(
  {} as PodcastsData
);

export const usePodcastsContext = () => useContext(PodcastsContext);

export const PodcastsContextProvider: React.FC<ChildrenProps> = ({
  children
}) => {
  const [items, setItems] = useState<ItemData[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { isAuthenticated, authFetch } = useUserContext();

  const getPodcasts = async () => {
    const response = await authFetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/podcasts'
    );

    const data: PodcastData[] = await response.json();
    setPodcasts(data);
  }

  const getItems = async () => {
    const response = await authFetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/all'
    );

    const data: ItemData[] = await response.json();
    setItems(data);
    setLoading(false);
  }

  const fetchData = async (query: Record<string, string>) => {
    setLoading(true);
    const param = query['podcastName']

    if (param == '' || param == undefined) {
      getItems()
      getPodcasts()
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData({});
    }
  }, []);

  return (
    <PodcastsContext.Provider
      value={{
        items, setItems, podcasts, setPodcasts, isLoading, fetchData
      }}
    >
      {children}
    </PodcastsContext.Provider>
  );
};
