import { Text, Heading, SimpleGrid, Box, Flex, Spacer, IconButton, useToast } from '@chakra-ui/react';
import React from 'react';
import { FolderData } from '@/interface/types/FolderData';
import ResultBox from '../box/ResultBox';
import { FaXmark } from "react-icons/fa6";
import { usePodcastSearchContext } from '../PodcastSearchContext';
import { updateItems } from '@/utils/UpdateItems';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../user/UserContext';

interface FolderListProps {
  folder: FolderData;
}

const FolderList: React.FC<FolderListProps> = ({ folder }) => {
  const { setItems } = usePodcastSearchContext();
  const router = useRouter();
  const toast = useToast();
  const { authFetch } = useUserContext();

  const removeFolder = async () => {
    await authFetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/folder/' + folder.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    updateItems(setItems, authFetch);
    router.back()

    toast({
      title: `Remove folder`,
      description: `Successfully remove ${folder.folderName} folder`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  }

  return (
    <>
      <Box pt={'120px'}>
        <Flex px={['30px', '60px', '80px', '80px']}>
          <Heading as='u'>
            {folder.folderName}
          </Heading>
          <Spacer />
          <IconButton
            aria-label='Remove Folder'
            onClick={removeFolder}
            icon={<FaXmark />}
            variant="customRed"
          />
        </Flex>
        {(folder.podcasts == undefined || folder.podcasts.length == 0)
          ? <Text px={['30px', '60px', '80px', '80px']} mt='20px'>You need to add podcast to this folder first!</Text>
          : <SimpleGrid
            columns={[2, 3, 3, 4, 5]}
            spacing={['20px', '30px', '50px', '50px']}
            px={['30px', '60px', '80px', '80px']}
            pb={'80px'}
            pt={'20px'}>
            {folder.podcasts.map((podcast) => (
              <ResultBox key={podcast.id} result={podcast} />
            ))
            }
          </SimpleGrid>
        }
      </Box>
    </>
  );
};

export default FolderList;
