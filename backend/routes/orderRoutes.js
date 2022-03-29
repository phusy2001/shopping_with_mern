import express from 'express'
const router = express.Router()
import {
    addOrderItems,
    getOrderByID,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
    deleteOrder
} from '../controllers/orderController.js'
import {
    protect,
    admin
} from '../middleware/authMiddleware.js'

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders)
router.route('/my_orders').get(protect, getMyOrders)
router.route('/:id')
    .get(protect, getOrderByID)
    .delete(protect, deleteOrder)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
export default router