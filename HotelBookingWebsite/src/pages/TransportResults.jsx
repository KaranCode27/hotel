import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaSuitcase, FaUsers, FaGasPump } from 'react-icons/fa';

const TransportResults = () => {
  const navigate = useNavigate();

  const vehicles = [
    {
      id: 1,
      name: 'Mercedes-Benz S-Class',
      type: 'Luxury Sedan',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1000',
      passengers: 3,
      luggage: 2,
      features: ['Leather Seats', 'Free Wi-Fi', 'Bottled Water'],
      price: 150,
      available: true
    },
    {
      id: 2,
      name: 'Cadillac Escalade',
      type: 'Premium SUV',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1000',
      passengers: 6,
      luggage: 5,
      features: ['Extra Legroom', 'Rear Entertainment', 'Tinted Windows'],
      price: 220,
      available: true
    },
    {
      id: 3,
      name: 'Ford Transit Executive',
      type: 'Group Shuttle',
      image: 'https://images.unsplash.com/photo-1629897048514-3dd7414bc7da?auto=format&fit=crop&q=80&w=1000',
      passengers: 12,
      luggage: 10,
      features: ['Air Conditioning', 'Aux Input', 'Child Seats Available'],
      price: 180,
      available: true
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8 min-h-screen">
      
      {/* Filters Sidebar */}
      <div className="w-full md:w-1/4 md:min-w-[300px]">
        <div className="glass-panel p-6 rounded-2xl sticky top-28">
          <h2 className="text-xl font-bold text-white mb-6">Filter options</h2>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-hotel-gold mb-3 uppercase tracking-wider">Vehicle Type</h3>
            {['Luxury Sedan', 'Premium SUV', 'Group Shuttle', 'Limousine'].map(type => (
              <label key={type} className="flex items-center mb-3 cursor-pointer">
                <input defaultChecked={['Luxury Sedan', 'Premium SUV'].includes(type)} type="checkbox" className="h-4 w-4 bg-black border-white/20 rounded focus:ring-hotel-gold text-hotel-gold mr-3" />
                <span className="text-gray-300 text-sm">{type}</span>
              </label>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-hotel-gold mb-3 uppercase tracking-wider">Passenger Capacity</h3>
            <input type="range" min="1" max="15" defaultValue="4" className="w-full accent-hotel-gold cursor-pointer mb-2" />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1</span>
              <span>15+</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-hotel-gold mb-3 uppercase tracking-wider">Included Amenities</h3>
            {['Child Seat', 'Wheelchair Accessible', 'Wi-Fi Included', 'Bottled Water'].map(amenity => (
              <label key={amenity} className="flex items-center mb-3 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 bg-black border-white/20 rounded focus:ring-hotel-gold text-hotel-gold mr-3" />
                <span className="text-gray-300 text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="w-full md:w-3/4">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Available Transports</h1>
          <p className="text-gray-400 text-sm">Showing available rides for your requested route.</p>
        </div>

        <div className="space-y-6">
          {vehicles.map((vehicle, idx) => (
            <motion.div 
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-4 rounded-2xl flex flex-col lg:flex-row gap-6 hover:border-hotel-gold/50 transition-colors"
            >
              <img src={vehicle.image} alt={vehicle.name} className="w-full lg:w-72 h-48 lg:h-auto object-cover rounded-xl" />
              
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-2xl font-bold text-white">{vehicle.name}</h3>
                        <p className="text-hotel-gold text-sm font-medium">{vehicle.type}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4 text-gray-300 text-sm">
                    <span className="flex items-center gap-2"><FaUsers className="text-hotel-gold" /> {vehicle.passengers} Seats</span>
                    <span className="flex items-center gap-2"><FaSuitcase className="text-hotel-gold" /> {vehicle.luggage} Bags</span>
                    <span className="flex items-center gap-2"><FaGasPump className="text-hotel-gold" /> Gas Included</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                     {vehicle.features.map(f => (
                       <span key={f} className="text-xs px-2 py-1 bg-white/5 rounded border border-white/10 text-gray-400">{f}</span>
                     ))}
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                  <div>
                    <p className="text-green-400 text-sm flex items-center gap-1">✓ Free cancellation up to 24h before</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">${vehicle.price}</p>
                    <p className="text-xs text-gray-500 mb-3">Total fixed price</p>
                    <button 
                      onClick={() => navigate(`/transport/book/${vehicle.id}`)}
                      className="bg-hotel-gold hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold transition-all text-sm"
                    >
                      Select Vehicle
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TransportResults;
