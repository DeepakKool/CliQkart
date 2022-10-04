const Order = require('../models/orderModel')
const Product = require('../models/productModels')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

//Create new order
const newOrder = catchAsyncErrors(async(req,res,next)=> {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    })
    res.status(201).json({
        success:true,
        order
    })  
})

// Get single order    
const getSingleOrder = catchAsyncErrors( async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if(!order)
    return next(new ErrorHandler('Order not found', 404))
    res.status(200).json({
        success:true,
        order,
    })
})

//User order
const myOrders = catchAsyncErrors( async(req,res,next)=>{
    const orders = await Order.find({user : req.user._id})
    if(!orders)
    return next(new ErrorHandler('Order not found',404))
    res.status(200).json({
        success:true,
        orders,
    })
}) 

//Admin all orders
const allOrders = catchAsyncErrors( async(req,res,next)=>{
    const orders = await Order.find()
    res.status(200).json({
        success:true,
        orders,
    })
})

// update Order Status -- Admin
const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404))
    }
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHander("You have already delivered this order", 400))
    }
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity)
      })
    }
    order.orderStatus = req.body.status
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now()
    }
  
    await order.save({ validateBeforeSave: false })
    res.status(200).json({
      success: true,
    })
  })

async function updateStock (id,quantity) {
  const product = await Product.findById(id)
  product.stock-= quantity
  product.save({validateBeforeSave:false})
}

const deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order)
    return next(new ErrorHandler('Order not found',404))
    await order.remove()
    res.status(200).json({
        success:true,
        message:'Order deleted'
    })
})


module.exports = [ newOrder , getSingleOrder , myOrders , allOrders , updateOrder , deleteOrder ]





