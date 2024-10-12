import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import "./index.scss";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/features/cartSlide";

function HomePage() {
  const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
    try {
      const response = await api.get("koi");
      setProducts(response.data);
    } catch (e) {
      console.log("Error fetch product: ", e);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
      {/* từ danh sách sp, biến mỗi product thành <Product /> */}
      <div className="product-list">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addProduct(product));
  };
  return (
    <div className="product">
      <img src={product.image} alt="" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>{product.price}</span>
      <center>
        <button onClick={handleAddToCart}>Add to cart</button>
      </center>
    </div>
  );
};

export default HomePage;
