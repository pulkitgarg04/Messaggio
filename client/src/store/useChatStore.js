import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useChatStore = create((set, get) => ({
  messages: [],
  selectedUser: null,
  users: [],
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BACKEND_URL}/api/messages/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    const token = localStorage.getItem("token");
    set({ isMessagesLoading: true });
    try {
      const res = await axios.get(`${BACKEND_URL}/api/messages/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (message) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/messages/send/${selectedUser._id}`,
        { text: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    if (!socket) {
      toast.error("Socket not initialized");
      return;
    }
    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId === selectedUser._id) {
        set({ messages: [...get().messages, newMessage] });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user, messages: [] });
    get().getMessages(user._id);
  },
}));