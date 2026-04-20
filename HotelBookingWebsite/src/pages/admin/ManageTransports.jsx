import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCar, FaSearch, FaEllipsisV, FaCheck, FaTimes, FaUserTie } from 'react-icons/fa';

const ManageTransports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  
  const [bookings, setBookings] = useState([
    { id: 'TRN-89241', guest: 'Aarav Patel', vehicle: 'Mercedes-Benz S-Class', type: 'Luxury Sedan', route: 'LuxeStays -> JFK', date: '2026-10-24', time: '10:00 AM', status: 'Confirmed', price: 150 },
    { id: 'TRN-89242', guest: 'Sarah Smith', vehicle: 'Cadillac Escalade', type: 'Premium SUV', route: 'EWR -> LuxeStays', date: '2026-10-25', time: '14:30 PM', status: 'Pending', price: 220 },
    { id: 'TRN-89243', guest: 'Michael Johnson', vehicle: 'Ford Transit', type: 'Group Shuttle', route: 'LuxeStays -> City Tour', date: '2026-10-26', time: '09:00 AM', status: 'Completed', price: 180 },
    { id: 'TRN-89244', guest: 'Emma Williams', vehicle: 'Mercedes-Benz S-Class', type: 'Luxury Sedan', route: 'LGA -> LuxeStays', date: '2026-10-28', time: '18:15 PM', status: 'Cancelled', price: 150 },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Completed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.guest.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
             <FaCar className="text-hotel-gold" /> Transport Bookings
          </h1>
          <p className="text-gray-400 text-sm">Manage airport transfers, rentals, and shuttle requests.</p>
        </div>
        
        <div className="flex gap-4">
           <button className="bg-hotel-gold hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
             <FaUserTie /> Assign Drivers
           </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row justify-between gap-4 border border-white/5">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by ID or Guest Name..." 
            className="w-full bg-[#161925] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-hotel-gold focus:ring-1 focus:ring-hotel-gold transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === f ? 'bg-hotel-gold text-black' : 'bg-[#161925] text-gray-400 hover:text-white border border-white/5'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-panel rounded-xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#161925] border-b border-white/10 text-hotel-gold text-xs uppercase tracking-wider">
                <th className="p-4">Booking ID</th>
                <th className="p-4">Guest</th>
                <th className="p-4">Route</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredBookings.map((b, idx) => (
                  <motion.tr 
                    key={b.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-4 font-mono text-sm text-gray-300">{b.id}</td>
                    <td className="p-4 text-white font-medium">{b.guest}</td>
                    <td className="p-4 text-gray-400 text-sm max-w-[150px] truncate">{b.route}</td>
                    <td className="p-4 text-sm text-gray-300">
                      <div>{b.date}</div>
                      <div className="text-gray-500 text-xs">{b.time}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-300">
                      <div>{b.vehicle}</div>
                      <div className="text-hotel-gold text-xs">{b.type}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-bold text-white">₹{b.price}</td>
                    <td className="p-4 text-center">
                       <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {b.status === 'Pending' && (
                            <button onClick={() => handleStatusChange(b.id, 'Confirmed')} className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500/40 rounded-lg transition-colors" title="Confirm">
                               <FaCheck size={14} />
                            </button>
                          )}
                          {(b.status === 'Pending' || b.status === 'Confirmed') && (
                            <button onClick={() => handleStatusChange(b.id, 'Cancelled')} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg transition-colors" title="Cancel">
                               <FaTimes size={14} />
                            </button>
                          )}
                          <button className="p-2 bg-gray-500/20 text-gray-400 hover:bg-gray-500/40 hover:text-white rounded-lg transition-colors" title="More Options">
                             <FaEllipsisV size={14} />
                          </button>
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredBookings.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <FaCar className="text-4xl mx-auto mb-4 opacity-50" />
              <p>No transport bookings found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ManageTransports;
