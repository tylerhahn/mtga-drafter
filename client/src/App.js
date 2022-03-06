import "./App.css";
import { UserProvider } from "./context/User";
import DraftRoom from "./components/DraftRoom";
import { GameProvider } from "./context/Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { SocketProvider } from "./context/Socket";
import { RoomProvider } from "./context/Room";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <RoomProvider>
          <UserProvider>
            <GameProvider>
              <Routes>
                <Route path="/room/:id" element={<DraftRoom />} />
                <Route exact path="/" element={<Home />} />
              </Routes>
            </GameProvider>
          </UserProvider>
        </RoomProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
