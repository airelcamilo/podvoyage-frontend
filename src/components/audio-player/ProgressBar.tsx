import { convertDurationDense } from '@/utils/Convert';
import { Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, HStack, Show, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

interface ProgressBarProps {
  audioRef: any;
  duration: number;
  progressBarRef: any;
  setCurrentTime: any;
  currentTime: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ audioRef, duration, progressBarRef, setCurrentTime, currentTime }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  const handleChange = (value: any) => {
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  }

  return (
    <HStack w='100%'>
      <Show above='md'>
        <Text align='right' mr='5px' w='60px'>{convertDurationDense(currentTime)}</Text>
      </Show>
      <Slider
        aria-label='Episode time'
        onChange={(value) => handleChange(value)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        value={currentTime}
        ref={progressBarRef}
        max={duration} >
        <SliderTrack bg='brand.200'>
          <SliderFilledTrack bg='brand.400' />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg='brand.300'
          color='white'
          placement='top'
          isOpen={showTooltip}
          label={convertDurationDense(currentTime)}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
      <Show above='md'>
        <Text align='left' ml='5px' w='60px'>{convertDurationDense(duration)}</Text>
      </Show>
    </HStack>
  );
}

export default ProgressBar;