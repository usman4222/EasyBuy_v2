import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import CheckOutProcessPage from "../../pages/CheckOutProcessPage";
import { loadStripe } from "@stripe/stripe-js";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const itemsPrice = orderInfo ? orderInfo.subTotal || 0 : 0;
  const taxPrice = orderInfo ? orderInfo.tax || 0 : 0;
  const shippingPrice = orderInfo ? orderInfo.shippingCharges || 0 : 0;
  const totalPriceOfProduct = orderInfo ? orderInfo.totalPrice || 0 : 0;
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const productName = cartItems.map(item => item.name);

  // Log the product names
  console.log("cartItems", productName);

  

  

  const order = [
    {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPriceOfProduct,
    }
];


  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  console.log("subtotal",subtotal);
  


  const shippingCharges = subtotal > 1000 ? 8 : 200;

//   const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const paymentHandler = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51NyXMoIuM3EPOKzANSC73Y3aFvaDXXniKP3XBrRDECz3tyM4t2WaKhfWuAqWsvuY6crcog6Q6TL3cKXFbd0GAxnF005dok0kxI"
      );
  
      const body = {
        orders: [
            {  // Ensure orders is an array of objects
                shippingInfo,
                productName,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPriceOfProduct,
                totalQuantity
            }
        ]
    };

    console.log("body", body);
    
  
    const response = await fetch("http://localhost:4000/api/payment/create-checkout-sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include",
    });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const session = await response.json();
  
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        console.error("Stripe Error:", result.error.message);
      }
    } catch (error) {
      console.error("Error during paymentHandler:", error.message);
    }
  };
  
  const payment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalQuantity,
      productName,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    // paymentHandler();
    navigate("/process/payment")
  };
  

  return (
    <Fragment>
      {/* <MetaData title="Confirm Order" /> */}
      <CheckOutProcessPage activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="shippingInfoAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phone}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ${item.price} <span> = </span>
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>SubTotal:</p>
                <span>${subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                {/* <span>${tax}</span> */}
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>
            <button onClick={payment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;

