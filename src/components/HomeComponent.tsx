'use client'

import Providers from '@/app/providers'
import Nav from './navbar/Nav';
import { VStack } from "@chakra-ui/react";
import { PodcastSearchContextProvider } from "@/components/PodcastSearchContext";
import { PlayerContextProvider } from '@/components/PlayerContext';
import { UserContextProvider } from './user/UserContext';

const HomeComponent = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <Providers>
      <UserContextProvider>
        <PodcastSearchContextProvider>
          <PlayerContextProvider>
            <VStack spacing={4} align="stretch">
              <Nav />
              {children}
            </VStack>
          </PlayerContextProvider>
        </PodcastSearchContextProvider>
      </UserContextProvider>
    </Providers>
  )
}

export default HomeComponent;