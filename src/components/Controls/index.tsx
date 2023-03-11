import { useMemo } from "react";

import {
  playIcon,
  pauseIcon,
  backwardIcon,
  forwardIcon,
} from "../../assets/icons";

import Button from "../Button";

import "./styles.css";

interface ControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  handleBackward: () => void;
  handleForward: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  play,
  pause,
  handleBackward,
  handleForward,
}) => {
  const handleButtonPlayPause = useMemo(() => {
    return isPlaying ? (
      <Button icon={pauseIcon} onClick={pause} />
    ) : (
      <Button icon={playIcon} onClick={play} />
    );
  }, [isPlaying]);
  return (
    <div className="controls">
      <Button icon={backwardIcon} onClick={handleBackward} />
      {handleButtonPlayPause}
      <Button icon={forwardIcon} onClick={handleForward} />
    </div>
  );
};

export default Controls;
