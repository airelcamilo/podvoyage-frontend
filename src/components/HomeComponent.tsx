'use client'

import Providers from '@/app/providers'
import Nav from './navbar/Nav';
import { VStack } from "@chakra-ui/react";
import { PodcastsContextProvider } from "@/components/context/PodcastsContext";
import { PlayerContextProvider } from '@/components/context/PlayerContext';
import { UserContextProvider } from './user/UserContext';
import { SearchContextProvider } from './context/SearchContext';

const HomeComponent = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <Providers>
      <UserContextProvider>
        <PodcastsContextProvider>
          <SearchContextProvider>
            <PlayerContextProvider>
              <VStack spacing={4} align="stretch">
                <Nav />
                {children}
              </VStack>
            </PlayerContextProvider>
          </SearchContextProvider>
        </PodcastsContextProvider>
      </UserContextProvider>
    </Providers>
  )
}

export default HomeComponent;