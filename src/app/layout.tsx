'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from "./providers";
import Navbar from "@/components/navbar/Navbar";
import MobileDrawer from "@/components/navbar/MobileDrawer";
import { VStack, Show } from "@chakra-ui/react";
import { PodcastSearchContextProvider } from "@/components/PodcastSearchContext";
import { PlayerContextProvider } from '@/components/PlayerContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Podvoyage',
  description: 'Podcast listening app',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <head>
        <title>Podvoyage</title>
      </head>
      <body className={inter.className}>
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
      </body>
    </html>
  )
}

export default RootLayout;