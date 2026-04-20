import mongoose from 'mongoose';

const TransportBookingSchema = new mongoose.Schema({
  userRef: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleType: {
    type: String,
    required: [true, 'Vehicle type is required (e.g. Luxury Sedan, SUV)']
  },
  pickupLocation: {
    type: String,
    required: [true, 'Pickup location is required']
  },
  dropoffLocation: {
    type: String,
    required: [true, 'Drop-off location is required']
  },
  date: {
    type: Date,
    required: [true, 'Date of transport is required']
  },
  passengers: {
    type: Number,
    required: [true, 'Number of passengers is required']
  },
  totalPrice: {
    type: Number,
    required: true
  },
  flightNumber: {
    type: String,
    required: false, // NOT REQUIRED: Allowed to be null or empty
    default: null
  },
  specialRequests: {
    type: String,
    required: false, // NOT REQUIRED: Allowed to be null
    default: null
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

const TransportBooking = mongoose.model('TransportBooking', TransportBookingSchema);
export default TransportBooking;
