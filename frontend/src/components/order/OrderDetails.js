import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import Loader from "../layout/Loader";

const OrderDetails = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetails);

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  useEffect(() => {
    dispatch(getOrderDetails(params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, params.id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Order # ${order._id}`} />
          <div
            className="row d-flex justify-content-between"
            style={{ marginLeft: "13em" }}
          >
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5 text-center">Order # {order._id}</h1>
              <div
                className="pt-3"
                style={{
                  border: "3px solid grey",
                }}
              >
                <h4 className="mb-4 text-center">Shipping Info</h4>
                <p>
                  <b>Name:</b> {user && user.name}
                </p>
                <p>
                  <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
                </p>
                <p className="mb-4">
                  <b>Address: </b>
                  {shippingDetails}
                </p>
                <p>
                  <b>Amount:</b> ${totalPrice}
                </p>
              </div>

              <hr style={{ border: "1px solid grey" }} />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  orderStatus && String(orderStatus).includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr style={{ border: "1px solid grey" }} />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div key={item.product} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr style={{ border: "1px solid grey" }} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
