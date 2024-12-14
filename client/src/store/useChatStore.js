import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import axios from "axios";

export const useChatStore = create((set, get) => {
    messages: [],
    selectedUser: null,
    users: [],
    isUsersLoading: false,
    isMessagesLoading: false,
});