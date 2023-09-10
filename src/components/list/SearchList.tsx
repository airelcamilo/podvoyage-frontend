import { Center, CircularProgress, Heading, SimpleGrid, Box, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';
import ResultBox from './ResultBox';
import { useSearchContext } from '../context/SearchContext';

const PodcastList = () => {
  const { isLoading, results } = useSearchContext();

  if (isLoading)
    return (
      <Center px={'80px'} pb={'80px'} pt={'120px'}>
        <CircularProgress color={'purple.400'} isIndeterminate />
      </Center>
    );

  return (
    <>
      <Box pt={'120px'}>
        <Flex px={['30px', '60px', '80px', '80px']}>
          <Heading as='u'>
            Search Podcast
          </Heading>
          <Spacer />
        </Flex>
        <SimpleGrid
          columns={[2, 3, 3, 4, 5]}
          spacing={['20px', '30px', '50px', '50px']}
          px={['30px', '60px', '80px', '80px']}
          pb={'80px'}
          pt={'20px'}>
          {results.map((result) => (
            <ResultBox key={result.trackId} result={result} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default PodcastList;
