import coverImage from "../assets/images/cover-image.png";

import backwardIcon from "../assets/icons/backward.svg";
import playIcon from "../assets/icons/play.svg";
import pauseIcon from "../assets/icons/pause.svg";
import forwardIcon from "../assets/icons/forward.svg";

import soundOfRain from "../assets/musics/soundOfRain.mp3";

import "./styles.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { transformDurationToTimeString } from "../utils/durationToTimeString";

type MusicPlayerProps = {
  music: {
    id: number;
    title: string;
    artist: string;
    cover: string;
    file: string;
  };
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
  }, [audioRef]);

  const updateProgress = useCallback(() => {
    const audio = audioRef.current;

    if (audio) {
      const { currentTime } = audio;
      setProgress(currentTime);
    }
  }, [audioRef]);

  const play = useCallback(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  }, [audioRef]);

  const pause = useCallback(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [audioRef]);

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
  }, [audioRef]);

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
  }, [audioRef]);

  const handleClickToChangeProgress = useCallback(
    (e: React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
      const audio = audioRef.current;

      if (audio) {
        // transform the timeStamp to seconds
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
    [audioRef]
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
      <div className="music-details">
        <img className="cover-image" src={music.cover} alt="cover" />
        <div className="music-info">
          <h1 className="music-title">{music.title}</h1>
          <h2 className="music-artist">{music.artist}</h2>
        </div>
      </div>

      <div className="controls">
        <button className="control-button backward" onClick={handleBackward}>
          <img src={backwardIcon} alt="backward" />
        </button>
        {isPlaying ? (
          <button className="control-button play" onClick={pause}>
            <img src={pauseIcon} alt="backward" />
          </button>
        ) : (
          <button className="control-button play" onClick={play}>
            <img src={playIcon} alt="backward" />
          </button>
        )}
        <button className="control-button forward" onClick={handleForward}>
          <img src={forwardIcon} alt="backward" />
        </button>
      </div>
      <div className="timestamp-details">
        <progress
          className="progress-bar"
          value={progress}
          max={duration}
          // draggable
          onDrag={handleClickToChangeProgress}
          onDragEnd={handleClickToChangeProgress}
          onClick={handleClickToChangeProgress}
        />
        <div className="timestamp">
          <span>{transformDurationToTimeString(progress)}</span>
          <span>{transformDurationToTimeString(duration - progress)}</span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
