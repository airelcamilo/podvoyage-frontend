import { ItemData } from "@/interface/types/ItemData";
import { Card, Image, Stack, Heading, Text } from "@chakra-ui/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation'

interface ItemBoxProps {
  item: ItemData
}

const ItemBox: React.FC<ItemBoxProps> = ({ item }) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter()

  const over = () => {
    setIsHover(true);
  }
  const out = () => {
    setIsHover(false);
  }

  const podcastClick = () => {
    router.push('/podcast/' + item.podcastId)
  }

  const folderClick = () => {
    router.push('/folder/' + item.folderId)
  }

  const image = () => {
    if (item.type == 'Podcast') {
      return <Image
        src={item.artworkUrl}
        alt={item.name}
        borderRadius='4px'
        objectFit='cover'
      />
    } else {
      return <Image
      src='/folderImage.png'
      alt='Folder'
      borderRadius='4px'
      objectFit='cover'
    />
    }
  }

  return (
    <>
      <Card
        maxW='170px'
        _hover={{
          bg: "brand.200",
          transform: 'translateY(-5px)',
          transitionDuration: '0.2s',
          transitionTimingFunction: "ease-in-out"
        }}
        onMouseOver={over}
        onMouseOut={out}
        onClick={item.type == 'Podcast' ? podcastClick : folderClick}
        cursor='pointer'>
        {image()}
        <Stack m='2' spacing='1'>
          <Heading fontSize='md' noOfLines={2} size='md'>{item.name}</Heading>
          <Text fontSize='sm' isTruncated color='gray.100'>
            {item.artistName}
          </Text>
        </Stack>
      </Card>
    </>
  )
}

export default ItemBox;