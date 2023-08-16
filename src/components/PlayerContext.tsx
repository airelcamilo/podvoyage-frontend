import ChildrenProps from '@/interface/types/ChildrenProps';
import { EpisodeData } from '@/interface/types/PodcastData';
import { createContext, useContext, useEffect, useState } from 'react';
import AudioPlayer from './audio-player/AudioPlayer';

interface PlayerContextData {
  episodePlayed: EpisodeData | undefined;
  setEpisodePlayed: (data: EpisodeData) => void;
  artistName: string | undefined;
  setArtistName: (data: string) => void;
}

export const PlayerContext = createContext<PlayerContextData>(
  {} as PlayerContextData
);

export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerContextProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const [episodePlayed, setEpisodePlayed] = useState<EpisodeData>();
  const [artistName, setArtistName] = useState<string>();

  useEffect(() => {
    // GET FROM COOKIES?
  }, []);

  return (
    <PlayerContext.Provider
      value={{episodePlayed, setEpisodePlayed, artistName, setArtistName }}
    >
      {children}
      <AudioPlayer setEpisode={setEpisodePlayed} episode={episodePlayed} artistName={artistName} isModal={false} />
    </PlayerContext.Provider>
  );
};
