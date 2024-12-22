import { useMemo } from 'react';

export default function Header({ cart, removeFromCart, increaseQuantity, clearCart, uncreaseQuantity }) {
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const total = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img className="img-fluid" src="./public/img/Logo.png" alt="imagen logo" />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div
              className="carrito"
            >
              <img className="w-100 h-auto" src="./public/img/carrito.png" alt="imagen carrito" />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map(item => (
                          <tr key={item.id} >
                            <td>
                              <img className="img-fluid h-100 w-100" src={item.images[0]} alt="imagen guitarra" />
                            </td>
                            <td
                              style={{
                                maxWidth: "100%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}

                            >{item.title}</td>
                            <td className="fw-bold">
                              ${item.price} USD
                            </td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => uncreaseQuantity(item.id)}
                              >
                                -
                              </button>
                              {item.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => increaseQuantity(item.id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">Total pagar: <span className="fw-bold">${total} USD</span></p>
                    <button className="btn btn-dark w-100 mt-3 p-2" 
                    onClick={() => clearCart()}
                    >
                      Vaciar Carrito
                    </button >
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
};