import { Menu, MenuButton, MenuList, IconButton, Button, Input, useNumberInput, HStack } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { FaSliders } from "react-icons/fa6";

interface PlaybackSpeedButtonProps {
  audioRef: any;
}

const PlaybackSpeedButton: React.FC<PlaybackSpeedButtonProps> = ({ audioRef }) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 0.1,
      defaultValue: 1,
      min: 0.5,
      max: 5,
      precision: 1,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  useEffect(() => {
    audioRef.current.playbackRate = input.value;
  }, [input]);

  return (
    <>
      <Menu closeOnSelect={false} matchWidth>
        <MenuButton
          as={IconButton}
          variant='customTransparent'
          aria-label='Set playback speed'
          isRound={true}
          icon={<FaSliders size='25px' />}>
        </MenuButton>
        <MenuList minW='170px' px='5px'>
          <HStack>
            <Button variant='custom' aria-label='Decrease speed' {...dec}>-</Button>
            <Input {...input} w='80px'/>
            <Button variant='custom' aria-label='Increase speed' {...inc}>+</Button>
          </HStack>
        </MenuList>
      </Menu>
    </>
  );
};

export default PlaybackSpeedButton;