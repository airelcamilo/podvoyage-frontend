import { PodcastData } from "@/interface/types/PodcastData";
import { Card, Image, Stack, Heading, Text, AspectRatio, Skeleton } from "@chakra-ui/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { usePodcastsContext } from "../context/PodcastsContext";

interface ResultBoxProps {
  result: PodcastData;
}

const ResultBox: React.FC<ResultBoxProps> = ({ result }) => {
  const [isHover, setIsHover] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { podcasts } = usePodcastsContext();
  const router = useRouter()

  const over = () => {
    setIsHover(true);
  }
  const out = () => {
    setIsHover(false);
  }

  const click = () => {
    if (result.id != 0)
      return router.push('/podcast/' + result.id);

    let isSaved = false;
    for (let i = 0; i < podcasts.length; i++) {
      if (podcasts[i].trackId == result.trackId) {
        isSaved = true;
        return router.push('/podcast/' + podcasts[i].id)
      }
    }
    if (!isSaved)
      return router.push('/result/' + result.trackId)
  }

  return (
    <>
      <Card
        maxW='170px'
        _hover={{
          bg: "brand.200",
          transform: 'translateY(-5px)',
          transitionDuration: '0.2s',
          transitionTimingFunction: "ease-in-out"
        }}
        onMouseOver={over}
        onMouseOut={out}
        onClick={click}
        cursor='pointer'>
        <Skeleton
          startColor='purple.400'
          endColor='purple'
          isLoaded={isImageLoaded}>
          <AspectRatio ratio={1 / 1} >
            <Image
              src={result.artworkUrl600}
              alt={result.trackName}
              borderRadius='4px'
              objectFit='cover'
              onLoad={() => setIsImageLoaded(true)}
            />
          </AspectRatio>
        </Skeleton>
        <Stack m='2' spacing='1'>
          <Heading fontSize='md' noOfLines={2} size='md'>{result.trackName}</Heading>
          <Text fontSize='sm' isTruncated color='gray.100'>
            {result.artistName}
          </Text>
        </Stack>
      </Card>
    </>
  )
}

export default ResultBox;