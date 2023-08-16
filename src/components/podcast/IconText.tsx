import { HStack, Icon, Text, Link } from '@chakra-ui/react';
import React from 'react';
import { IconType } from "react-icons";
import DOMPurify from 'isomorphic-dompurify';

interface IconTextProps {
  icon: IconType;
  color: string;
  isLink: boolean;
  link: string;
  children: string;
}

const IconText: React.FC<IconTextProps> = ({ icon, color, children, isLink, link, ...rest }) => {
  return (
    <>
      <HStack {...rest}>
        <Icon as={icon} color={color} mr='2px'></Icon>
        {isLink
          ? <Link as='u' href={link} isExternal fontSize='sm' color={color}>
            {children}
          </Link>
          : <Text fontSize='sm' color={color} dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(children)
          }}></Text>
        }
      </HStack>
    </>
  );
};

export default IconText;
