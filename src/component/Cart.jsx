import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { removeFromCart,decreaseQuantity,clearCart } from '../redux/slice/cartSlice';

function Cart({token,onBack}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity({id:itemId}));
  }

  const handleRemoveFromCart = (itemid) => {
    dispatch(removeFromCart(itemid));
  }

  const handleClearCart = () => {
    dispatch(clearCart());
  }

    let cartLength = cartItems.reduce((total, item) => total + item.quantity, 0)
    let cartPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0)

  return (
    <div className="flex  flex-col min-h-screen max-h-auto w-screen  bg-black p-4">
       <div className='flex mt-5 items-center justify-center'>
        <h1 className='text-4xl font-semibold'>Welcome to Your Cart</h1>
        </div>

<div className='flex mt-8 flex-row items-center justify-around'>
        {token && (
            <button onClick={onBack} className="bg-blue-500 mx-10  text-white py-2 px-3 rounded-md mt-4 mb-4">
                 Back
            </button>
        )}
       
<h2 className=' rounded-full p-2 px-8  text-2xl  text-white bg-gradient-to-r from-purple-700 to-orange-600 '>Total Price : {cartPrice}</h2>
<h2  className=' rounded-md p-1 px-4    text-white bg-violet-500 '> Items : {cartLength} </h2>


</div>
     
      <ul>
          <div className="grid mt-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {cartItems.map((item) => (
          <li key={item.id} className="border border-slate-700  rounded-md">
            {item.images && item.images.length > 0 && (
              <img src={item.images[0] }  alt={item.title}  className="w-full rounded-md h-48 object-cover mb-2"/>
            )}

              <div className='flex flex-col justcen items-center'>
            <p className="text-lg font-semibold">{item.title}</p>
            <p className="text-gray-500">Quantity: {item.quantity}</p>
            </div>

              <div className='flex mb-5 justify-around'>
            {item.quantity > 1 && (
              <button onClick={() => handleDecreaseQuantity(item.id)} className="bg-red-500 text-white py-1 px-8 rounded-md mt-2">-</button>
            )}
            <button onClick={() => handleRemoveFromCart(item.id)} className="bg-gray-500 text-white py-1 px-4 rounded-md mt-2">Remove</button>
            </div>
          
          </li>
        ))}
  </div>
      </ul>
      
      <div className='flex  flex-col items-center justify-center '>
      <button className="bg-red-400 text-white py-2 px-20 rounded-md mt-4 " onClick={handleClearCart}>Clear Cart</button>
      </div>
    </div>
  )
}

export default Cart