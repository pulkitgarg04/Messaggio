import { IoMdChatbubbles } from "react-icons/io";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Label({ htmlFor, text }) {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {text}
        </label>
    );
}

function InputBox({ type, id, name, value, onChange, placeholder, toggleVisibility, isPassword }) {
    return (
        <div className="relative">
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm text-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {isPassword && (
                <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
                    onClick={toggleVisibility}
                >
                    {type === "password" ? <FaEye /> : <FaEyeSlash />}
                </button>
            )}
        </div>
    );
}

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(formData.password)) {
            toast.error("Password must contain at least one lowercase, one uppercase letter, and one number.");
            return;
        }

        try {
            const response = await fetch(`${import.meta.VITE_BACKEND_URL}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900 min-h-screen" >
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        src="https://i0.wp.com/www.cloudia.com.br/wp-content/uploads/softwares_de_chat_online_2.jpg?fit=1024%2C1002&ssl=1"
                        className="absolute inset-0 h-full w-full object-cover blur-sm opacity-80"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <a className="block text-white inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20 dark:bg-gray-900" href="#">
                            <IoMdChatbubbles size={30} />
                        </a>

                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to Messaggio
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Join the conversation. Connect. Share. Thrive.
                        </p>
                    </div>
                </section>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                            <a
                                className="inline-flex size-16 items-center justify-center rounded-full text-white sm:size-20 dark:bg-gray-900"
                                href="#"
                            >
                                <IoMdChatbubbles size={30} />
                            </a>

                            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                                Welcome to Messaggio
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                                Join the conversation. Connect. Share. Thrive.
                            </p>
                        </div>

                        <form>
                            <div className="mb-4">
                                <Label htmlFor="Name" text="Name" />
                                <InputBox
                                    type="text"
                                    id="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="Email" text="Email" />
                                <InputBox
                                    type="email"
                                    id="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="Password" text="Password" />
                                <InputBox
                                    type={showPassword ? "text" : "password"}
                                    id="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    isPassword={true}
                                    toggleVisibility={() => setShowPassword(!showPassword)}
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="PasswordConfirmation" text="Password Confirmation" />
                                <InputBox
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="PasswordConfirmation"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    isPassword={true}
                                    toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            </div>

                            <div>
                                <label className="flex gap-4">
                                    <input
                                        type="checkbox"
                                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                                    />

                                    <p className="text-sm text-gray-500 dark:text-gray-400">By creating an account, you agree to our
                                        <a href="#" className="mx-1 text-gray-700 underline dark:text-gray-200">
                                            terms and conditions
                                        </a>
                                        and
                                        <a href="#" className="mx-1 text-gray-700 underline dark:text-gray-200">privacy policy</a>.
                                    </p>
                                </label>
                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-indigo-600 bg-blue-600 m-5 px-5 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                                >
                                    Create my account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                                    Already have an account?
                                    <a href="/login" className="text-gray-700 underline dark:text-gray-200 ml-1">Log in</a>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section >
    )
}

export default Signup
