'use client'

import {
  Box, VStack, Button, Flex, Drawer, DrawerOverlay, DrawerContent,
  DrawerCloseButton, DrawerBody, useDisclosure, Text, Icon
} from '@chakra-ui/react'
import { FaHouseChimney, FaAngleLeft, FaBars, FaGear, FaRightToBracket } from "react-icons/fa6";
import { useRouter, usePathname } from 'next/navigation';
import React, { useRef } from 'react';
import { usePodcastSearchContext } from '../PodcastSearchContext';
import Searchbar from './Searchbar';
import { useUserContext } from '../user/UserContext';

const Navbar = () => {
  const { fetchData } = usePodcastSearchContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { token, logout } = useUserContext();

  const home = () => {
    if (pathname != '/')
      router.push('/')
    fetchData({});
  }

  const back = () => {
    router.back()
  }

  return (
    <>
      <Flex
        py={5}
        align={'center'}
        px={[5, 5, 8, 8]}
        zIndex="1000"
        as="header"
        position="fixed"
        w="100%"
        backgroundColor="rgba(12, 0, 18, 0.8)"
        backdropFilter="saturate(180%) blur(5px)">
        <Button
          ref={btnRef}
          background="transparent"
          border="1px"
          borderColor="brand.400"
          onClick={isOpen ? onClose : onOpen}
        >
          <FaBars color='white' />
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <VStack align="start" mt='80px'>
                <Button
                  colorScheme='purple'
                  aria-label='Home'
                  onClick={home}>
                  <FaHouseChimney />
                  <Text ml='30px'>Home</Text>
                </Button>
                <Button
                  colorScheme='purple'
                  aria-label='Back'
                  onClick={back}>
                  <FaAngleLeft />
                  <Text ml='30px'>Back</Text>
                </Button>
                <Button
                  colorScheme='purple'
                  aria-label='Home'>
                  <FaGear />
                  <Text ml='30px'>Settings</Text>
                </Button>
                <Button
                  colorScheme='purple'
                  aria-label='Home'
                  onClick={() => logout(token)}>
                  <Icon as={FaRightToBracket} color='red' />
                  <Text ml='30px' color='red'>Logout</Text>
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Box ml='20px'>
          <Searchbar />
        </Box>
      </Flex>
    </>
  )
}

export default Navbar;