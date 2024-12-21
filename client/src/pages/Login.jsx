import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import AuthImagePatttern from '../components/AuthImagePatttern'
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from '../components/Navbar';
import { useAuthStore } from "../store/useAuthStore";

function Login() {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { login, isLoggingIn } = useAuthStore();

    const validateForm = () => {
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!formData.password.trim()) return toast.error("Password is required");
    
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();
        if (success === true) {
            login(formData);
        }
    };

    return (
        <div className="bg-[#1D232A] min-h-screen text-white grid lg:grid-cols-2">
            <Navbar />
            <div className="bg-[#0C1425] flex items-center justify-center">
                <AuthImagePatttern
                    title="Welcome Back"
                    subtitle="Sign in to continue your conversations and catch up with your messages."
                />
            </div>

            <div className="bg-[#0F172A] flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <h2 className="text-2xl font-bold mt-2">Welcome Back</h2>
                            <p className="text-gray-400">Signin with your Messaggio account!</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-10 pr-3 py-2 w-full border border-gray-600 rounded-md bg-[#0F172A]  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="pulkitgarg@example.com"
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    id="password"
                                    name="password"
                                    className="pl-10 pr-3 py-2 w-full border border-gray-600 rounded-md bg-[#0F172A]  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className={`w-full ${isLoggingIn ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-500"} text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        >
                            {isLoggingIn ? "Logging you in..." : "Login"}
                        </button>
                    </form>

                    <div className='text-center text-gray-300'>New to Messaggio? <Link to="/signup" className='hover:underline hover:text-gray-200'>Create account</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Login