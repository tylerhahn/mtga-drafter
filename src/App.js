import logo from "./logo.svg";
import "./App.css";
import { UserProvider } from "./context/User";
import Home from "./components/Home";
import { CardProvider } from "./context/Cards";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CardProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <AuthenticatedRoute>
                  <Home />
                </AuthenticatedRoute>
              }
            />
          </Routes>
          {/* <Home /> */}
        </CardProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
