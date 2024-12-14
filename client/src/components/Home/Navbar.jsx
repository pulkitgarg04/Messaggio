import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-transparent bg-black">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="w-40">
          <a href="/" className="block">
            <img src="/logo-white.svg" alt="Messaggio" className="w-full" />
          </a>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden focus:outline-none"
        >
          <span className="block w-8 h-0.5 bg-white mb-2"></span>
          <span className="block w-8 h-0.5 bg-white mb-2"></span>
          <span className="block w-8 h-0.5 bg-white"></span>
        </button>

        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute right-6 top-full mt-4 bg-white rounded-lg shadow-lg lg:static lg:block lg:bg-transparent lg:shadow-none lg:mt-0`}
        >
          <ul className="lg:flex lg:space-x-8">
            {[
              { name: "Home", link: "#home" },
              { name: "About", link: "#about" },
              { name: "Features", link: "#features" },
              { name: "Contact", link: "#contact" },
            ].map((item) => (
              <li key={item.name} className="group">
                <a
                  href={item.link}
                  className="block px-4 py-2 text-dark hover:text-primary lg:text-white lg:hover:opacity-75"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <label className="hidden lg:flex items-center cursor-pointer">
          <input type="checkbox" className="hidden" />
          <span className="block w-6 h-6 bg-white dark:bg-dark rounded-full"></span>
        </label>
      </div>
    </header>
  );
};

export default Navbar;