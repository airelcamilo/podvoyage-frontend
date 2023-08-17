import { useState, useEffect, useRef, useCallback } from 'react';
import { IconButton, HStack, Center } from "@chakra-ui/react";
import { FaArrowRotateLeft, FaArrowRotateRight, FaCirclePlay, FaCirclePause, FaCircleCheck } from 'react-icons/fa6';
import PlaybackSpeedButton from './PlaybackSpeedButton';
interface ControlsProps {
  audioRef: any;
  progressBarRef: any;
  setCurrentTime: any;
  setCurrentTimeinAPI: any;
  markAsPlayed: () => Promise<void>;
}

const Controls: React.FC<ControlsProps> = ({ audioRef, progressBarRef, setCurrentTime, setCurrentTimeinAPI, markAsPlayed }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBackward, setIsBackward] = useState(false);
  const [isForward, setIsForward] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const playAnimationRef = useRef();

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    setIsPaused(true);
  };

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;

    if (currentTime >= audioRef.current.duration) {
      markAsPlayed();
      cancelAnimationFrame(playAnimationRef.current);
    } else {

      if (isForward) {
        forward(currentTime);
      } else if (isBackward) {
        backward(currentTime);
      } else {
        playAnimationRef.current = requestAnimationFrame(repeat);
        if (progressBarRef != null) {
          progressBarRef.current.value = currentTime;
          setCurrentTime(currentTime);
        }
      }
    }
  }, [isForward, isBackward]);

  const backward = (currentTime: number) => {
    const backwardTime = currentTime - 5;
    progressBarRef.current.value = backwardTime;
    audioRef.current.currentTime = backwardTime;
    setCurrentTime(backwardTime);
    setIsBackward(false);
  }

  const forward = (currentTime: number) => {
    const forwardTime = currentTime + 5;
    progressBarRef.current.value = forwardTime;
    audioRef.current.currentTime = forwardTime;
    setCurrentTime(forwardTime);
    setIsForward(false);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current.pause();
      if (isForward) {
        forward(audioRef.current.currentTime);
      }
      if (isBackward) {
        backward(audioRef.current.currentTime);
      }

      if (isPaused) {
        setCurrentTimeinAPI();
        setIsPaused(false);
      }
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, audioRef, repeat]);

  return (
    <>
      <HStack>
        <Center>
        <IconButton
          onClick={() => markAsPlayed()}
          aria-label='Mark as played'
          icon={<FaCircleCheck size='25px' />}
          isRound={true}
          variant='customTransparent'
          mr='10%' />

        <IconButton
          onClick={() => setIsBackward(true)}
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
          onClick={() => setIsForward(true)}
          aria-label='Skip forward'
          icon={<FaArrowRotateRight size='25px' />}
          isRound={true}
          variant='customTransparent'
          mx='10%' />

        <PlaybackSpeedButton audioRef={audioRef} />
        </Center>
      </HStack>
    </>
  );
};

export default Controls;