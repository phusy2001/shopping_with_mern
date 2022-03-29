import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST/api/orders
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items found')
        return
    }
    else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createOrder = await order.save()

        res.status(201).json(createOrder)
    }
})

// @desc Get order by ID
// @route GET/api/orders/:id
// @access Private
export const getOrderByID = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if (order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc Update order to paid
// @route PUT/api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }

        const updateOrder = await order.save()

        res.json(updateOrder)
    }
    else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc Get logged in user orders
// @route GET/api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)

})

// @desc Get all orders
// @route GET/api/orders
// @access Private/ADMIN
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)

})

// @desc Update order to delivered
// @route PUT/api/orders/:id/deliver
// @access Private/ADMIN
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updateOrder = await order.save()

        res.json(updateOrder)
    }
    else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc Delete order 
// @route DELETE/api/orders/:id
// @access Private
export const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        await order.remove()
        res.json({ message: 'Order removed' })
    }
    else {
        res.status(404)
        throw new Error('Order not found')
    }
})