import { EpisodeData } from "@/interface/types/PodcastData";
import { Flex, Image, Box, Heading, VStack, Show } from "@chakra-ui/react";

interface DisplayTrackProps {
  episode: EpisodeData;
  artistName: string | undefined;
}

const DisplayTrack: React.FC<DisplayTrackProps> = ({ episode, artistName }) => {
  return (
    <>
      <Flex gap={4}>
        <Image
          mr={['20px', '0', '0', '0']}
          src={episode.artworkUrl}
          alt={episode.title}
          borderRadius='4px'
          boxSize={['50px', '50px', '80px', '80px']}
          align='start'
        />
        <Show above='sm'>
          <VStack maxW={['500px', '700px', '700px', '900px']} justifyContent='center' align='start' mr='20px'>
            <Heading
              color='white'
              fontSize='md'
              noOfLines={2}
              mb='5px'>
              {episode.title}
            </Heading>
            <Box fontSize='xs'>
              {artistName}
            </Box>
          </VStack>
        </Show>
      </Flex>
    </>
  );
};
export default DisplayTrack;