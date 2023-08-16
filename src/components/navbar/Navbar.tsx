'use client'

import { IconButton, ButtonGroup, Avatar, Flex, Spacer } from '@chakra-ui/react'
import { FaHouseChimney, FaAngleLeft } from "react-icons/fa6";
import Searchbar from './Searchbar';
import { usePodcastSearchContext } from '../PodcastSearchContext';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const { fetchData } = usePodcastSearchContext();
  const router = useRouter();
  const pathname = usePathname();

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
        zIndex="2000"
        as="header"
        position="fixed"
        w="100%"
        backgroundColor="rgba(12, 0, 18, 0.8)"
        backdropFilter="saturate(180%) blur(5px)">
        <ButtonGroup gap='2'>
          <IconButton marginRight={[1, 2, 2, 2]}
            colorScheme='purple'
            aria-label='Home'
            isRound={true}
            onClick={home}
            icon={<FaHouseChimney />}
          />
          <IconButton
            colorScheme='purple'
            aria-label='Back'
            isRound={true}
            onClick={back}
            icon={<FaAngleLeft />}
          />
        </ButtonGroup>
        <Spacer />
        <Searchbar />
        <Spacer />
        <Avatar name='Airel' src='https://bit.ly/dan-abramov' size='sm' />
      </Flex>
    </>
  )
}

export default Navbar;