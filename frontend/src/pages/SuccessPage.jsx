import React from "react";

const SuccessPage = () => {
  const paymentSuccess = localStorage.getItem("paymentSuccess");
  const order = JSON.parse(localStorage.getItem("order"));

  console.log("Success Page - paymentSuccess:", paymentSuccess);
  console.log("Success Page - order:", order);

  return (
    <div>
      {paymentSuccess ? (
        <h2>Payment was successful!</h2>
      ) : (
        <h2>Payment failed</h2>
      )}
      {order && <pre>{JSON.stringify(order, null, 2)}</pre>}
    </div>
  );
};

export default SuccessPage;
