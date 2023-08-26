'use client'

import { Inter } from 'next/font/google'
import Providers from '@/app/providers'
import Navbar from "@/components/navbar/Navbar";
import MobileDrawer from "@/components/navbar/MobileDrawer";
import { VStack, Show } from "@chakra-ui/react";
import { PodcastSearchContextProvider } from "@/components/PodcastSearchContext";
import { PlayerContextProvider } from '@/components/PlayerContext';

const inter = Inter({ subsets: ['latin'] })

const HomeComponent = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <Providers>
      <PodcastSearchContextProvider>
        <PlayerContextProvider>
          <VStack spacing={4} align="stretch">
            <Show above="sm">
              <Navbar />
            </Show>
            <Show below="sm">
              <MobileDrawer />
            </Show>
            {children}
          </VStack>
        </PlayerContextProvider>
      </PodcastSearchContextProvider>
    </Providers>
  )
}

export default HomeComponent;