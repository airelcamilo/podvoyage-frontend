'use client'

import { useUserContext } from '../user/UserContext';
import Navbar from "@/components/navbar/Navbar";
import MobileDrawer from "@/components/navbar/MobileDrawer";
import { Show } from "@chakra-ui/react";

const Nav = () => {
  const { isAuthenticated } = useUserContext();
  return (
    <>
      {isAuthenticated
        ? <>
          <Show above="sm">
            <Navbar />
          </Show>
          <Show below="sm">
            <MobileDrawer />
          </Show>
        </>
        : ''
      }
    </>
  )
}

export default Nav;