const Product = require('../models/productModels')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncErrors')
const apiFeatures = require('../utils/apiFeatures')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const cloudinary = require('cloudinary')

//Create product
const createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = []

  if (typeof req.body.images === "string") {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  const imagesLinks = []

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    })

    imagesLinks.push({
      publicId: result.public_id,
      url: result.secure_url,
    })
  }

  req.body.images = imagesLinks
  req.body.user = req.user.id

  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    product,
  })
})

//Get all products
const getAllProducts = catchAsyncError(async(req,res,next) => {
  const resultPerPage = 4
  const apiFeature = new apiFeatures(Product.find(), req.query)
  .search()
  .filter()
  .pagination(resultPerPage)
  
  let products = await apiFeature.query
  filteredProductCount = products.length

  res.status(200).json({
    success: true,
    products,
    resultPerPage,
    filteredProductCount,
  })
})

// Get all Products (Admin)
const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find()
  res.status(200).json({
	  success: true,
    products,
  })
})

//Update products
const updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404))
    }
  
    // Images Start Here
    let images = []
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images)
    } else {
      images = req.body.images
    }
  
    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].publicId)
      }
  
      const imagesLinks = []
  
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        })
  
        imagesLinks.push({
          publicId: result.public_id,
          url: result.secure_url,
        })
      }
  
      req.body.images = imagesLinks
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
  
    res.status(200).json({
      success: true,
      product,
    })
})

//Delete product
const deleteProduct = catchAsyncError(async(req,res,next) => {
    let deleteProduct = await Product.findById(req.params.id)
    if(deleteProduct==null)
        return next( new ErrorHandler("Product not found" , 404))
    else
    for(let i=0 ; i<deleteProduct.images.length; i++)   {
        await cloudinary.v2.uploader.destroy(deleteProduct.images[i].publicId)
    }
        await deleteProduct.remove()
        res.status(200).json({
        status:true,
        message:'Product deleted'
    })
})

const productDetails = catchAsyncError(async(req,res,next) => {
    let product = await Product.findById(req.params.id)
    if(!product)  {
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        product,
    })
})

// Create new review or update review
const createProductReview = catchAsyncErrors(async (req,res,next)=>{
    const {rating , comment , productId} = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(
        (rev)=>rev.user.toString() === req.user._id.toString() )
    if(isReviewed)  {
        product.reviews.forEach((rev)=>{
            if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating) , (rev.comment = comment)
        })
    }
    else {
        product.reviews.push(review)
        product.numofReviews = product.reviews.length
    }       
    let avg=0
    product.reviews.forEach(rev=>{
        avg+=rev.rating
    })
    product.avgRating = avg/product.reviews.length
    await product.save({ validateBeforeSave: false })
    res.status(200).json({
        success:true,
        review
    })
})

//Get all reviews of Product
const productAllreviews = catchAsyncErrors(async(req,res,next)=> {
    const product = await Product.findById(req.query.productId)
    if(!product)
    return next(new ErrorHandler('Product not found', 404))
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

//Delete reviews
const deleteReview = catchAsyncErrors(async(req,res,next)=> {
    const product = await Product.findById(req.query.productId)
    if(!product)
    return next(new ErrorHandler('Product not found', 404))
    const reviews = product.reviews.filter(
        (rev)=> rev._id.toString() !== req.query.reviewId.toString())
    let avg=0
    reviews.forEach(
        (rev)=>{
            avg+=rev.rating
        })       
    const avgRating = avg/reviews.length
    const numofReviews = reviews.length
    await Product.findByIdAndUpdate( 
        req.query.productId, {
            avgRating,
            reviews,
            numofReviews,
        },
        {
            new:true,
            runValidators:true,
            useFindAndModify:false,
        })
        res.status(200).json({
            success:true,
            message: 'Review deleted'
        })   
})    

module.exports = [ getAllProducts , getAdminProducts , createProductReview , createProduct ,  productAllreviews , deleteReview , productDetails , updateProduct , deleteProduct ]