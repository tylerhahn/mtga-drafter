import logo from "./logo.svg";
import "./App.css";
import { UserProvider } from "./context/User";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Home />
      </UserProvider>
    </div>
  );
}

export default App;
