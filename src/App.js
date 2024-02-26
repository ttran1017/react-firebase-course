import "./App.css";
import Auth from "./components/Auth";
import Movies from "./components/Movies";
import Storage from "./components/Storage";

function App() {
  return (
    <div className="App">
      <Auth />
      <Movies />
      <Storage />
    </div>
  );
}

export default App;
