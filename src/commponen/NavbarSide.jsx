import React, { useState, useEffect, useRef } from 'react';
import HistoryBuy from './HistoryBuy';
import CartPayment from './CartPayment';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => toggleSidebar()}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white text-black p-4 transition-transform z-10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button onClick={() => toggleSidebar()} className="text-black font-bold text-2xl">
          X
        </button>
        <ul className='text-black flex flex-col gap-10 mt-10'>
          <li>Home</li>
          <li>Products</li>
          <li>About</li>
          <li>Pricing</li>
          <li>Search</li>
          <li><CartPayment/></li>
          <li><HistoryBuy/></li>
          <li>Profile</li>
        </ul>
      </div>
    </>
  );
};

const MainContent = ({ toggleSidebar }) => {
  return (
    <div>
      <div onClick={() => toggleSidebar()}>
        <button className="relative group block lg:hidden">
          <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
            <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-500 origin-center overflow-hidden">
              <div className="bg-white h-[2px] w-7 transform transition-all duration-500 group-focus:-rotate-45 -translate-x-1"></div>
              <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-500 "></div>
              <div className="bg-white h-[2px] w-7 transform transition-all duration-500 group-focus:rotate-45 -translate-x-1"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

const NavbarSide = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex" ref={sidebarRef}>
      <MainContent toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default NavbarSide;
