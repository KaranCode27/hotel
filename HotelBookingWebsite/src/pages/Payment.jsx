import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaSpinner, FaTimesCircle } from 'react-icons/fa';
import { useCreateBookingMutation } from '../slices/bookingsApiSlice';

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [status, setStatus] = useState('razorpay_modal');
  const [createBooking] = useCreateBookingMutation();

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
    if (status === 'razorpay_modal') {
      const timer = setTimeout(() => {
         processPayment();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status, createBooking, state]);

  return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        
        {/* Razorpay Mock Modal */}
        {status === 'razorpay_modal' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               className="bg-white rounded-lg shadow-2xl relative overflow-hidden flex flex-col w-[350px] sm:w-[400px] h-[500px]"
             >
               <div className="bg-[#3395FF] p-6 text-white text-center relative overflow-hidden">
                  <div className="absolute top-4 right-[-30px] bg-red-500 text-white text-[10px] font-bold px-10 py-1 flex items-center justify-center rotate-45">TEST</div>
                  <h2 className="text-xl font-bold mb-1 text-white">LuxeStays Hotel</h2>
                  <p className="text-blue-100 text-sm">Secure Booking Payment</p>
                  <div className="text-3xl font-bold mt-4 text-white">₹{state?.bookingPayload?.totalPrice ? (state.bookingPayload.totalPrice).toFixed(2) : "0.00"}</div>
               </div>
               
               <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 text-gray-800">
                  <FaSpinner className="animate-spin text-4xl text-[#3395FF] mb-4" />
                  <p className="font-bold text-lg text-gray-800">Authenticating...</p>
                  <p className="text-sm text-gray-500 mt-2 text-center">Please do not refresh the page or press the back button.</p>
               </div>
 
               <div className="bg-white p-4 border-t border-gray-200 flex justify-center items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium tracking-wide">Secured by</span>
                  <div className="flex items-center text-gray-800 font-bold text-sm tracking-tight"><span className="text-[#3395FF] mr-[1px]">Razor</span>pay</div>
               </div>
             </motion.div>
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-10 rounded-2xl max-w-md w-full text-center border border-hotel-gold/30 shadow-2xl shadow-hotel-gold/10"
        >
          {status === 'processing' ? (
            <div className="flex flex-col items-center py-8">
              <FaSpinner className="animate-spin text-5xl text-[#3395FF] mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Connecting to Razorpay...</h2>
              <p className="text-gray-400">Authenticating secure transaction. Please do not refresh.</p>
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
  );
};

export default Payment;
