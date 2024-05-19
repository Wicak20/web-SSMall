import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const url = 'http://localhost:3000';

export function NewProducts() {
  const [newProduct, setNewProduct] = useState([]);

  const handleNewProduct = () => {
    axios
      .get(`${url}/product`)
      .then((result) => {
        setNewProduct(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const slicedProduct = newProduct.slice(0, 3);

  const handleSendToCart = async (id, product) => {
    await axios
      .post(`${url}/cart/${id}`)
      .then(() =>
        Swal.fire(`item ${product} telah ditambahkan ke keranjang`)
      )
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    handleNewProduct();
  }, []);

  return (
    <div className="my-8 mx-auto w-11/12 sm:w-10/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 container">
      {slicedProduct.map((item, index) => {
        return (
          <div
            className="rounded-2xl shadow-[1px_1px_2px_1px_rgba(0,0,0,0.3)] flex"
            key={index}
          >
            <div className="relative">
              <img
                src={item.photo_product}
                alt="headphone"
                className="max-w-32 h-auto rounded-l-2xl"
              />
              <img
                src="/new.svg"
                alt="new"
                className="absolute top-0 right-2"
              />
            </div>
            <div className="flex flex-col justify-between w-full p-2">
              <div>
                <div className="font-medium truncate break-words">
                  {item.product_name}
                </div>
                <div className="flex text-xs text-[#BFBFBF]">
                  <img src="/star.svg" alt="rating" />
                  <span>4.5/5</span>
                </div>
              </div>
              <div className="w-full">
                <div className="font-medium text-2xl">
                  {item.price}{' '}
                  <span className="line-through text-[#BFBFBF] text-sm">
                    $350
                  </span>
                </div>
                <button
                  className="bg-[#40BFFF] py-2 w-full rounded-lg font-medium text-xs text-white truncate break-words"
                  onClick={() =>
                    handleSendToCart(item.product_id, item.product_name)
                  }
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
