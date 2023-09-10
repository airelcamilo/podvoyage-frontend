import { EpisodeData, PodcastData } from '@/interface/types/PodcastData';
import { Flex, Container, Text, Image, Heading, IconButton, Center, Box, Spacer, Skeleton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { FaCirclePlay, FaCirclePause, FaCircleCheck } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import EpisodeModal from './EpisodeModal';
import { convertDate, convertDuration } from '@/utils/Convert';
import { usePlayerContext } from '../context/PlayerContext';

interface EpisodeProps {
  episode: EpisodeData;
  podcast: PodcastData;
}

const Episode: React.FC<EpisodeProps> = ({ episode, podcast }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHover, setIsHover] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  episode.artworkUrl = (episode.artworkUrl == '') ? podcast.artworkUrl600 : episode.artworkUrl;
  const { episodePlayed, setEpisodePlayed, setArtistName } = usePlayerContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [desc, setDesc] = useState('');

  const over = () => {
    setIsHover(true);
  }
  const out = () => {
    setIsHover(false);
  }

  const play = () => {
    setEpisodePlayed(episode);
    setArtistName(podcast.artistName);
    setIsPlaying(true);
  }

  const sanitizeInput = (input: string) => {
    const sanitizedInput = DOMPurify.sanitize(input);
    const elementCount = countElementsInDOM(sanitizedInput);

    if (elementCount > 7) {
      const truncatedInput = truncateHTML(sanitizedInput, 7);
      return truncatedInput;
    }

    return sanitizedInput;
  }

  const countElementsInDOM = (html: any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.querySelectorAll('*').length;
  };

  const truncateHTML = (html: any, maxElements: number) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = doc.querySelectorAll('*');

    if (elements.length > maxElements) {
      for (let i = maxElements; i < elements.length; i++) {
        const element = elements[i];
        element.parentNode!.removeChild(element);
      }
    }

    return doc.documentElement.outerHTML;
  }

  useEffect(() => {
    setDesc(sanitizeInput(episode.desc));
  }, []);

  useEffect(() => {
    if (episode == undefined || episodePlayed?.title != episode.title) {
      setIsPlaying(false);
    }
  }, [episodePlayed]);

  return (
    <>
      <Container maxW='container.max' px={['10px', '20px', '40px', '40px']} py='20px' _hover={{
        bg: "brand.200",
        transitionDuration: '0.2s',
        transitionTimingFunction: "ease-in-out"
      }}
        onMouseOver={over}
        onMouseOut={out}
        cursor='pointer'
        bg={episode.played ? '#07000a' : 'inherit'}>
        <Flex gap={4}>
          <Skeleton
            startColor='purple.400'
            endColor='purple'
            isLoaded={isImageLoaded}
            height={['0', '50px', '100px', '100px']}
            width={['0', '50px', '100px', '100px']}>
            <Image
              src={episode.artworkUrl}
              alt={episode.title}
              borderRadius='4px'
              boxSize={['0', '50px', '100px', '100px']}
              align='start'
              onClick={onOpen}
              onLoad={() => setIsImageLoaded(true)}
            />
          </Skeleton>
          <Box maxW={['350px', '60%', '60%', '60%']} onClick={onOpen}>
            <Heading
              color={episode.played ? 'purple.300' : 'white'}
              fontSize='md'
              noOfLines={2}
              mb='10px'>
              {episode.season != 0 ? 'S' + episode.season + ' • ' : ''}{episode.title}
            </Heading>
            <Text
              fontSize='sm'
              color={episode.played ? 'purple.200' : 'gray.300'}
              noOfLines={3}
              mb='7px'
              dangerouslySetInnerHTML={{
                __html: desc
              }}></Text>
            <Box
              fontSize='xs'
              color={episode.played ? 'purple.200' : 'gray.400'}>
              {convertDate(episode.date)} • {convertDuration(episode.duration)}
            </Box>
          </Box>
          <Spacer onClick={onOpen}></Spacer>
          <Center>
            {episode.played
              ? <IconButton
                aria-label='Played'
                isRound={true}
                onClick={play}
                icon={<FaCircleCheck size='40px' />}
                variant="custom" />
              : <IconButton
                aria-label='Play'
                isRound={true}
                onClick={play}
                icon={isPlaying ? <FaCirclePause size='40px' /> : <FaCirclePlay size='40px' />}
                variant="custom" />
            }
          </Center>
        </Flex>
        <EpisodeModal
          episode={episode}
          podcast={podcast}
          isOpen={isOpen}
          onClose={onClose} />
      </Container>
    </>
  );
};

export default Episode;