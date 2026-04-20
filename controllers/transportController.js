import TransportBooking from '../models/TransportBooking.js';

// @desc    Book a transport
// @route   POST /api/v1/transports
// @access  Private
export const createTransport = async (req, res) => {
  try {
    req.body.userRef = req.user._id;

    const transport = await TransportBooking.create(req.body);

    res.status(201).json({
      success: true,
      data: transport
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get logged in user transports
// @route   GET /api/v1/transports/my
// @access  Private
export const getMyTransports = async (req, res) => {
  try {
    const transports = await TransportBooking.find({ userRef: req.user._id })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: transports.length,
      data: transports
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all transport bookings
// @route   GET /api/v1/transports
// @access  Private/Admin
export const getAllTransports = async (req, res) => {
  try {
    let query = TransportBooking.find().populate('userRef', 'firstName lastName email');
    
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    const transports = await query;

    res.status(200).json({
      success: true,
      count: transports.length,
      data: transports
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get transport by ID
// @route   GET /api/v1/transports/:id
// @access  Private
export const getTransportById = async (req, res) => {
  try {
    const transport = await TransportBooking.findById(req.params.id)
      .populate('userRef', 'firstName lastName email');

    if (!transport) {
      return res.status(404).json({ message: 'Transport booking not found' });
    }

    if (transport.userRef._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.status(200).json({
      success: true,
      data: transport
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update transport status
// @route   PUT /api/v1/transports/:id/status
// @access  Private/Admin
export const updateTransportStatus = async (req, res) => {
  try {
    const transport = await TransportBooking.findById(req.params.id);

    if (!transport) {
      return res.status(404).json({ message: 'Transport not found' });
    }

    transport.status = req.body.status || transport.status;
    await transport.save();

    res.status(200).json({
      success: true,
      data: transport
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete transport booking
// @route   DELETE /api/v1/transports/:id
// @access  Private/Admin
export const deleteTransport = async (req, res) => {
  try {
    const transport = await TransportBooking.findById(req.params.id);

    if (!transport) {
      return res.status(404).json({ message: 'Transport not found' });
    }

    await transport.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
