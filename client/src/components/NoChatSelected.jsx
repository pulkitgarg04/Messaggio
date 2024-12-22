import { MessageSquareDot } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-[#262E35] text-white">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl flex items-center
             justify-center animate-bounce"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center mb-4">
                <MessageSquareDot className="text-indigo-100" size={28} />
            </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Welcome to Messaggio!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;