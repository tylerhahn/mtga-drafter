import logo from "./logo.svg";
import "./App.css";
import { UserProvider } from "./context/User";
import Home from "./components/Home";
import { CardProvider } from "./context/Cards";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <CardProvider>
          <Home />
        </CardProvider>
      </UserProvider>
    </div>
  );
}

export default App;
