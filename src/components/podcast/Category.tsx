import { CategoryData } from '@/interface/types/PodcastData';
import { Badge } from '@chakra-ui/react';
import React from 'react';

interface CategoryProps {
  category: CategoryData;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  return (
    <>
      <Badge colorScheme='purple' mr='10px'>{category.name}</Badge>
    </>
  );
};

export default Category;