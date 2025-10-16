import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from './CheckoutForm';
import CheckoutForm from './Checkout';

const stripePromise = loadStripe("pk_test_51Rgiq6P2dzCloiBXo5vFaBNZlUZWMS0SnKLdZvGmC6AlQosL1CPwfSfvx4ai8fFMzJVkq9W6eBlMcJqxV1EMV2na00YRZA8K43");

const CheckoutWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutWrapper;
