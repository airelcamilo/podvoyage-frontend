'use client'

import { useUserContext } from "@/components/user/UserContext";
import { Box, Center, FormControl, Button, Heading, useToast, Text } from "@chakra-ui/react";
import { FaRegAddressCard, FaUserLarge, FaEllipsis, FaEnvelope } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import CustomInput from "@/components/input/CustomInput";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const { validate } = useUserContext();
  const { handleSubmit, register } = useForm();
  const toast = useToast();
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passErrorMessage, setPassErrorMessage] = useState('');

  const nameCheck = (e: any) => {
    const name = e.target.value;
    if (!/^[A-Za-z][A-Za-z0-9_]{1,29}$/.test(name)) {
      setNameErrorMessage('Name must only contain alphabet');
    } else {
      setNameErrorMessage('');
    }
  }

  const usernameCheck = (e: any) => {
    const username = e.target.value;
    if (!/^[A-Za-z][A-Za-z0-9_]{1,29}$/.test(username)) {
      setUsernameErrorMessage('Username must only contain alphabet');
    } else {
      setUsernameErrorMessage('');
    }
  }

  const emailCheck = (e: any) => {
    const email = e.target.value;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailErrorMessage('Email is incorrect');
    } else {
      setEmailErrorMessage('');
    }
  }

  const passwordCheck = (e: any) => {
    const password = e.target.value;
    if (password.length < 8) {
      setPassErrorMessage('Password must be at least 8 characters')
    } else if (!/[A-Z]/.test(password)) {
      setPassErrorMessage('Password must contain at least 1 uppercase letter')
    } else if (!/[a-z]/.test(password)) {
      setPassErrorMessage('Password must contain at least 1 lowercase letter')
    } else if (!/\d/.test(password)) {
      setPassErrorMessage('Password must contain at least 1 number')
    } else {
      setPassErrorMessage('')
    }
  }

  const onSubmit = async (query: any) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: query['name'],
        email: query['email'],
        username: query['username'],
        password: query['password']
      })
    }
    );

    const data = await response.json();
    if (response.status == 200) {
      validate(data.token);
      router.replace("/");

      toast({
        title: `Register`,
        description: `Successfully register your account`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    } else {
      if (data == "username already taken") {
        setUsernameErrorMessage("Username already taken");
      } else {
        setUsernameErrorMessage('');
      }
      if (data == "email already taken") {
        setEmailErrorMessage("Email already taken");
      } else {
        setEmailErrorMessage('');
      }
    }
  }

  return (
    <>
      <Box pt={'120px'}>
        <Center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Heading mb='20px'>Register your account</Heading>
            <FormControl maxWidth={{ base: 'full', xl: 'xl' }}>
              <CustomInput
                register={register}
                registerText="name"
                text='Name'
                icon={FaRegAddressCard}
                isPassword={false}
                isInvalid={nameErrorMessage != '' ? true : false}
                check={nameCheck} />
              {nameErrorMessage != ''
                ? <Text color='red' mt='5px' maxWidth='300px'>{nameErrorMessage}</Text>
                : ""
              }
              <CustomInput
                register={register}
                registerText="username"
                text='Username'
                icon={FaUserLarge}
                isPassword={false}
                isInvalid={usernameErrorMessage != '' ? true : false}
                check={usernameCheck} />
              {usernameErrorMessage != ''
                ? <Text color='red' mt='5px' maxWidth='300px'>{usernameErrorMessage}</Text>
                : ""
              }
              <CustomInput
                register={register}
                registerText="email"
                text='Email'
                icon={FaEnvelope}
                isPassword={false}
                isInvalid={emailErrorMessage != '' ? true : false}
                check={emailCheck} />
              {emailErrorMessage != ''
                ? <Text color='red' mt='5px' maxWidth='300px'>{emailErrorMessage}</Text>
                : ""
              }
              <CustomInput
                register={register}
                registerText="password"
                text='Password'
                icon={FaEllipsis}
                isInvalid={passErrorMessage != '' ? true : false}
                isPassword={true}
                check={passwordCheck} />
              {passErrorMessage != ''
                ? <Text color='red' mt='5px' maxWidth='300px'>{passErrorMessage}</Text>
                : ""
              }
              <Button
                variant='custom'
                type='submit'
                isDisabled={passErrorMessage != '' ? true : false}
                mt='15px'>
                Register
              </Button>
            </FormControl>
          </form>
        </Center>
      </Box>
    </>
  )
}

export default Register;