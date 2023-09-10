'use client'

import { Input, InputGroup, InputRightElement, IconButton, FormControl, HStack } from '@chakra-ui/react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useSearchContext } from '../context/SearchContext';

const Searchbar = () => {
  const { search } = useSearchContext();
  const { handleSubmit, register } = useForm();
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  const over = () => {
    setIsHover(true);
  }
  const out = () => {
    setIsHover(false);
  }

  const onSubmit = (query: any) => {
    search(query);
    router.push('/search')
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack spacing='24px'>
          <FormControl maxWidth={{ base: 'full', xl: 'xl' }}>
            <InputGroup size='md'>
              <Input {...register('podcastName')}
                placeholder='Search ...'
                w={['100%', '250px', '400px', '400px', '500px']}
                focusBorderColor='purple.400'
                _hover={{
                  bg: "brand.200",
                  transitionDuration: '0.2s',
                  transitionTimingFunction: "ease-in-out"
                }}
                onMouseOver={over}
                onMouseOut={out} />
              <InputRightElement width='3.0rem'>
                <IconButton
                  h='2.0rem'
                  colorScheme='purple'
                  aria-label='Search'
                  icon={<FaMagnifyingGlass />}
                  type='submit'
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </HStack>
      </form>
    </>
  )
}

export default Searchbar;