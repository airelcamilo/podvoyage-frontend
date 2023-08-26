import { useState, useEffect, useRef, useCallback } from 'react';
import { IconButton, VStack } from "@chakra-ui/react";
import { FaStopwatch, FaSliders, FaCircleCheck } from 'react-icons/fa6';

interface SpecialControlsProps {
  audioRef: any;
  progressBarRef: any;
  setCurrentTime: any;
}

const SpecialControls: React.FC<SpecialControlsProps> = ({ audioRef, progressBarRef, setCurrentTime }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playAnimationRef = useRef();

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    playAnimationRef.current = requestAnimationFrame(repeat);
    progressBarRef.current.value = currentTime;
    setCurrentTime(currentTime);
  }, []);

  const backward = () => {
    setCurrentTime(audioRef.current.currentTime - 5);
  }

  const forward = () => {
    setCurrentTime(audioRef.current.currentTime + 5);
  }


  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, audioRef, repeat]);

  return (
    <>
      <VStack>
        <IconButton
          onClick={backward}
          aria-label='Skip backward'
          icon={<FaArrowRotateLeft size='25px' />}
          isRound={true}
          variant='customTransparent'
          mr='10%' />

        <IconButton
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          icon={isPlaying ? <FaCirclePause size='40px' /> : <FaCirclePlay size='40px' />}
          isRound={true}
          variant='customTransparent' />

        <IconButton
          onClick={forward}
          aria-label='Skip forward'
          icon={<FaArrowRotateRight size='25px' />}
          isRound={true}
          variant='customTransparent'
          ml='10%' />
      </VStack>
    </>
  );
};

export default SpecialControls;