import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
let url = 'http://localhost:3000';
import Swal from 'sweetalert2';
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showCart, setShowCart] = useState([]);
  const handleCheckout = (id, foto, name) => {
    axios.put(`${url}/cart/${id}`).then(() =>
      Swal.fire({
        title: 'Confirm Payment',
        text: name,
        imageUrl: foto,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Payment success!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => window.location.reload());
      })
    );
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${url}/cart/${id}`);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        }).then(() => window.location.reload());
      }
    });
  };

  const handleGetCart = () => {
    axios
      .get(`${url}/cart`)
      .then((result) => {
        setShowCart(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   console.log('ini cart', showCart);
  useEffect(() => {
    handleGetCart();
  }, []);
  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => toggleSidebar()}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white text-white transition-transform z-10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => toggleSidebar()}
          className="text-black font-bold text-2xl p-4"
        >
          My Cart
        </button>
        <div className="w-full p-2 bg-[#C2EAFF] flex text-black text-xs gap-2">
          <img src="/Vector.svg" alt="disc" />
          Get Your Free Shipping Voucher
        </div>
        <div className="overflow-y-auto">
          {showCart.map((item, index) => {
            return (
              <div className="flex" key={index}>
                <div className="w-1/3">
                  <img
                    src={item.photo_product}
                    alt="product"
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col justify-between w-2/3 ps-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium truncate break-words text-black">
                        {item.product_name}
                      </div>
                      <img
                        src="/sampah.svg"
                        alt="trash"
                        className="w-4"
                        onClick={() => handleDelete(item.product_id)}
                      />
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
                    <button
                      className="bg-[#40BFFF] py-2 w-full font-medium text-xs text-white truncate break-words bg-[#EC6D62]"
                      onClick={() =>
                        handleCheckout(
                          item.product_id,
                          item.photo_product,
                          item.product_name
                        )
                      }
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const MainContent = ({ toggleSidebar }) => {
  return (
    <div>
      <div onClick={() => toggleSidebar()}>
        <img src="/keranjang.svg" alt="cart" />
      </div>
    </div>
  );
};

const CartSide = () => {
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

export default CartSide;
