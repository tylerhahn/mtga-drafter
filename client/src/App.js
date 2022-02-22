import "./App.css";
import { UserProvider } from "./context/User";
import Home from "./components/Home";
import { CardProvider } from "./context/Cards";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { SocketProvider } from "./context/Socket";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <UserProvider>
          <CardProvider>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
            </Routes>
          </CardProvider>
        </UserProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
