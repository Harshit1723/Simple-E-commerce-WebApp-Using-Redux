import React, { useState, useEffect } from 'react';
import { setProducts } from '../redux/slice/productSlice';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../redux/slice/cartSlice';

const ProductList = () => {
 
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
  
    if (products.length === 0) {
        
      const fetchProducts = async () => {
        try {
          const res = await fetch('https://dummyjson.com/products');
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            dispatch(setProducts(data.products));
          } else {
            console.error('Failed to Fetch Products');
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();
    }
  }, [products,dispatch]); // Dependency array ensures this effect runs only once when products are not fetched

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceRange = (e) => {
    setPriceRange(e.target.value);
  };

  const filterProducts = () => {
    let filteredProducts = products;

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-');
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= parseInt(minPrice, 10) && product.price <= parseInt(maxPrice, 10)
      );
    }
    return filteredProducts;
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  const filteredProducts = filterProducts();

  return (
    <div >
      
      <div className=' p-3 flex items-center justify-around '>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search Products..."
        className="bg-black text-white border border-white rounded-md p-2 focus:outline-none focus:border-blue-500"
      />

<div className="flex items-center mb-2">
  <label className="text-white mr-2">Price Range</label>
  <select
    className="border border-white rounded-md p-2 focus:outline-none focus:border-blue-500"
    value={priceRange}
    onChange={handlePriceRange}
  >
    <option value="">All</option>
    <option value="0-500">0-500</option>
    <option value="500-1000">500 - 1000</option>
    <option value="1000-2000">1000-2000</option>
  </select>
</div>


      </div>

      <ul>

        <div className="grid     grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  xl:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <li key={product.id} className="border border-slate-700 rounded-md">
            
            {product.images && product.images.length > 0 && (
              <img src={product.images[0] }  alt={product.title}  className="w-full  rounded-md h-48 object-cover mb-2"/>
            )}

              <div className=' flex flex-col items-center justify-center'>
            <p className="text-lg font-semibold">{product.title}</p>
            <p className="text-gray-500">${product.price}</p>
            <button onClick={() => handleAddToCart(product) }
            className="mt-2 mb-7 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">Add To Cart</button>
            </div>
          
          </li>
        ))}
  </div>

      </ul>
    </div>
  );
};

export default ProductList;
