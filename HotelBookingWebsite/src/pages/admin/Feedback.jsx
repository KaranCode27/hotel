import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const Feedback = () => {
  const reviews = [
    { guest: 'John Smith', rating: 5, comment: 'Absolutely stunning! The infinity pool was the highlight of our trip.', date: '2 days ago', property: 'Oceanview Resort' },
    { guest: 'Emma Watson', rating: 4, comment: 'Great service, but the wifi in the room was a bit spotty.', date: '5 days ago', property: 'Mountain Retreat' },
    { guest: 'Bruce Wayne', rating: 5, comment: 'Exceptional privacy and luxury. Will return.', date: '1 week ago', property: 'Grand Plaza Hotel' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Guest Feedback</h1>
        <p className="text-gray-400 mt-1">Review ratings and manage public testimonials.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-[#161925] p-4 rounded-xl text-center min-w-[120px]">
              <div className="text-3xl font-bold text-white mb-1 flex justify-center items-center gap-1">
                {review.rating} <FaStar className="text-hotel-gold text-xl" />
              </div>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">{review.guest}</h3>
                  <p className="text-xs text-hotel-gold">{review.property}</p>
                </div>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-300 italic">"{review.comment}"</p>
              
              <div className="mt-4 flex gap-3">
                <button className="text-xs border border-white/20 text-gray-300 hover:bg-white/10 px-3 py-1.5 rounded-md transition-colors">Publish to Site</button>
                <button className="text-xs border border-red-500/30 text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-md transition-colors">Hide</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Feedback;
