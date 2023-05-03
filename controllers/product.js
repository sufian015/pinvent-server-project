const asyncHandler=require("express-async-handler");

const Product=require("../models/product");

// create product

const createProduct=asyncHandler(async (req,res)=>{


     const { name, sku, category, quantity, price, description } = req.body;

  //   Validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }




   // Handle Image upload

   let fileData = {};
   if (req.file) {    
 
     fileData = {
       fileName: req.file.originalname,
       filePath: req.file.path,
       fileType: req.file.mimetype,
       fileSize: req.file.size
     };
   }



   const product = await Product.create({
     user: req.user.id,
     name,
     sku,
     category,
     quantity,
     price,
     description,
     image: fileData,
   });
 
   res.status(201).json(product);
 
   

});

//get all user created products

const getProducts=asyncHandler(async (req,res)=>{

    const products=await Product.find({user:req.user.id}).sort('-createdAt');

    res.status(200).json(products);


})

// get single product

const getSingleProduct=asyncHandler(async (req,res)=>{

    const product=await Product.findById(req.params.id);

    if (!product){
      res.status(404)
      throw new Error ("product not found")
     
    }

    // Match product user to req user

    if(product.user.toString() !== req.user.id ){

      res.status(401)

      throw new Error("user not unthorized")
    }

    res.status(200).json(product);


})

// Delete products

const deleteProduct=asyncHandler(async (req,res)=>{

    const product=await Product.findById(req.params.id);

    if(!product){
      res.status(404)
      throw new Error("product not found");
    };

    // Match product user to req user

    if(product.user.toString() !== req.user.id){

      res.status(401)
      throw new Error("User not authorized");
    }

    await product.deleteOne();

    res.status(201).send({msg:"product delete successfully"})




})

// update product

const updateProduct=asyncHandler(async (req,res)=>{
  
  const {name,category,quantity,price,description}=req.body;

  const{id}=req.params;
  // another way to receive path parameter= req.params.id

  const product=await Product.findById(id);

  // if product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle image upload

  let fileData={};
  if(req.file){


    fileData={

      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size

    }
  }

  // It,s time to update data

  const updatedProduct=await Product.findByIdAndUpdate(
     {_id:id},

     {
      
      name,
      category,
      quantity,
      price,
      description,
      image:Object.keys(fileData).length===0 ? product ?.image:fileData,

     },

     {
      new: true,
      runValidators: true,
     }

)

 res.status(200).json(updatedProduct);

})


module.exports = {
     createProduct,
     getProducts,
     getSingleProduct,
     deleteProduct,
     updateProduct
   
   };