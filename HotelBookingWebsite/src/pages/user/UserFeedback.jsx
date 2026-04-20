import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const UserFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Rate Your Stay</h1>
        <p className="text-gray-400 mt-2">Your feedback helps us continuously elevate the LuxeStays standard.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-8 rounded-2xl">
        <div className="mb-8 p-4 bg-[#161925] rounded-xl flex items-center gap-4 border border-white/5">
          <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=150" alt="Hotel" className="w-16 h-16 rounded-lg object-cover" />
          <div>
            <h3 className="text-white font-medium">Oceanview Superior Resort</h3>
            <p className="text-gray-400 text-sm">Stay: Oct 12 - Oct 15, 2026</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-gray-300 mb-4 uppercase tracking-widest">Overall Experience</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar 
                  key={star}
                  className={`text-4xl cursor-pointer transition-colors ${
                    star <= (hoverRating || rating) ? 'text-hotel-gold' : 'text-gray-600'
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            {rating > 0 && <p className="text-hotel-gold text-sm mt-3 font-medium">You selected {rating} out of 5 stars!</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tell us more about your experience</label>
            <textarea 
              rows="6" 
              className="glass-input w-full resize-none" 
              placeholder="What did you love? Was there anything we could have done better?"
            ></textarea>
          </div>

          <div className="pt-4">
            <button type="button" className="btn-primary w-full py-4 text-lg">Submit Feedback</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserFeedback;
