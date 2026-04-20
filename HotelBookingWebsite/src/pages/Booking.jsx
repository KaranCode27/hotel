import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import { useGetHotelDetailsQuery } from '../slices/hotelsApiSlice';
import { useGetHotelRoomsQuery } from '../slices/roomsApiSlice';

const Booking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  
  // Initialize to plausible default future dates
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 4);

  const [checkInDate, setCheckInDate] = useState(tomorrow.toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(nextWeek.toISOString().split('T')[0]);

  const { data: hotel, isLoading: isHotelLoading } = useGetHotelDetailsQuery(id);
  const { data: roomsData, isLoading: isRoomsLoading } = useGetHotelRoomsQuery(id);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (isHotelLoading || isRoomsLoading) {
    return <div className="text-white text-center py-20 text-2xl">Loading booking details...</div>;
  }

  const room = roomsData?.data?.[0] || {};
  const pricePerNight = room.price || hotel?.pricePerNight || 0;
  
  // Dynamically calculate nights
  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };
  const nights = calculateNights();
  
  const basePrice = pricePerNight * nights;
  const tax = basePrice * 0.1;
  const totalPrice = basePrice + tax;

  const handleConfirm = () => {
    const bookingPayload = {
      hotelRef: id,
      roomRef: room._id,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      guestCount: 2,
      totalPrice: totalPrice,
      paymentMethod,
    };
    navigate('/payment', { state: { bookingPayload } });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Complete your booking</h1>
        <p className="text-gray-400 mt-2">Just a few more details to confirm your stay.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="w-full lg:w-2/3 space-y-8">
          
          <div className="glass-panel p-6 sm:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Stay Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Check-in Date</label>
                <input 
                  type="date" 
                  value={checkInDate} 
                  onChange={(e) => setCheckInDate(e.target.value)} 
                  className="glass-input w-full text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Check-out Date</label>
                <input 
                  type="date" 
                  value={checkOutDate} 
                  onChange={(e) => setCheckOutDate(e.target.value)} 
                  min={checkInDate}
                  className="glass-input w-full text-white" 
                />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Guest Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                <div className="relative">
                  <FaUser className="absolute top-4 left-4 text-gray-500" />
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="glass-input w-full !pl-11" placeholder="First Name" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                <div className="relative">
                  <FaUser className="absolute top-4 left-4 text-gray-500" />
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="glass-input w-full !pl-11" placeholder="Last Name" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute top-4 left-4 text-gray-500" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="glass-input w-full !pl-11" placeholder="john@gmail.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute top-4 left-4 text-gray-500" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="glass-input w-full !pl-11" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Special Requests (Optional)</label>
              <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="3" className="glass-input w-full resize-none" placeholder="Any dietary requirements, arrival time, or special needs?"></textarea>
            </div>
          </div>

          {/* Payment Section embedded physically inside Booking flow for UX */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-hotel-gold/30 relative">
            <div className="absolute top-6 right-6 text-green-400 flex items-center text-sm">
               <FaShieldAlt className="mr-1" /> Secure Encrypted
            </div>
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Payment Method</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 mb-4">
                <div 
                  onClick={() => setPaymentMethod('creditCard')}
                  className={`flex-1 p-4 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                    paymentMethod === 'creditCard' 
                      ? 'bg-white/5 border border-hotel-gold' 
                      : 'bg-black/40 border border-white/10 opacity-50 hover:opacity-100'
                  }`}
                >
                  <span className="text-white font-bold tracking-widest">Credit Card</span>
                </div>
                <div 
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex-1 p-4 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                    paymentMethod === 'paypal' 
                      ? 'bg-white/5 border border-hotel-gold' 
                      : 'bg-black/40 border border-white/10 opacity-50 hover:opacity-100'
                  }`}
                >
                  <span className="text-white font-bold">PayPal</span>
                </div>
              </div>

              {paymentMethod === 'creditCard' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 block">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name on Card</label>
                    <input type="text" className="glass-input w-full" placeholder="Aarav Patel" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Card Number</label>
                    <input type="text" className="glass-input w-full font-mono tracking-widest" placeholder="0000 0000 0000 0000" />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Expiry Date</label>
                      <input type="text" className="glass-input w-full font-mono" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">CVC</label>
                      <input type="text" className="glass-input w-full font-mono" placeholder="123" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center bg-black/20 rounded-xl border border-white/5">
                  <p className="text-gray-300">You will be securely redirected to PayPal to complete your purchase after clicking "Confirm & Pay".</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Details */}
        <div className="w-full lg:w-1/3">
          <div className="glass-panel p-6 rounded-2xl sticky top-28 bg-[#161925]">
            <h2 className="text-lg font-bold text-white mb-4">Booking Summary</h2>
            
            <div className="mb-6 flex gap-4">
              <img src={hotel?.images?.[0] || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=300'} alt="Room" className="w-20 h-20 rounded-lg object-cover" />
              <div>
                <h3 className="text-white font-medium">{hotel?.name || 'Loading...'}</h3>
                <p className="text-xs text-hotel-gold mt-1">{room?.type || 'Standard Room'}</p>
                <p className="text-xs text-gray-400">{hotel?.location}</p>
              </div>
            </div>

            <div className="border-t border-b border-white/10 py-4 mb-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Check-in</span>
                <span className="text-white font-medium">{checkInDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Check-out</span>
                <span className="text-white font-medium">{checkOutDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Length of stay</span>
                <span className="text-white font-medium">{nights} Night{nights > 1 && 's'}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                 <span className="text-gray-400">₹{pricePerNight.toFixed(2)} x {nights} nights</span>
                 <span className="text-white">₹{basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                 <span className="text-gray-400">Taxes & Fees (10%)</span>
                 <span className="text-white">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-4 mt-2">
                 <span className="text-white font-bold text-lg">Total Price</span>
                 <span className="text-hotel-gold font-bold text-2xl">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleConfirm} className="w-full btn-primary group">
               Confirm & Pay 
               <FaArrowRight className="group-hover:translate-x-1 transition-transform ml-2 inline-block" />
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">By clicking Confirm & Pay, you agree to the Terms of Service.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
