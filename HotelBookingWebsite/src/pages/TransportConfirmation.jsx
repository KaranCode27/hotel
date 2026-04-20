import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCar, FaHome, FaQrcode } from 'react-icons/fa';

const TransportConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-hotel-dark py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 sm:p-12 rounded-3xl max-w-2xl w-full text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 relative z-10"
        >
          <FaCheckCircle className="text-5xl text-green-400" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 relative z-10">Booking Confirmed!</h1>
        <p className="text-gray-400 mb-8 relative z-10">Your transport has been successfully scheduled. We've sent the details to your email.</p>

        <div className="bg-[#161925] border border-white/10 rounded-2xl p-6 text-left mb-8 relative z-10 flex flex-col md:flex-row items-center gap-6">
           <div className="flex-1 w-full space-y-4">
             <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Booking ID</span>
                <span className="text-white font-mono font-bold">TRN-89241</span>
             </div>
             <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Vehicle</span>
                <span className="text-hotel-gold font-medium">Mercedes-Benz S-Class</span>
             </div>
             <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Date & Time</span>
                <span className="text-white">Oct 24, 2026 - 10:00 AM</span>
             </div>
             <div className="flex justify-between">
                <span className="text-gray-400">Driver Status</span>
                <span className="text-yellow-400">Awaiting Assignment</span>
             </div>
           </div>
           
           <div className="hidden md:flex bg-white p-2 rounded-xl">
             <FaQrcode className="text-6xl text-black" />
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <button 
            onClick={() => navigate('/user/bookings')}
            className="bg-hotel-gold hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <FaCar /> View My Bookings
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-transparent border border-white/20 hover:border-white/50 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <FaHome /> Return Home
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default TransportConfirmation;
