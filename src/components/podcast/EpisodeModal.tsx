import { EpisodeData, PodcastData } from '@/interface/types/PodcastData';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Text, Image, Heading, IconButton, Center, Box, ModalFooter } from '@chakra-ui/react';
import React from 'react';
import { FaPlay } from 'react-icons/fa6';
import DOMPurify from 'isomorphic-dompurify';
import { convertDate, convertDuration } from '@/utils/Convert';

interface EpisodeModalProps {
  episode: EpisodeData;
  podcast: PodcastData;
  isOpen: boolean;
  onClose: () => void;
}

const EpisodeModal: React.FC<EpisodeModalProps> = ({ episode, podcast, isOpen, onClose }) => {
  const play = () => {

  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior='inside'
        size={['full', 'xl', 'xl', 'xl']}
        motionPreset='slideInBottom'>
        <ModalOverlay/>
        <ModalContent top={['0', '10%', '10%', '10%']} h={['0', '450px', '450px', '450px']}>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={episode.artworkUrl == '' ? podcast.artworkUrl600 : episode.artworkUrl}
              alt={episode.title}
              borderRadius='4px'
              boxSize='100px'
              align='start'
              mt='20px'
            />
            <Box>
              <Heading
                color='white'
                fontSize='md'
                my='10px'>
                {episode.season != 0 ? 'S' + episode.season + ' • ' : ''}{episode.title}
              </Heading>
              <Text
                fontSize='sm'
                color='gray.300'
                mb='7px'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(episode.desc)
                }}></Text>
              <Box
                fontSize='xs'
                color='gray.400'>
                {convertDate(episode.date)} • {convertDuration(episode.duration)}
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Center>
              <IconButton
                aria-label='Play'
                isRound={true}
                onClick={play}
                icon={<FaPlay />}
                variant="custom"
              />
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EpisodeModal;