import { music } from "./mocks/musics";

import MusicPlayer from "./components/MusicPlayer";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <div className="players-container">
        <MusicPlayer music={music} type="full" />
        <div className="player-col">
          <MusicPlayer music={music} type="simple" />
          <MusicPlayer music={music} type="mini" />
        </div>
      </div>
    </div>
  );
}

export default App;
