import { Center, CircularProgress, Heading, SimpleGrid, Box, Flex, Spacer, IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { usePodcastSearchContext } from './PodcastSearchContext';
import ItemBox from './box/ItemBox';
import ResultBox from './box/ResultBox';
import { FaPlus } from "react-icons/fa6";
import AddFolderModal from './folder/AddFolderModal';

const PodcastList = () => {
  const { isSearch, isLoading, results, items } = usePodcastSearchContext();
  const { isOpen, onOpen, onClose } = useDisclosure()

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
            {(isSearch) ? 'Search Podcast' : 'Subscribed Podcast'}
          </Heading>
          <Spacer />
          {(isSearch) 
          ? ''
          : <IconButton
            aria-label='Add Folder'
            onClick={onOpen}
            icon={<FaPlus />}
            variant="custom"
          /> }
          <AddFolderModal
          isOpen={isOpen}
          onClose={onClose}/>
        </Flex>
        <SimpleGrid
          columns={[2, 3, 3, 4, 5]}
          spacing={['20px', '30px', '50px', '50px']}
          px={['30px', '60px', '80px', '80px']}
          pb={'80px'}
          pt={'20px'}>
          {isSearch
            ? results.map((result) => (
              <ResultBox key={result.trackId} result={result} />
            ))
            : items.map((item) => (
              <ItemBox key={item.id} item={item} />
            ))
          }
        </SimpleGrid>
      </Box>
    </>
  );
};

export default PodcastList;
