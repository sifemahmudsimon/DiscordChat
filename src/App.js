import './App.css';
import DiscordChat from './DiscordChat';
import { Channels } from './data/Data';
function App() {
  return (
    <div className="App">
      <DiscordChat data ={Channels.Channel}/>
    </div>
  );
}

export default App;
