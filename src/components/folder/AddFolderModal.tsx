import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, IconButton, FormControl, InputGroup, Input, InputRightElement, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { usePodcastsContext } from '../context/PodcastsContext';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { useUserContext } from '../user/UserContext';

interface AddFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFolderModal: React.FC<AddFolderModalProps> = ({ isOpen, onClose }) => {
  const { handleSubmit, register } = useForm();
  const [isHover, setIsHover] = useState(false);
  const toast = useToast();
  const { authFetch } = useUserContext();

  const over = () => {
    setIsHover(true);
  }
  const out = () => {
    setIsHover(false);
  }

  const addFolder = async (query: any) => {
    const param = query['folderName']
    await authFetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/folder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folderName: param })
    }
    );

    toast({
      title: `Add folder`,
      description: `Successfully add ${param} folder`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior='inside'
        size={['full', 'md', 'md', 'md']}
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent top={['0', '10%', '10%', '10%']} h={['0', '120px', '120px', '120px']}>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(addFolder)}>
              <FormControl maxWidth={{ base: 'full', xl: 'xl' }} pt='3px'>
                <Text mb='15px'>Folder name</Text>
                <InputGroup size='md'>
                  <Input {...register('folderName')}
                    w='100%'
                    focusBorderColor='purple.400'
                    _hover={{
                      bg: "brand.200",
                      transitionDuration: '0.2s',
                      transitionTimingFunction: "ease-in-out"
                    }}
                    onMouseOver={over}
                    onMouseOut={out} />
                  <InputRightElement width='3.0rem'>
                    <IconButton
                      h='2.0rem'
                      colorScheme='purple'
                      aria-label='Search'
                      icon={<FaPlus />}
                      type='submit'
                      onClick={onClose}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFolderModal;