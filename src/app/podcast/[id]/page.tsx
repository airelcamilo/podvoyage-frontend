'use client'

import PodcastDetail from "@/components/podcast/PodcastDetail";
import { Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { PodcastData } from "@/interface/types/PodcastData";
import { useUserContext } from "@/components/user/UserContext";

const Podcast = ({ params }: { params: { id: string } }) => {
  const [isLoading, setLoading] = useState(true);
  const [podcast, setPodcast] = useState<PodcastData>();
  const { authFetch } = useUserContext();

  const fetchData = async () => {
    setLoading(true);
    const response = await authFetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/podcast/' + params.id
    );

    const data: PodcastData = await response.json();
    setPodcast(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading)
    return (
      <Center px={'80px'} pb={'80px'} pt={'120px'}>
        <CircularProgress color={'purple.400'} isIndeterminate />
      </Center>
    );

  if (podcast == undefined || podcast.id == undefined) {
    return (
      <main>
        <Box pt={'120px'}>
          <Center>
            <Text>Sorry... The podcast is not saved!</Text>
          </Center>
        </Box>
      </main>
    )
  }

  return (
    <>
      <PodcastDetail podcast={podcast} isSaved={true}></PodcastDetail>
    </>
  )
}

export default Podcast;
