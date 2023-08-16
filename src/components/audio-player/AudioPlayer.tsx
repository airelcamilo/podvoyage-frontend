import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import { useRef, useEffect, useState } from 'react';
import { EpisodeData } from '@/interface/types/PodcastData';
import { Flex, VStack, Center, Box } from '@chakra-ui/react';
import { BaseResponse } from '@/interface/types/BaseResponse';

interface AudioPlayerProps {
  setEpisode: any;
  episode: EpisodeData | undefined;
  artistName: string | undefined;
  isModal: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ setEpisode, episode, artistName, isModal }) => {
  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("") : undefined
  );
  const progressBarRef = useRef()
  const [currentTime, setCurrentTime] = useState<number>(0)

  const markAsPlayed = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/played/' + episode!.id, requestOptions
    );

    const data: BaseResponse<EpisodeData> = await response.json();
    episode!.played = true;
    setEpisode(undefined);
  }

  const markAsNotPlayed = async () => {
    episode!.played = false;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }

    await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/played/' + episode!.id, requestOptions
    );
  }

  const setCurrentTimeinAPI = async () => {
    const currentTime = audioRef.current!.currentTime;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentTime: currentTime.toString() })
    }

    await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/current-time/' + episode!.id, requestOptions
    );
    episode!.currentTime = currentTime;
  }

  useEffect(() => {
    if (episode != undefined) {
      audioRef.current!.src = episode?.audio;
      audioRef.current!.currentTime = episode.currentTime;
      setCurrentTime(episode.currentTime);
  
      if (episode!.played) {
        markAsNotPlayed();
      }
    }
  }, [episode]);

  if (episode == undefined) {
    return (<></>);
  }

  return (
    <>
      <Box m='auto'>
        <Flex
          align='center'
          zIndex="1000"
          as="div"
          position="fixed"
          w={["100%", "100%", "90%", "70%"]}
          bg='brand.100'
          borderRadius='10px 10px 0 0'
          border='4px solid'
          borderColor='brand.200'
          bottom='-3px'
          justifyContent='center'
          left={["0", "0", "5%", "15%"]}>
          <Center w='100%' p={["10px", "15px", "20px", "20px"]}>
            <Box w={["20%", "60%", "50%", "50%", "50%", "50%"]}>
              <DisplayTrack episode={episode} artistName={artistName} />
            </Box>
            {isModal
              ? ''
              : <VStack w={["80%", "40%", "50%", "50%", "50%", "50%"]}>
                <Controls
                  audioRef={audioRef}
                  progressBarRef={progressBarRef}
                  setCurrentTime={setCurrentTime} 
                  setCurrentTimeinAPI={setCurrentTimeinAPI}
                  markAsPlayed={markAsPlayed} />
                <ProgressBar
                  audioRef={audioRef}
                  duration={episode.duration}
                  progressBarRef={progressBarRef}
                  setCurrentTime={setCurrentTime}
                  currentTime={currentTime} />
              </VStack>
            }
          </Center>
        </Flex>
      </Box>
    </>
  );
};
export default AudioPlayer;