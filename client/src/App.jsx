import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ChatApp from "./pages/Chat";
import Groups from "./pages/Groups";
import Contacts from "./pages/Contacts";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={authUser ? <Navigate to="/chat" /> : <Navigate to="/signup" />} />

          <Route path="/signup" element={authUser ? <Navigate to="/chat" /> : <Signup />} />
          <Route path="/login" element={authUser ? <Navigate to="/chat" /> : <Login />} />

          <Route path="/chat" element={authUser ? <ChatApp /> : <Navigate to="/login" />} />
          <Route path="/chat/group" element={authUser ? <Groups /> : <Navigate to="/login" />} />
          <Route path="/chat/contacts" element={authUser ? <Contacts /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  );
}

export default App;