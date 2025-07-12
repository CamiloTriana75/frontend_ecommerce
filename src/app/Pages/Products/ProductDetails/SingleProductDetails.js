import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../Coponents/Footer/Footer";
import { addToCarts } from "../../../Features/Cart/CartSlice";

function SingleProductDetails() {
  let { productId } = useParams();
  let [product, setProduct] = useState(null);
  let [quantity, setQuantity] = useState(1);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  //increase item quantity
  const increaseQunaity = (e) => {
    e.preventDefault();
    quantity += 1;
    setQuantity(quantity);
  };

  //decrease item quantity
  const decreaseQunaity = (e) => {
    e.preventDefault();
    quantity > 1 ? setQuantity((quantity -= 1)) : setQuantity(quantity);
  };

  //add the item to the cart
  const addToCart = (e) => {
    e.preventDefault();
    let item = {
      id: parseInt(productId),
      quantity: quantity,
      price: product.price,
    };
    dispatch(addToCarts(item));
  };

  //use effect function to find the product from all products
  useEffect(() => {
    let result = products.find((p) => p.id === parseInt(productId));
    setProduct(result);
  }, [productId, products]);

  return (
    <Fragment>
      <Container>
        {product && (
          <Row className="my-5">
            <Col md={6} sm={12}>
              <div className="img-container p-3">
                <Image className="single-img" src={product.image} alt={product.title} />
              </div>
            </Col>
            <Col md={6} sm={12}>
              <div className="product-details-container px-4">
                <h2 className="product-title">{product.title}</h2>
                <h4 className="product-category">
                  Category:{" "}
                  <Link to={`/category/${product.category}`}>
                    {product.category}
                  </Link>
                </h4>
                <h4 className="product-price">Price: ₹{product.price}</h4>
                <p className="product-description">{product.description}</p>
                
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={decreaseQunaity}
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    readOnly={true}
                    required={true}
                    aria-label="Product quantity"
                  />
                  <button
                    className="quantity-btn"
                    onClick={increaseQunaity}
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>
                
                <div className="action-buttons">
                  <Button variant="dark" className="action-btn btn-primary">
                    Buy Now
                  </Button>
                  <Button
                    variant="secondary"
                    className="action-btn btn-secondary"
                    onClick={addToCart}
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </Fragment>
  );
}

export default SingleProductDetails;
