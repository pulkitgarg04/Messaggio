import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { SendHorizontal, Paperclip, SmilePlus } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

function MessageInput() {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) {
            toast.error("Message or image is required");
            return;
        }

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            setText("");
            removeImage();
        } catch (error) {
            console.error("Failed to send message:", error);
            toast.error("Failed to send message");
        }
    };

    const handleEmojiSelect = (emojiObject) => {
        setText((prevText) => prevText + emojiObject.emoji);
    };

    return (
        <div className="p-4">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full bg-gray-700 ml-2 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                    type="button"
                    className="p-2 ml-2 rounded-md border border-transparent bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                >
                    <SmilePlus size={20} />
                </button>
                <button
                    type="button"
                    className="p-2 ml-2 rounded-md border border-transparent bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Paperclip size={20} />
                </button>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
                <button
                    onClick={handleSendMessage}
                    className="p-2.5 ml-2 rounded-lg border border-transparent bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                    <SendHorizontal size={20} />
                </button>

                {isEmojiPickerOpen && (
                    <div className="absolute bottom-16 right-12">
                        <EmojiPicker
                            onEmojiClick={handleEmojiSelect}
                            theme="dark"
                        />
                    </div>
                )}
            </div>

            {imagePreview && (
                <div className="mt-2 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MessageInput;