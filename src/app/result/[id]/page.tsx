'use client'

import PodcastDetail from "@/components/podcast/PodcastDetail";
import { Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { PodcastData } from "@/interface/types/PodcastData";

const Result = ({ params }: { params: { id: string } }) => {
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState<PodcastData>();

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/search-pod/' + params.id
    );

    const data: PodcastData = await response.json();
    setResult(data);
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

  if (result == undefined || result.id == undefined) {
    return (
      <>
        <Box pt={'120px'}>
          <Center>
            <Text>Sorry... The podcast you search not found!</Text>
          </Center>
        </Box>
      </>
    )
  }

  return (
    <>
      <PodcastDetail podcast={result} isSaved={false}></PodcastDetail>
    </>
  )
}

export default Result;
