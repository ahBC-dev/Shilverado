import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react';
import { HeaderRef } from '../hooks/HeaderRed';
//linking 
import { Link } from 'react-router-dom';

import Logo from '../../images/logo.png'

//navbar item with dropdown support
const NavbarItem = ({ title, classProps, to, dropdown }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <li className={`mx-4 cursor-pointer md:text-white text-black ease-in-out ${classProps}`}
    onMouseEnter={() => dropdown && setIsDropDownOpen(true)}
    onMouseLeave={() => dropdown && setIsDropDownOpen(false)}
    >

      <Link to={to} className='block py-2 hover:text-gray-300'>
        {title}
      </Link>

      {/*DropDown Menu*/}
      {dropdown && isDropDownOpen && (
        <div className='absolute top-full blue-glassmorphism rounded-lg py-2 w-auto z-50 mt-1'>
          {dropdown.map((item, idx) => (
            <Link
              key={item.title + idx}
              to={item.to}
              className='block px-4 py-2 text-white hover:text-gray-300  text-base'
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}

const Navbar = () => {
   const [toggleMenu, setToggleMenu] = useState(false);
   //Header animation
   const headerRef = HeaderRef()

    // Define navigation items with routes
    //navitems with dropdown
    const navItems = [
      {
        title: 'Markets',
        to: '/analytics',
        dropdown: [
          { label: 'Crypto Markets', to: './Analytics' },
          { label: 'Mrket Statistics', to: '/stocks' }, 
        ]
      },
      {
        title: 'Home',
        to: '/',
        dropdown: [
          { label: 'Exchange', to: '/Exchange' },
          { label: 'Project Management', to: '/Exchange' },
        ]
      },
      {
        title: 'Send ETH',
        to: '/Exchange',
        //no dropdown
      },
      {
        title: 'Newsletter',
        to: '/Newsletter',
      },
   ];

  return (
    <nav 
      ref={headerRef}
      className='flex md:justify-center justify-between items-center p-2 white-glassmorphism rounded-full fixed z-50 top-3 left-2 right-2 xl:top-5 xl:right-10 xl:left-10 2xl:top7 2xl:right-20 2xl:left-20 transition-all duration-300 ease-in-out'
      >
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <Link to='/'> {/* ← Make logo clickable to home */}
          <img src={Logo} alt='logo' className='w-32 cursor-pointer' />
        </Link>
      </div>
      <ul className='text-white md:flex flex hidden list-none flex-row justify-between items-center flex-initial transition ml-20 text-sm'>
        {navItems.map((item, index) => (
          <NavbarItem key={item.title + index} title={item.title} to={item.to} dropdown={item.dropdown}/>
        ))}
      </ul>
      {/* Mobile Menu navigation bar */}
      <div className='flex relative transition-all duration-300 ease-in-out'>
        {toggleMenu
          ? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)} />
          : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <ul
            className='z-50 fixed -top-4 bottom-0 -right-2 p-3 w-[55vw] md:w-[50vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md bg-gray-900 text-white transition-all duration-300 ease-in-out'
          >
            <li className='text-xl w-full my-2 cursor-pointer'>
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {navItems.map((item, index) => (
              <NavbarItem key={item.title + index} title={item.title} to={item.to} classProps="my-2 text-lg text-white" />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;