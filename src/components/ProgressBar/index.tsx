import { memo } from "react";
import { transformDurationToTimeString } from "../../utils/durationToTimeString";

import "./styles.css";

interface ProgressBarProps extends React.HTMLAttributes<HTMLProgressElement> {
  progress: number;
  duration: number;
  handleChangeProgress: (
    e: React.MouseEvent<HTMLProgressElement, MouseEvent>
  ) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  duration,
  handleChangeProgress,
  ...rest
}) => {
  return (
    <div className="timestamp-details">
      <progress
        className="progress-bar"
        value={progress}
        max={duration}
        // draggable
        onDrag={handleChangeProgress}
        onDragEnd={handleChangeProgress}
        onClick={handleChangeProgress}
      />
      <div className="timestamp">
        <span>{transformDurationToTimeString(progress)}</span>
        <span>{transformDurationToTimeString(duration - progress)}</span>
      </div>
    </div>
  );
};

export default memo(ProgressBar);
