import { Menu, MenuButton, MenuList, IconButton, Button, Input, useNumberInput, HStack } from '@chakra-ui/react';
import React from 'react';
import { useState, useEffect } from 'react';
import { FaSliders } from "react-icons/fa6";

interface PlaybackSpeedButtonProps {
  audioRef: any;
  playbackSpeed: string;
  setPlaybackSpeed: any;
}

const PlaybackSpeedButton: React.FC<PlaybackSpeedButtonProps> = ({ audioRef, playbackSpeed, setPlaybackSpeed }) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 0.1,
      min: 0.5,
      defaultValue: parseFloat(playbackSpeed),
      max: 5,
      precision: 1,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  useEffect(() => {
    audioRef.current.playbackRate = input.value;
    localStorage.setItem('playback-speed', input.value);
    setPlaybackSpeed(input.value);
  }, [input]);


  return (
    <>
      <Menu placement='top-end' closeOnSelect={false} >
        <MenuButton
          as={IconButton}
          variant='customTransparent'
          aria-label='Set playback speed'
          isRound={true}
          icon={<FaSliders size='25px' />} >
        </MenuButton>
        <MenuList minW='170px' px='5px'>
          <HStack>
            <Button variant='custom' aria-label='Decrease speed' {...dec}>-</Button>
            <Input {...input} w='80px' />
            <Button variant='custom' aria-label='Increase speed' {...inc}>+</Button>
          </HStack>
        </MenuList>
      </Menu>
    </>
  );
};

export default PlaybackSpeedButton;