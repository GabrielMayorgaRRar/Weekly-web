import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import Dropdown from './components/Dropdown.jsx'
import Footer from './components/Footer.jsx'

async function getProducts() {
  try {
    const res = await axios('https://api.escuelajs.co/api/v1/products')
    const data = res.data ? res.data : []
    const filterCars = data.length > 0 ? data.slice(0, 36) : []
    const filterDescription = filterCars.filter(car => car.description.length > 20)
    return filterDescription
  } catch (error) {
    return []
  }
}

function App() {
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState([])

  const fetchData = async () => {
    try {
      const products = await getProducts()
      setData(products)
      const uniqueCategories = [...new Set(products.map(product => product.category.name))]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart')) ?? []
    setCart(data)
  }, [])

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  function addToCart(item) {
    const itemExists = cart.findIndex(cartItem => cartItem.id === item.id);

    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= 10) return
      const updatedCartItem = [...cart];
      updatedCartItem[itemExists].quantity++;
      setCart(updatedCartItem);
    } else {
      item.quantity = 1;
      setCart(prevCart => [...prevCart, item]);
    }
  }

  function removeFromCart(itemId) {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    if (cart.length === 1 || cart.length === 0) {
      clearCart()
    }
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem('cart')
  }

  function increaseQuantity(itemId) {
    const updatedCartItem = cart.map(item => {
      if (item.id === itemId && item.quantity < 10) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item;
    });
    setCart(updatedCartItem);
  }

  function uncreaseQuantity(itemId) {
    const updatedCartItem = cart.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item;
    });
    setCart(updatedCartItem);
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const filteredProducts = data.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || product.category.name === selectedCategory)
  )

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        uncreaseQuantity={uncreaseQuantity}
      />
      <main className="container-xl mt-6">
        <h2 className="text-center mt-5">Nuestros Productos</h2>
        {/* SEARCH BAR */}
        <SearchBar
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          categories={categories}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        {/* END - SEARCH BAR */}
        {/* DROPDOWN */}
        <Dropdown 
          filteredProducts={filteredProducts}
          setCart={setCart}
          addToCart={addToCart}
        />
        {/* END - DROPDOWN */}
      </main>
      <Footer />
    </>
  )
}

export default App

