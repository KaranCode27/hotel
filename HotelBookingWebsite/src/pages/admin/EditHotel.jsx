import React from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const EditHotel = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // In a real app we'd fetch this data. We will mock it here.
  const mockHotel = {
    name: 'Oceanview Superior Resort',
    location: 'Maldives',
    description: 'Experience the pinnacle of tropical luxury at the Oceanview Superior Resort. Suspended over the crystal-clear waters of the Maldives...',
    rating: '5 Stars',
    price: 850,
    status: 'Active'
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <button onClick={() => navigate('/admin/hotels')} className="flex items-center text-gray-400 hover:text-white transition-colors mb-6 text-sm">
        <FaArrowLeft className="mr-2" /> Back to Hotel List
      </button>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Property <span className="text-hotel-gold text-xl block sm:inline mt-1 sm:mt-0 sm:ml-2">#{id || '102'}</span></h1>
          <p className="text-gray-400 mt-1">Make modifications to your existing listings.</p>
        </div>
        <button className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors font-medium px-4 py-2 rounded-lg text-sm border border-red-500/30">
          Delete Listing
        </button>
      </div>

      <div className="glass-panel p-8 rounded-2xl border-t-4 border-hotel-gold">
        <form className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Hotel Name</label>
              <input type="text" className="glass-input w-full" defaultValue={mockHotel.name} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location/City</label>
              <input type="text" className="glass-input w-full" defaultValue={mockHotel.location} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Hotel Description</label>
            <textarea rows="4" className="glass-input w-full resize-none" defaultValue={mockHotel.description}></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Star Rating</label>
              <select className="glass-input w-full bg-[#161925]" defaultValue={mockHotel.rating}>
                <option>5 Stars</option>
                <option>4 Stars</option>
                <option>3 Stars</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Base Nightly Price (₹)</label>
              <input type="number" className="glass-input w-full" defaultValue={mockHotel.price} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Inventory Status</label>
              <select className="glass-input w-full bg-[#161925]" defaultValue={mockHotel.status}>
                <option>Active</option>
                <option>Maintenance (Hidden)</option>
                <option>Coming Soon</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Replace Hero Image</label>
            <div className="w-full border-2 border-dashed border-white/20 rounded-xl overflow-hidden relative group cursor-pointer h-48">
               <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1000" alt="Current Setup" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
               <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaUpload className="text-3xl text-white mb-2" />
                  <p className="text-white font-bold">Replace Image</p>
               </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex justify-end gap-4">
             <button type="button" onClick={() => navigate('/admin/hotels')} className="px-6 py-2 rounded-lg text-white font-medium hover:bg-white/5 transition-colors border border-white/20">Discard Changes</button>
             <button type="button" className="btn-primary px-8">Save Updates</button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EditHotel;
