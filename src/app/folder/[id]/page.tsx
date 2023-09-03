'use client'

import FolderList from "@/components/folder/FolderList";
import { useState, useEffect } from "react";
import { FolderData } from "@/interface/types/FolderData";
import { Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import { useUserContext } from "@/components/user/UserContext";

const Folder = ({ params }: { params: { id: string } }) => {
  const [isLoading, setLoading] = useState(true);
  const [folder, setFolder] = useState<FolderData>();
  const { authFetch } = useUserContext();

  const fetchData = async () => {
    setLoading(true);
    const response = await authFetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/folder/' + params.id
    );

    const data: FolderData = await response.json();
    setFolder(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading)
    return (
      <Center px={'80px'} pb={'80px'} pt={'120px'}>
        <CircularProgress color={'purple.400'} isIndeterminate />
      </Center>
    );

  if (folder == undefined || folder.id == undefined) {
    return (
      <>
        <Box pt={'120px'}>
          <Center>
            <Text>Sorry... The folder is not created yet!</Text>
          </Center>
        </Box>
      </>
    )
  }

  return (
    <>
      <FolderList folder={folder} />
    </>
  )
}

export default Folder;