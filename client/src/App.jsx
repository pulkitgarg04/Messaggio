import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

// import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ChatApp from "./pages/Chat";
import Groups from "./pages/Groups";
import Contacts from "./pages/Contacts";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/signup" />} /> */}
          {/* <Route path="/" element={<Chat />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ChatApp />} />
          <Route path="/chat/group" element={<Groups />} />
          <Route path="/chat/contacts" element={<Contacts />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  );
}

export default App;