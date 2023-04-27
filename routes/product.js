const express=require('express');
const router=express.Router();

const protect=require("../middlewars/auth");

const {createProduct}=require("../controllers/product");

router.post("/",protect,createProduct);

module.exports=router;