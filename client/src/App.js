import "./App.css";
import { UserProvider } from "./context/User";
import Home from "./components/Home";
import { CardProvider } from "./context/Cards";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { SocketContext, socket } from "./context/Socket";

function App() {
  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <UserProvider>
          <CardProvider>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
            </Routes>
          </CardProvider>
        </UserProvider>
      </SocketContext.Provider>
    </BrowserRouter>
  );
}

export default App;
