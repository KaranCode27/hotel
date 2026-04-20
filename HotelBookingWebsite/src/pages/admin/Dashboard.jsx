import React from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaBed, FaUsers, FaArrowUp, FaArrowDown, FaSpinner } from 'react-icons/fa';
import { useGetBookingsQuery } from '../../slices/bookingsApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';

const StatCard = ({ title, value, icon: Icon, trend, isPositive }) => (
  <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
      </div>
      <div className="p-3 bg-hotel-gold/10 rounded-xl">
        <Icon className="text-hotel-gold text-xl" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <FaArrowUp className="mr-1 text-xs" /> : <FaArrowDown className="mr-1 text-xs" />}
        {trend}
      </span>
      <span className="text-gray-500 ml-2">vs last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  const { data: bookingsResponse, isLoading: isLoadingBookings } = useGetBookingsQuery();
  const { data: usersResponse, isLoading: isLoadingUsers } = useGetUsersQuery();

  const bookings = bookingsResponse?.data || [];
  const users = usersResponse?.data || [];

  const totalRevenue = bookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);
  const activeBookings = bookings.filter(b => (b.status || '').toLowerCase() === 'confirmed').length;
  const totalGuests = users.length;
  const recentBookings = [...bookings].reverse().slice(0, 4);

  if (isLoadingBookings || isLoadingUsers) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-gray-400">
        <FaSpinner className="animate-spin text-4xl text-hotel-gold mb-4" />
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Welcome back. Here is what is happening with your properties today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={FaMoneyBillWave} trend="+12.5%" isPositive={true} />
        <StatCard title="Active Bookings" value={activeBookings} icon={FaBed} trend="+5.2%" isPositive={true} />
        <StatCard title="Total Guests" value={totalGuests} icon={FaUsers} trend="-1.4%" isPositive={false} />
      </div>

      <div className="glass-panel p-6 rounded-2xl mb-8">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-lg font-semibold text-white">Revenue Analytics</h3>
           <select className="bg-black/30 text-xs text-hotel-gold border border-hotel-gold/30 rounded p-1">
             <option>This Year</option>
             <option>Last Year</option>
           </select>
        </div>
        <div className="h-64 flex items-end gap-2 sm:gap-4 md:gap-8 justify-between pt-10 border-b border-white/10 pb-4 relative">
          {/* Y Axis Mock */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pb-4">
             <span>₹1.5Cr</span>
             <span>₹1Cr</span>
             <span>₹50L</span>
             <span>₹0</span>
          </div>
          <div className="w-8"></div> {/* Spacer for Y axis */}
          
          {[
             { m: 'Jan', h: '40%' }, { m: 'Feb', h: '55%' }, { m: 'Mar', h: '70%' },
             { m: 'Apr', h: '65%' }, { m: 'May', h: '85%' }, { m: 'Jun', h: '100%'},
             { m: 'Jul', h: '90%' }, { m: 'Aug', h: '80%' }, { m: 'Sep', h: '60%' },
             { m: 'Oct', h: '75%' }, { m: 'Nov', h: '50%' }, { m: 'Dec', h: '95%' }
          ].map((bar, i) => (
             <div key={i} className="flex-1 flex flex-col items-center group relative">
                {/* Tooltip */}
                <div className="absolute -top-10 bg-hotel-gold text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {bar.h} Rev
                </div>
                {/* Bar */}
                <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: bar.h }}
                   transition={{ duration: 1, delay: i * 0.05 }}
                   className="w-full bg-hotel-gold/80 hover:bg-hotel-gold rounded-t-md transition-colors"
                ></motion.div>
                <span className="text-xs text-gray-400 mt-2">{bar.m}</span>
             </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="pb-3 font-medium">Guest</th>
                  <th className="pb-3 font-medium">Property</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentBookings.map((booking, idx) => (
                  <tr key={idx}>
                    <td className="py-4 text-gray-200">{booking.userRef?.name || 'Guest'}</td>
                    <td className="py-4 text-gray-400">{booking.hotelRef?.name || 'Hotel'}</td>
                    <td className="py-4 font-medium text-white">₹{booking.totalPrice?.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        (booking.status || '').toLowerCase() === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                        (booking.status || '').toLowerCase() === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {booking.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="text-lg font-semibold text-white mb-4 w-full text-left">Occupancy Rate</h3>
          {/* Mock Chart Area */}
          <div className="w-48 h-48 rounded-full border-8 border-hotel-gold/20 relative flex items-center justify-center">
             <div className="absolute inset-0 rounded-full border-8 border-hotel-gold" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0)', transform: 'rotate(45deg)'}}></div>
             <div className="text-center">
               <span className="text-4xl font-bold text-white">78%</span>
               <p className="text-xs text-gray-400 mt-1">Overall</p>
             </div>
          </div>
          <p className="text-gray-400 text-sm mt-6 text-center">Your properties are performing 12% better than regional competitors this week.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
