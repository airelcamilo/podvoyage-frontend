import { PodcastData } from "@/interface/types/PodcastData";
import { Card, Stack, Flex, Button, Heading, useToast, ButtonGroup } from "@chakra-ui/react";
import PodcastSide from "./PodcastSide";
import Episode from "./Episode";
import { useState, useEffect } from 'react';
import { usePodcastSearchContext } from "../PodcastSearchContext";
import { updateItems, updatePodcasts } from "@/utils/UpdateItems";
import ChangeFolderButton from "./ChangeFolderButton";

interface PodcastDetailProps {
  podcast: PodcastData
  isSaved: boolean
}

const PodcastDetail: React.FC<PodcastDetailProps> = ({ podcast, isSaved }) => {
  const { setItems, items, setPodcasts } = usePodcastSearchContext();
  const [clientWindowHeight, setClientWindowHeight] = useState(500);
  const [isSavedState, setIsSavedState] = useState(isSaved);
  const [itemsAmount, setItemsAmount] = useState(10);
  const toast = useToast();

  const handleScroll = () => {
    if (window.scrollY >= clientWindowHeight + 500) {
      setClientWindowHeight(window.scrollY)
      setItemsAmount(itemsAmount + 5);
    }
  };

  const subscribe = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(podcast)
    }

    await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/podcast', requestOptions
    );

    setIsSavedState(true);
    updateItems(setItems);
    updatePodcasts(setPodcasts);
    podcast.id = items[items.length - 1].podcastId;

    toast({
      title: `Subscribe`,
      description: `Successfully subscribe to ${podcast.trackName}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  }

  const unsubscribe = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }

    await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/podcast/' + podcast.id, requestOptions
    );

    setIsSavedState(false);
    updateItems(setItems);
    updatePodcasts(setPodcasts);
    podcast.id = items[items.length - 1].podcastId;

    toast({
      title: `Unsubscribe`,
      description: `Successfully unsubscribe from ${podcast.trackName}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <Flex
        py={'120px'}
        px={['0', '50px', '80px', '80px']}
        flexDirection={['column', 'column', 'column', 'row']}
        align={['center', 'center', 'center', 'start']}>
        <PodcastSide podcast={podcast} />
        <Card flex={['0', '5', '5', '5']}>
          <Stack gap={'0px'}>
            <ButtonGroup
              mx={['10px', '20px', '40px', '40px']}
              mt={['10px', '20px', '40px', '40px']}
              mb={2}>
              <Button
                variant={(isSavedState) ? 'customRed' : 'custom'}
                aria-label={(isSavedState) ? 'Unsubscribe' : 'Subscribe'}
                onClick={(isSavedState) ? unsubscribe : subscribe}
                w={(isSavedState) ? 'fit-content' : '100%'}>
                {(isSavedState) ? 'Unsubscribe' : 'Subscribe'}
              </Button>
              {(isSavedState) ? <ChangeFolderButton podcast={podcast}/> : ''}
            </ButtonGroup>
            <Heading mx={['20px', '20px', '40px', '40px']} as='u' fontSize='xl' my={4}>Episodes</Heading>
            {podcast.episodes != undefined && podcast.episodes.slice(0, itemsAmount).map((episode) => (
              <>
                <Episode key={episode.id == 0 ? episode.title : episode.id} episode={episode} podcast={podcast} />
              </>
            ))}
          </Stack>
        </Card>
      </Flex>
    </>
  )
}

export default PodcastDetail;