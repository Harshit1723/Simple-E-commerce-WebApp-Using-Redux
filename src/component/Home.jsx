import React from 'react';
import ProductList from './ProductList';
import Cart from './Cart';


function Home({onLogout}) {
  return (
    <div className=' p-4  bg-black w-screen flex flex-col items-center'>
    
    <div className=' w-full flex items-center justify-between '>

   
    <p>Welcome</p>

    <button onClick={onLogout}>Logout</button>
    
    
    </div>

    <div className='  max-h-auto min-h-screen w-screen p-4'>
      <ProductList />
      </div>
     

      </div>
        
  );
}

export default Home;

//kminchelle

//0lelplR

// You can submit a short assignment 

// 1. Implement Login process using (https://dummyjson.com/docs/auth),
// 2. Save the login token for authorization purpose.
// 3. Make Home page as protected Route (only logged in users allowed).
// 4. Fetch products on home page ( https://dummyjson.com/docs/products)
// 5. Add a search on the page to search products based on their name
// 6. Add a filter option on the home page based on price
// 7. Implement a cart and show the cart count on the top with the total amount of the cart
// 8. Create add to cart button on product cards.



