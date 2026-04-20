import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaPlane, FaCreditCard } from 'react-icons/fa';

const TransportBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    flightNumber: '',
    specialRequests: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call for booking transport
    setTimeout(() => {
      navigate('/transport/confirmation');
    }, 1000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* Form Area */}
      <div className="w-full lg:w-2/3">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6 sm:p-8 rounded-3xl"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Transport Booking Details</h2>
          <p className="text-gray-400 text-sm mb-8">Please provide your contact and travel information to secure your ride.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <h3 className="text-lg font-bold text-hotel-gold mb-4 border-b border-white/10 pb-2">Passenger Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" required className="w-full bg-[#161925] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:ring-1 focus:ring-hotel-gold focus:border-hotel-gold" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" required className="w-full bg-[#161925] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:ring-1 focus:ring-hotel-gold focus:border-hotel-gold" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="email" required className="w-full bg-[#161925] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:ring-1 focus:ring-hotel-gold focus:border-hotel-gold" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="tel" required className="w-full bg-[#161925] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:ring-1 focus:ring-hotel-gold focus:border-hotel-gold" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-hotel-gold mb-4 border-b border-white/10 pb-2 mt-8">Travel Details (Optional)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Flight Number (If Airport Transfer)</label>
                  <div className="relative">
                    <FaPlane className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" placeholder="e.g. DL1234" className="w-full bg-[#161925] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:ring-1 focus:ring-hotel-gold focus:border-hotel-gold" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Special Requests</label>
                  <textarea rows="3" placeholder="Do you need a child seat or extra luggage space?" className="w-full bg-[#161925] border border-white/10 rounded-lg py-2 px-4 text-white focus:ring-1 focus:ring-hotel-gold focus:border-hotel-gold"></textarea>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-hotel-gold mb-4 border-b border-white/10 pb-2 mt-8">Payment Method</h3>
              <div className="bg-[#161925] border border-hotel-gold/30 rounded-lg p-4 flex items-center gap-4">
                 <FaCreditCard className="text-2xl text-gray-400" />
                 <div>
                   <p className="text-white font-medium">Use Saved Card</p>
                   <p className="text-sm text-gray-500">•••• •••• •••• 4242</p>
                 </div>
                 <div className="ml-auto">
                    <input type="radio" checked readOnly className="accent-hotel-gold w-4 h-4" />
                 </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-hotel-gold hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition-all text-lg mt-8">
              Confirm & Book Transport
            </button>

          </form>
        </motion.div>
      </div>

      {/* Summary Area */}
      <div className="w-full lg:w-1/3">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6 rounded-3xl sticky top-28"
        >
          <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1000" alt="Vehicle" className="w-full h-48 object-cover rounded-xl mb-4" />
          <h3 className="text-xl font-bold text-white mb-1">Mercedes-Benz S-Class</h3>
          <p className="text-gray-400 text-sm mb-4 border-b border-white/10 pb-4">Luxury Sedan</p>
          
          <div className="space-y-3 text-sm mb-6 border-b border-white/10 pb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Pickup</span>
              <span className="text-white text-right">LuxeStays Grand Hotel</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Drop-off</span>
              <span className="text-white text-right">International Airport (JFK)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date & Time</span>
              <span className="text-white text-right">Oct 24, 2026 - 10:00 AM</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-white">Total Amount</span>
            <span className="text-hotel-gold">$150.00</span>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right">Taxes & fees included</p>

        </motion.div>
      </div>

    </div>
  );
};

export default TransportBooking;
