import { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import AuthImagePatttern from '../components/AuthImagePatttern'
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/useAuthStore';

function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");

        if (!formData.password.trim()) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();
        if (success === true) {
            signup(formData);
        }
    };

    return (
        <div className="bg-[#1D232A] min-h-screen text-white grid lg:grid-cols-2">
            <Navbar />
            <div className="bg-[#0F172A] flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <h2 className="text-2xl font-bold mt-2">Create Account</h2>
                            <p className="text-gray-400">Signup and Get started with Messaggio!</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-200 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="pl-10 pr-3 py-2 w-full border border-gray-600 rounded-md bg-[#0F172A]  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Pulkit Garg"
                                />
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>
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
                                    id="password"
                                    name="password"
                                    className="pl-10 pr-3 py-2 w-full border border-gray-600 rounded-md bg-[#0F172A]  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="pl-10 pr-3 py-2 w-full border border-gray-600 rounded-md bg-[#0F172A]  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />

                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSigningUp}
                            className={`w-full ${isSigningUp ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-500"} text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        >
                            {isSigningUp ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <div className='text-center text-gray-300'>Already have an account? <Link to="/login" className='hover:underline hover:text-gray-200'>Login</Link></div>
                </div>
            </div>

            <div className="bg-[#0C1425] flex items-center justify-center">
                <AuthImagePatttern
                    title="Join our Community"
                    subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
                />
            </div>
        </div>
    )
}

export default Signup
