import coverImage from "../assets/images/cover-image.png";

import backwardIcon from "../assets/icons/backward.svg";
import playIcon from "../assets/icons/play.svg";
import pauseIcon from "../assets/icons/pause.svg";
import forwardIcon from "../assets/icons/forward.svg";

import soundOfRain from "../assets/musics/soundOfRain.mp3";

import "./styles.css";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { transformDurationToTimeString } from "../../utils/durationToTimeString";
import Button from "../Button";
import ProgressBar from "../ProgressBar";
import Controls from "../Controls";
import { Music } from "../../types/music";
import AlbumCover from "../AlbumCover";

type MusicPlayerProps = {
  music: Music;
  type: "full" | "simple" | "mini";
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  music,
  type = "simple",
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const getAudioDuration = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      const { duration } = audio;
      setDuration(duration);
    }
  }, []);

  const updateProgress = useCallback(() => {
    const audio = audioRef.current;

    if (audio) {
      const { currentTime } = audio;
      setProgress(currentTime);
    }
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleBackward = useCallback(() => {
    const audio = audioRef.current;

    if (audio) {
      const { currentTime } = audio;
      const newTime = currentTime - 10;

      if (newTime >= 0) {
        audio.currentTime = newTime;
        setProgress(newTime);
        return;
      }

      audio.currentTime = 0;
      setProgress(0);
    }
  }, []);

  const handleForward = useCallback(() => {
    const audio = audioRef.current;

    if (audio) {
      const { currentTime, duration } = audio;
      const newTime = currentTime + 10;

      if (newTime <= duration) {
        audio.currentTime = newTime;
        setProgress(newTime);
        return;
      }

      audio.currentTime = duration;
      setProgress(duration);
    }
  }, []);

  const handleClickToChangeProgress = useCallback(
    (e: React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
      const audio = audioRef.current;

      if (audio) {
        const { duration } = audio;
        const { clientX, currentTarget } = e;
        const { left, width } = currentTarget.getBoundingClientRect();
        const clickPosition = clientX - left;
        const clickPositionInPercentage = clickPosition / width;
        const clickPositionInSeconds = clickPositionInPercentage * duration;

        if (clickPositionInSeconds <= duration) {
          audio.currentTime = clickPositionInSeconds;
          setProgress(clickPositionInSeconds);
        }
      }
    },
    []
  );

  return (
    <div className={`container ${type}`}>
      <audio
        ref={audioRef}
        src={music.file}
        onCanPlayThrough={getAudioDuration}
        onEnded={pause}
        onTimeUpdate={updateProgress}
      />

      <AlbumCover music={music} />

      <Controls
        isPlaying={isPlaying}
        play={play}
        pause={pause}
        handleBackward={handleBackward}
        handleForward={handleForward}
      />

      <ProgressBar
        progress={progress}
        duration={duration}
        handleChangeProgress={handleClickToChangeProgress}
      />
    </div>
  );
};

export default memo(MusicPlayer);
