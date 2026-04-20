import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaSearch, FaPlaneArrival } from 'react-icons/fa';

const TransportSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    passengers: 1,
    type: 'any'
  });

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/transport/results');
  };

  return (
    <div className="min-h-screen bg-hotel-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Premium <span className="text-hotel-gold">Transport</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Arrive in style. Book seamless airport transfers, private drivers, or luxury rentals directly aligning with your stay.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-6 sm:p-10 rounded-3xl max-w-4xl mx-auto border border-white/10 relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-hotel-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

          <form onSubmit={handleSearch} className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              <div className="relative">
                <label className="block text-sm font-semibold text-hotel-gold mb-2 uppercase tracking-wider">Pickup Location</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Airport or Hotel Name"
                    className="w-full bg-[#161925] text-white border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-hotel-gold focus:ring-1 focus:ring-hotel-gold transition-colors"
                    value={searchParams.pickup}
                    onChange={(e) => setSearchParams({...searchParams, pickup: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-hotel-gold mb-2 uppercase tracking-wider">Drop-off Location</label>
                <div className="relative">
                  <FaPlaneArrival className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Destination"
                    className="w-full bg-[#161925] text-white border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-hotel-gold focus:ring-1 focus:ring-hotel-gold transition-colors"
                    value={searchParams.dropoff}
                    onChange={(e) => setSearchParams({...searchParams, dropoff: e.target.value})}
                    required
                  />
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              <div className="relative">
                <label className="block text-sm font-semibold text-hotel-gold mb-2 uppercase tracking-wider">Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="date" 
                    className="w-full bg-[#161925] text-white border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-hotel-gold focus:ring-1 focus:ring-hotel-gold transition-colors appearance-none"
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-hotel-gold mb-2 uppercase tracking-wider">Passengers</label>
                <div className="relative">
                   <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   <select 
                      className="w-full bg-[#161925] text-white border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-hotel-gold focus:ring-1 focus:ring-hotel-gold transition-colors appearance-none"
                      value={searchParams.passengers}
                      onChange={(e) => setSearchParams({...searchParams, passengers: parseInt(e.target.value)})}
                   >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                   </select>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-hotel-gold mb-2 uppercase tracking-wider">Vehicle</label>
                <div className="relative">
                   <FaCar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   <select 
                      className="w-full bg-[#161925] text-white border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-hotel-gold focus:ring-1 focus:ring-hotel-gold transition-colors appearance-none"
                      value={searchParams.type}
                      onChange={(e) => setSearchParams({...searchParams, type: e.target.value})}
                   >
                      <option value="any">Any Type</option>
                      <option value="luxury">Luxury Sedan</option>
                      <option value="suv">Premium SUV</option>
                      <option value="shuttle">Group Shuttle</option>
                   </select>
                </div>
              </div>

            </div>

            <button 
              type="submit"
              className="w-full bg-hotel-gold hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 text-lg hover:shadow-[0_0_20px_rgba(201,168,111,0.3)]"
            >
              <FaSearch /> Search Availability
            </button>
          </form>
        </motion.div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
           {[
             { title: 'Chauffeur Driven', desc: 'Professional, vetted drivers ensuring a safe and comfortable journey.', icon: <FaCar className="text-3xl text-hotel-gold mb-4" /> },
             { title: 'Flight Tracking', desc: 'We track your flight in real-time to adjust for early arrivals or delays.', icon: <FaPlaneArrival className="text-3xl text-hotel-gold mb-4" /> },
             { title: 'Zero Hidden Fees', desc: 'Taxes, tolls, and gratuities are all included in your transparent quote.', icon: <FaUsers className="text-3xl text-hotel-gold mb-4" /> }
           ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                className="text-center p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-hotel-gold/30 transition-colors"
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-white font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default TransportSearch;
