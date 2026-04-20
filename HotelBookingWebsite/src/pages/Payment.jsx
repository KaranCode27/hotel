import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaSpinner, FaTimesCircle } from 'react-icons/fa';
import { useCreateBookingMutation } from '../slices/bookingsApiSlice';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [status, setStatus] = useState('processing');
  const [createBooking] = useCreateBookingMutation();

  const isPayPal = state?.bookingPayload?.paymentMethod === 'paypal';
  
  // To avoid dual execution of useEffect
  const initialized = useRef(false);

  const processPayment = async () => {
    if (!state?.bookingPayload) {
      setStatus('error');
      return;
    }
    try {
      setStatus('processing');
      await createBooking(state.bookingPayload).unwrap();
      setStatus('success');
    } catch (err) {
      console.error('Booking failed:', err);
      setStatus('error');
    }
  };

  useEffect(() => {
    // Only auto-process if it's Credit Card (mock flow)
    if (!isPayPal && !initialized.current) {
      initialized.current = true;
      const timer = setTimeout(() => {
         processPayment();
      }, 1500);
      return () => clearTimeout(timer);
    } else if (isPayPal) {
      setStatus('paypal_pending');
    }
  }, [createBooking, state, isPayPal]);

  return (
    <PayPalScriptProvider options={{ "client-id": "test", currency: "USD" }}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-10 rounded-2xl max-w-md w-full text-center border border-hotel-gold/30 shadow-2xl shadow-hotel-gold/10"
        >
          {status === 'paypal_pending' ? (
            <div className="flex flex-col items-center py-4">
              <h2 className="text-2xl font-bold text-white mb-2">Complete Payment</h2>
              <p className="text-gray-400 mb-6 font-medium text-sm">Please finalize your transaction via PayPal to secure this booking.</p>
              <div className="w-full relative z-10">
                <PayPalButtons
                  style={{ layout: "vertical", shape: "rect", color: "gold" }}
                  createOrder={(data, actions) => {
                    const totalUsd = (state.bookingPayload.totalPrice / 83.0).toFixed(2); // Mock INR to USD fix
                    return actions.order.create({
                      purchase_units: [{ amount: { value: totalUsd } }]
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(() => {
                      processPayment();
                    });
                  }}
                  onCancel={() => {
                    setStatus('error');
                  }}
                  onError={() => {
                     setStatus('error');
                  }}
                />
              </div>
            </div>
          ) : status === 'processing' ? (
            <div className="flex flex-col items-center py-8">
              <FaSpinner className="animate-spin text-5xl text-hotel-gold mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Processing Payment...</h2>
              <p className="text-gray-400">Please do not refresh or close this page.</p>
            </div>
          ) : status === 'error' ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-8"
            >
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                <FaTimesCircle className="text-5xl text-red-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Payment Failed</h2>
              <p className="text-gray-400 mb-8">There was an issue processing your booking. Please try again.</p>
              
              <div className="w-full space-y-3">
                <button onClick={() => navigate(-1)} className="btn-primary w-full py-3">Go Back</button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-8"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <FaCheckCircle className="text-5xl text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
              <p className="text-gray-400 mb-8">Your reservation has been confirmed and the invoice has been sent to your email.</p>
              
              <div className="w-full space-y-3">
                <button onClick={() => navigate('/user/bookings')} className="btn-primary w-full py-3">View Bookings</button>
                <button onClick={() => navigate('/search')} className="text-hotel-gold hover:text-white transition-colors text-sm font-medium">Continue Browsing</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Payment;
