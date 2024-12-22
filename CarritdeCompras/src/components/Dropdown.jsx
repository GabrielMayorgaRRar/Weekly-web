import Product from './Product.jsx'

export default function Dropdown({ filteredProducts, setCart, addToCart }) {
    return (
        <div className="row mt-5">
            {filteredProducts.map((products) => (
                <Product
                    key={products.id}
                    products={products}
                    setCart={setCart}
                    addToCart={addToCart}
                />
            ))}
        </div>
    );
}