import './App.css';
import Main from './components/main'
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return (
    <Main/>
  );
}

export default App;
