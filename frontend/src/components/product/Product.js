import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, col }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div
        className="card p-3"
        style={{
          borderRadius: "10px",
          backgroundColor: "#4e4e4e",
          background: "linear-gradient(rgba(78, 78, 78, 1),rgba(78, 78, 78, 0)",
        }}
      >
        <img
          className="card-img-top mx-auto"
          src={product.images[0].url}
          alt={product.name}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center">
            <Link className="text-white" to={`/product/${product._id}`}>
              {product.name}
            </Link>
          </h5>
          <div className="ratings mt-auto text-center">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{
                  width: `${(product.ratings / 5) * 100}%`,
                  color: "#abff4f !important",
                }}
              ></div>
            </div>
            <span id="no_of_reviews" style={{ color: "#ADA6B3FF" }}>
              {product.numOfReviews} Reviews
            </span>
          </div>
          <p className="card-text text-center font-weight-bold text-white">
            ${product.price}
          </p>
          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block retro-green retro-black-text"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
