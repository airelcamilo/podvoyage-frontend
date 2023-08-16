import { FolderData } from '@/interface/types/FolderData';
import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, Button } from '@chakra-ui/react';
import React from 'react';
import { useState, useEffect } from 'react';
import { FaFolderOpen } from "react-icons/fa6";
import { BaseResponse } from '@/interface/types/BaseResponse';
import { PodcastData } from '@/interface/types/PodcastData';
import { usePodcastSearchContext } from '../PodcastSearchContext';
import { updateItems } from '@/utils/UpdateItems';

interface ChangeFolderButtonProps {
  podcast: PodcastData;
}

const ChangeFolderButton: React.FC<ChangeFolderButtonProps> = ({ podcast }) => {
  const { setItems } = usePodcastSearchContext();
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [inFolder, setInFolder] = useState<number>(0);

  const fetchFolders = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/folders'
    );

    const data: BaseResponse<FolderData[]> = await response.json();
    setFolders(data);
  }

  const fetchCheckInFolder = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/in-folder/' + podcast.id
    );

    const data: number = await response.json();
    setInFolder(data);
  }

  const handleChange = async (folderId: any) => {
    setInFolder(folderId);
    await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/change-folder/' + folderId + '/' + podcast.id
    );
    updateItems(setItems);
  }

  useEffect(() => {
    fetchFolders();
    fetchCheckInFolder();
  }, []);

  return (
    <>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} variant='custom' aria-label='Change Folder'>
          <FaFolderOpen />
        </MenuButton>
        <MenuList minWidth='240px'>
            <MenuOptionGroup
              title='Change folder'
              type='radio'
              onChange={(e) => handleChange(e)} 
              value={inFolder?.toString()}
              defaultValue='0'>
              <MenuItemOption value='0'>Home</MenuItemOption>
              {folders != undefined && folders.map((folder) => (
                <MenuItemOption key={folder.id} value={folder.id.toString()}>{folder.folderName}</MenuItemOption>
              ))}
            </MenuOptionGroup>
        </MenuList>
      </Menu>
    </>
  );
};

export default ChangeFolderButton;