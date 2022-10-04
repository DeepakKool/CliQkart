const mongo = require('mongoose')

const productSchema = mongo.Schema({
    name:{
        type : String ,
        required : [true,"Please enter product name"]
    },
    description:{
        type : String ,
        required : [true,"Please enter description"]
    },
    price:{
        type: Number ,
        required : [true,"Please enter price"]
    },
    avgRating:{
        type: Number,
        default: 0
    },
    images:[{
        publicId:{type:String,required:true},
        url:{type:String,required:true}
    }],
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required: [true, "Please enter stock" ],
        maxLength: [10, "Stock cannot excced 10"]
    },
    numofReviews:{
        type: Number,
        default: 0
    },
    reviews:[{        
        user:{
            type: mongo.Schema.ObjectId,
            ref: 'user',
            required: true,
        },
        name:{
            type:String,
        },
        rating:{
            type:Number,
            default: 0
        },
        comment:{
            type:String,
        }    
    }],
    user:{
        type: mongo.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})
module.exports = mongo.model('Product',productSchema)















