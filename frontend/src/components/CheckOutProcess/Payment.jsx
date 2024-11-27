import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../actions/orderAction";
import CheckOutProcessPage from "../../pages/CheckOutProcessPage";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { order: createdOrder, error } = useSelector((state) => state.orderDetails);

  // Extract prices and quantities
  const itemsPrice = orderInfo?.subTotal || 0;
  const taxPrice = orderInfo?.tax || 0;
  const shippingPrice = orderInfo?.shippingCharges || 0;
  const totalPrice = orderInfo?.totalPrice || 0;
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const shippingPhone = shippingInfo?.phone || "";
  const productName = cartItems.map((item) => item.name);

  const paymentHandler = async () => {
    try {
      // Step 1: Process Payment with Stripe
      const stripe = await loadStripe("pk_test_51NyXMoIuM3EPOKzANSC73Y3aFvaDXXniKP3XBrRDECz3tyM4t2WaKhfWuAqWsvuY6crcog6Q6TL3cKXFbd0GAxnF005dok0kxI");
  
      const paymentResponse = await fetch("http://localhost:4000/api/payment/create-checkout-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orders: [
            {
              shippingInfo,
              productName,
              itemsPrice,
              taxPrice,
              shippingPrice,
              totalPriceOfProduct: totalPrice,
              totalQuantity,
            },
          ],
        }),
        credentials: "include",
      });
  
      if (!paymentResponse.ok) {
        throw new Error(`Payment session creation failed! Status: ${paymentResponse.status}`);
      }
  
      const session = await paymentResponse.json();
  
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        alert(result.error.message);
        return;
      }
  
      // Simulating the successful payment callback from Stripe
      const paymentInfo = {
        id: "mock-payment-id", // Replace with real payment ID
        status: "Paid", // Update with the actual payment status
      };
  
      // Step 2: Prepare order data
      const updatedCartItems = cartItems.map((item) => ({
        ...item,
        name: item.name,
        price: item.price,
      }));
  
      const order = {
        shippingInfo: {
          ...shippingInfo,
          phoneNo: shippingPhone,
        },
        orderItems: updatedCartItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo, // Include payment information
      };
  
      // Step 3: Dispatch action to create order with payment info
      const createdOrder = await dispatch(createOrder(order));
  
      if (createdOrder.error) {
        throw new Error(`Order creation failed: ${createdOrder.error}`);
      }
  
      // Step 4: Store the success message in localStorage and navigate to success page
      localStorage.setItem("order", JSON.stringify(createdOrder));
      localStorage.setItem("paymentSuccess", "true"); // Save success message
      navigate("/success");
  
    } catch (error) {
      console.error("Error during paymentHandler:", error.message);
    }
  };
  
  

  return (
    <Fragment>
      <CheckOutProcessPage activeStep={2} />
      <div className="paymentContainer">
        <button onClick={paymentHandler} className="paymentBtn">
          {`Pay - $${totalPrice}`}
        </button>
      </div>
    </Fragment>
  );
};

export default Payment;
