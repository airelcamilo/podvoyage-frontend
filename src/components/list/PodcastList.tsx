import { Center, CircularProgress, Heading, SimpleGrid, Box, Flex, Spacer, IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { usePodcastsContext } from '../context/PodcastsContext';
import ItemBox from './ItemBox';
import { FaPlus } from "react-icons/fa6";
import AddFolderModal from '../folder/AddFolderModal';

const PodcastList = () => {
  const { isLoading, items } = usePodcastsContext();
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
            Subscribed Podcast
          </Heading>
          <Spacer /><IconButton
            aria-label='Add Folder'
            onClick={onOpen}
            icon={<FaPlus />}
            variant="custom"
          />
          <AddFolderModal
            isOpen={isOpen}
            onClose={onClose} />
        </Flex>
        <SimpleGrid
          columns={[2, 3, 3, 4, 5]}
          spacing={['20px', '30px', '50px', '50px']}
          px={['30px', '60px', '80px', '80px']}
          pb={'80px'}
          pt={'20px'}>
          {items.map((item) => (
            <ItemBox key={item.id} item={item} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default PodcastList;
