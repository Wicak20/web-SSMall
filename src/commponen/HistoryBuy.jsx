import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const url = 'http://localhost:3000';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showHistory, setShowHistory] = useState([]);

  const handleGetHistory = () => {
    axios
      .get(`${url}/history`)
      .then((result) => {
        setShowHistory(result.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    handleGetHistory();
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => toggleSidebar()}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 w-64 sm:w-96 bg-white text-white transition-transform z-10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => toggleSidebar()}
          className="text-black font-bold text-2xl p-4"
        >
          My History
        </button>
        <div className="w-full p-2 bg-[#C2EAFF] flex text-black text-xs gap-2">
          <img src="/Vector.svg" alt="disc" />
          Get Your Free Shipping Voucher
        </div>
        {showHistory.map((item, index) => (
          <div className="flex" key={index}>
            <div className="w-1/2 sm:w-1/3">
              <img src={item.photo_product} alt="product" className="w-full" />
            </div>
            <div className="flex flex-col justify-between w-1/2 sm:w-2/3 ps-2">
              <div>
                <div className="font-medium truncate break-words text-black">
                  {item.product_name}
                </div>
                <div className="flex text-xs text-[#BFBFBF]">
                  <img src="/star.svg" alt="rating" />
                  <span>4.5/5</span>
                </div>
              </div>
              <div className="w-full">
                <div className="font-medium text-2xl text-black">
                  {item.price}{' '}
                  <span className="line-through text-[#BFBFBF] text-sm">
                    $350
                  </span>
                </div>
                <button className="bg-[#40BFFF] py-2 w-full font-medium text-xs text-white truncate break-words bg-[#61C454]">
                  Buy Again
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const MainContent = ({ toggleSidebar }) => {
  return (
    <div>
      <div onClick={() => toggleSidebar()}>My History</div>
    </div>
  );
};

const HistoryBuy = () => {
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

export default HistoryBuy;
