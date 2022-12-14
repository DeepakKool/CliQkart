const mongo = require('mongoose')

const orderSchema = new mongo.Schema({
    shippingInfo: {
        address: { type:String , required:true },
        city: { type:String , required:true },
        state: { type:String , required:true },
        country: { type:String , required:true, default:'India' },
        pincode: { type:Number, required:true },
        phoneNo: { type:Number, reuired:true }
    },
    orderItems: [{
        name: { type:String , required:true },
        price: { type:Number , required:true },
        quantity: { type:Number , required:true }, 
        image: { type:String , required:true },
        product: { type:mongo.Schema.ObjectId, ref:'Product', required:true }
    }],
    user: { type: mongo.Schema.ObjectId, ref: 'User', required: true },

    paymentInfo: { id: { type:String , required:true },
                   status: { type:String , required:true}  },
    paidAt: { type:Date , required:true },
    itemPrice: { type:Number , default:0, required:true },
    taxPrice: { type:Number , default:0, required:true },
    shippingPrice: { type:Number , default:0, required:true },
    totalPrice: { type:Number , default:0, required:true },
    orderStatus: { type:String , required:true , default:'Processing' },
    deleveredAt: Date,
    createdAt:  { type:Date , default:Date.now }
})

module.exports = mongo.model('Order', orderSchema)