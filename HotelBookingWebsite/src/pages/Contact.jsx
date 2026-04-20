import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in <span className="text-hotel-gold italic">Touch.</span></h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-400">
          Our global concierge team is available 24/7. Whether you have an inquiry about a reservation, partnership, or general support, we are here for you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1 space-y-8"
        >
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="flex items-start mb-6">
              <div className="p-3 bg-hotel-gold/10 rounded-lg mr-4 text-hotel-gold">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Toll Free 24/7</p>
                <p className="text-white font-medium">+1 (800) 123-LUXE</p>
              </div>
            </div>

            <div className="flex items-start mb-6">
              <div className="p-3 bg-hotel-gold/10 rounded-lg mr-4 text-hotel-gold">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Email Support</p>
                <p className="text-white font-medium">concierge@luxestays.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 bg-hotel-gold/10 rounded-lg mr-4 text-hotel-gold">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Headquarters</p>
                <p className="text-white font-medium">450 Luxury Ave, Suite 90<br/>New York, NY 10022</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-8 md:p-10 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                <input type="text" className="glass-input w-full" placeholder="First Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                <input type="text" className="glass-input w-full" placeholder="Last Name" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <input type="email" className="glass-input w-full" placeholder="john@gmail.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
              <select className="glass-input w-full bg-[#161925] [&>option]:bg-[#161925]">
                <option>General Inquiry</option>
                <option>Booking Modification</option>
                <option>Cancellation/Refund</option>
                <option>Partnership/Corporate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea rows="5" className="glass-input w-full resize-none" placeholder="How can we help you today?"></textarea>
            </div>

            <button type="button" className="btn-primary w-full md:w-auto px-10">Send Message</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
