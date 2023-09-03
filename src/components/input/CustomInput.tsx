'use client'
import { useState } from 'react';
import { Text, InputGroup, InputLeftElement, Input, Icon, InputRightElement, Button } from '@chakra-ui/react';

interface CustomInputProps {
  register: any;
  registerText: string;
  text: string;
  icon: any;
  isPassword: boolean;
  isInvalid: boolean;
  check: (e: any) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ register, registerText, text, icon, isPassword, isInvalid, check }) => {
  const [isHover, setIsHover] = useState(false);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  }

  const over = () => {
    setIsHover(true);
  }
  const out = () => {
    setIsHover(false);
  }

  return (
    <>
      <Text mt='15px'>{text}</Text>
      <InputGroup mt='5px'>
        <InputLeftElement pointerEvents='none'>
          <Icon
            as={icon}
            color='white' />
        </InputLeftElement>
        <Input {...register(registerText, {
          required: "Please enter " + registerText,
        })}
          focusBorderColor='purple.400'
          _hover={{
            bg: "brand.200",
            transitionDuration: '0.2s',
            transitionTimingFunction: "ease-in-out"
          }}
          onMouseOver={over}
          onMouseOut={out} 
          type={!isPassword ? 'text' : show ? 'text' : 'password'} 
          isInvalid={isInvalid}
          onChange={check} />
        {isPassword
          ? <InputRightElement width='4.5rem'>
            <Button
              h='1.75rem'
              size='sm'
              colorScheme='purple'
              aria-label={show ? 'Hide' : 'Show'}
              onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement> :
          ''}
      </InputGroup>
    </>
  )
}

export default CustomInput;