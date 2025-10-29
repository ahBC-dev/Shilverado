
import { GrInstagram } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";



const Footer = () => {
  return (
    <div className="flex justify-center items-center bg-gray-900 py-10 px-10">
      <div className="flex flex-col w-full justify-center gap-4">
        <img src="../../images/main-logo.png" alt="logopng" className="relative left-0 top-0 w-20 h-20 ml-7"/>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 px-10">
          <div className="flex flex-col gap-1 text-base text-white mt-3">
            <h1 className=" text-gradient font-bold">About Us</h1>
            <div className="flex flex-col items-start">
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Contact us</a>
              <a href="#" className="hover:underline">Security</a>
              <a href="#" className="hover:underline">Blog</a>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-base text-white mt-3">
            <h1 className="font-bold text-gradient">Our Services</h1>
            <div className="flex flex-col items-start">
              <a href="#" className="hover:underline">The Exchange</a>
              <a href="./analytics" className="hover:underline">Markets Analysis</a>
              <a href="./Exchange" className="hover:underline">Send ETH</a>
              <a href="#" className="hover:underline">immutability</a>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-base text-white mt-3">
            <h1 className="font-bold text-gradient">Explore</h1>
            <div className="flex flex-col items-start">
              <a href="#" className="hover:underline">Newsletter</a>
              <a href="#" className="hover:underline">Blog</a>
              <a href="#" className="hover:underline">Why are your Transactions completely secure?</a>
              <a href="#" className="hover:underline">Metamask Wallet</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center mt-10">
          <div className="flex gap-10">
            <a href="https://www.linkedin.com/in/ahmad-hosseini-83a6a8237/" className="text-white text-2xl hover:scale-125 hover:text-blue-400 transition-all duration-300 ease-in-out "><FaLinkedin /></a>
            <a href="/" className="text-white text-2xl hover:scale-125 transition-all duration-300 ease-in-out "><BsTwitterX /></a>
            <a href="/" className="text-white text-2xl hover:scale-125 hover:text-blue-300 transition-all duration-300 ease-in-out "><FaTelegram /></a>
            <a href="/" className="text-white text-2xl hover:scale-125 hover:text-red-600 transition-all duration-300 ease-in-out "><GrInstagram /></a>
          </div>
          <div className="p-[0.5] w-full white-glassmorphism my-4"></div>
          <div className="flex">
            <p className="text-gray-500 text-xs">© 2025 Silversed. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;