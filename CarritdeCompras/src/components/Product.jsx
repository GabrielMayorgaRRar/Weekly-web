import { useState, useEffect } from 'react';

export default function Product({ products, addToCart }) {
    const [imageSrc, setImageSrc] = useState('/placeholder.svg');


    useEffect(() => {
        if (products.images && products.images.length > 0) {
            try {
                const parsedImages = JSON.parse(products.images[0]);
                if (Array.isArray(parsedImages)) {
                    setImageSrc(parsedImages[0]); 
                } else {
                    setImageSrc(products.images[0]);
                }
            } catch (error) {
                setImageSrc(products.images[0]);
            }
        }
    }, [products.images]);

    const handleClick = (products) => {
        setCart([...cart, products]);
    };

    const { id, title, price, description } = products;

    return (
        <div className="col-md-6 col-lg-4 my-4">
            <div className="row align-items-start" style={{ minHeight: "300px" }} alt={products.title}>
                <div className="col-12 mb-3 d-flex justify-content-center">
                    <div 
                        className="image-container" 
                        style={{
                            width: "100%", 
                            height: "350px", 
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center", 
                            alignItems: "center",
                        }}
                    >
                        <img
                            className="img-fluid rounded shadow-lg border border-secondary"
                            src={imageSrc}
                            alt={title}
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover"
                            }}
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <h3
                        className="text-black fs-4 fw-bold text-uppercase text-truncate"
                        style={{
                            maxWidth: "100%",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {title}
                    </h3>
                </div>

                <div className="col-12 mb-3">
                    <p 
                        className="m-0"
                        style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {description}
                    </p>
                </div>

                <div className="col-12 mb-2">
                    <p className="fw-bold text-primary fs-3">${price} USD</p>
                </div>

                <div className="col-12 mt-auto">
                    <button
                        type="button"
                        className="btn btn-dark w-100 mt-2"
                        onClick={() => addToCart(products)}
                    >
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
}
