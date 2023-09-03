'use client'

import { useUserContext } from "@/components/user/UserContext";
import { Box, Button, Center, FormControl, Heading, useToast, Text } from "@chakra-ui/react";
import { FaEllipsis, FaEnvelope } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import CustomInput from "@/components/input/CustomInput";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const { validate } = useUserContext();
  const { handleSubmit, register } = useForm();
  const toast = useToast();
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passInvalid, setPassInvalid] = useState(false);

  const emailCheck = (e: any) => {
    const email = e.target.value;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailInvalid(true);
    } else {
      setEmailInvalid(false);
    }
  }

  const onSubmit = async (query: any) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: query['email'],
        password: query['password']
      })
    }
    );

    const data = await response.json();
    if (response.status == 200) {
      validate(data.token);
      router.replace("/");

      toast({
        title: `Login`,
        description: `Successfully login to your account`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    } else {
      if (data == "incorrect email") {
        setEmailInvalid(true);
      } else {
        setEmailInvalid(false);
      }
      if (data == "incorrect password") {
        setPassInvalid(true);
      } else {
        setPassInvalid(false);
      }
    }
  }

  return (
    <>
      <Box pt={'120px'}>
        <Center>
          <Box w='300px'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Heading mb='20px'>Login to your account</Heading>
              <FormControl maxWidth={{ base: 'full', xl: 'xl' }}>
                <CustomInput
                  register={register}
                  registerText="email"
                  text='Email'
                  icon={FaEnvelope}
                  isPassword={false}
                  isInvalid={emailInvalid}
                  check={emailCheck} />
                {emailInvalid
                  ? <Text color='red' mt='5px'>Email is incorrect</Text>
                  : ""
                }
                <CustomInput
                  register={register}
                  registerText="password"
                  text='Password'
                  icon={FaEllipsis}
                  isPassword
                  isInvalid={passInvalid}
                  check={() => {}} />
                {passInvalid
                  ? <Text color='red' mt='5px'>Password is incorrect</Text>
                  : ""
                }
                <Button variant='custom' type='submit' mt='15px'>Login</Button>
              </FormControl>
            </form>
          </Box>
        </Center >
      </Box >
    </>
  )
}

export default Login;