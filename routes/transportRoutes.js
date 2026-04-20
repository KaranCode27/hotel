import express from 'express';
import {
  createTransport,
  getMyTransports,
  getAllTransports,
  getTransportById,
  updateTransportStatus,
  deleteTransport
} from '../controllers/transportController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/my')
  .get(protect, getMyTransports);

router.route('/')
  .post(protect, createTransport)
  .get(protect, admin, getAllTransports);

router.route('/:id')
  .get(protect, getTransportById)
  .delete(protect, admin, deleteTransport);

router.route('/:id/status')
  .put(protect, admin, updateTransportStatus);

export default router;
