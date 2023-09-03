import { Button, Heading, AbsoluteCenter, Flex } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';

const UnauthenticatedComponent = () => {
  const router = useRouter();

  return (
    <>
      <AbsoluteCenter axis='both'>
        <Flex direction={'column'} alignItems='center' justifyContent='center' gap='20px'>
          <Heading size='4xl' mb='20px'>Podvoyage</Heading>
          <Button
            variant='custom'
            aria-label='Login'
            onClick={() => { router.push('/login') }}
            w='70%'>
            Login
          </Button>
          <Button
            variant='custom'
            aria-label='Register'
            onClick={() => { router.push('/register') }}
            w='70%'>
            Register
          </Button>
        </Flex>
        </AbsoluteCenter>
    </>
  )
}

export default UnauthenticatedComponent;