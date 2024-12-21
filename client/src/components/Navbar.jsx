import { Link } from "react-router-dom";
import { MessageSquareDot, SunDim } from "lucide-react";

function Navbar() {
    return (
        <header className="fixed w-full top-0 z-40 backdrop-blur-lg">
            <div className="container mx-auto px-10 h-14">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 hover:opacity-80 translate-all">
                            <div className="size-9 rounded-xl bg-indigo-400 flex items-center justify-center">
                                <MessageSquareDot className="text-indigo-100" />
                            </div>
                            <h1 className="text-lg font-bold text-white">Messaggio</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                        <div className="gap-2 flex items-center justify-center hover:bg-black/50 px-2 py-1 rounded-md">
                            <SunDim />
                            <span className="hidden sm:inline">Theme</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
