import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import React from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { useUserContext } from './UserContext';

const UserPopupButton = () => {
  const { token, logout } = useUserContext();

  return (
    <>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} variant='customTransparent' aria-label='User'>
          <FaCircleUser />
        </MenuButton>
        <MenuList minWidth='240px'>
          <MenuItem>Settings</MenuItem>
          <MenuItem onClick={() => logout(token)} color='red'>Logout</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserPopupButton;