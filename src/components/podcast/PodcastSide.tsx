import { PodcastData } from "@/interface/types/PodcastData";
import { Image, Stack, Heading, Center, Box } from "@chakra-ui/react";
import IconText from "./IconText";
import { FaAlignJustify, FaLink } from "react-icons/fa6";
import Category from "./Category";

interface PodcastSideProps {
  podcast: PodcastData
}

const PodcastSide: React.FC<PodcastSideProps> = ({ podcast }) => {
  return (
    <>
      <Center>
        <Box w={['300px', '400px', '600px', '250px']} mr={['2px', '0', '0', '20px']} mb={['20px', '20px', '20px', '0']}>
          <Image
            src={podcast.artworkUrl600}
            alt={podcast.trackName}
            borderRadius='4px'
            boxSize='250px'
          />
          <Stack spacing='3' mt='20px' ml='5px'>
            <Heading fontSize='xl' noOfLines={2} size='md'>{podcast.trackName}</Heading>
            <Box mt='5px' mb='10px'>
              {podcast.categories != undefined && podcast.categories.map((category) => (
                <Category key={(category.id == 0) ? category.name : category.id} category={category} />
              ))}
            </Box>
            <IconText icon={FaLink} color='gray.300' isLink={true} link={podcast.link}>{podcast.artistName}</IconText>
            <Box></Box>
            <IconText icon={FaAlignJustify} color='gray.300' isLink={false} link=''>{podcast.desc}</IconText>
          </Stack>
        </Box>
      </Center>
    </>
  )
}

export default PodcastSide;