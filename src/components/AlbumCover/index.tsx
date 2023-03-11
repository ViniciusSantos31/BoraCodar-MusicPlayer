import { memo } from "react";
import { Music } from "../../types/music";

import "./styles.css";

interface AlbumCoverProps extends React.HTMLAttributes<HTMLDivElement> {
  music: Music;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({ music, ...rest }) => {
  return (
    <div className="music-details" {...rest}>
      <div className="cover-container">
        <img className="cover-image" src={music.cover} alt="cover" />
      </div>
      <div className="music-info">
        <h1 className="music-title">{music.title}</h1>
        <h2 className="music-artist">{music.artist}</h2>
      </div>
    </div>
  );
};

export default memo(AlbumCover, (prevProps, nextProps) => {
  return prevProps.music === nextProps.music;
});
