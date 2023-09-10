'use client'

import { IconButton, ButtonGroup, Flex, Spacer } from '@chakra-ui/react'
import { FaHouseChimney, FaAngleLeft } from "react-icons/fa6";
import Searchbar from './Searchbar';
import { usePodcastsContext } from '../context/PodcastsContext';
import { useRouter, usePathname } from 'next/navigation';
import UserPopupButton from '../user/UserPopupButton';
import { useEffect } from 'react';

const Navbar = () => {
  const { fetchData } = usePodcastsContext();
  const router = useRouter();
  const pathname = usePathname();

  const home = () => {
    if (pathname != '/')
      router.push('/');
  }

  const back = () => {
    router.back();
  }

  useEffect(() => {
    if (pathname == '/') {
      fetchData({});
    }
  }, [pathname])

  return (
    <>
      <Flex
        py={5}
        align={'center'}
        px={[5, 5, 8, 8]}
        zIndex="2000"
        as="header"
        position="fixed"
        w="100%"
        backgroundColor="rgba(12, 0, 18, 0.8)"
        backdropFilter="saturate(180%) blur(5px)">
        <ButtonGroup gap='2'>
          <IconButton marginRight={[1, 2, 2, 2]}
            variant='customTransparent'
            aria-label='Home'
            onClick={home}
            icon={<FaHouseChimney />}
          />
          <IconButton
            variant='customTransparent'
            aria-label='Back'
            onClick={back}
            icon={<FaAngleLeft />}
          />
        </ButtonGroup>
        <Spacer />
        <Searchbar />
        <Spacer />
        <UserPopupButton />
      </Flex>
    </>
  )
}

export default Navbar;