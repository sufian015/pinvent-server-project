const mongoose=require('mongoose');

const bcrypt = require('bcryptjs');



const userSchema=mongoose.Schema({

     name:{
          type:String,
          required:[true,"please add a name"]
     },
     email:{
          type:String,
          required:[true,"please add a email"],
          unique:true,
          trim:true,
          match:[
               /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please enter a valid email"
          ]
     },
     password:{
          type:String,
          required:[true,"please add a password"],
          minLength:[6,"password must be up to 6 character"]
     },
     photo:{
          type:String,
          required:[true,"please insert a photo"],
          default:"https://i.ibb.co/4pDNDk1/avatar.png"
     },
     phone:{
          type:String,
          default:"+880"
     },
     bio:{
          type:String,
          maxLength:[250,'bio must be up to 250 character'],
          default:"bio"
     }





},{
     timestamps:true,versionKey:false

})


// Encript password before save to db

userSchema.pre("save",async function(next){

     if(!this.isModified("password")){
          return next();
     }


     // hash password

     var salt = await bcrypt.genSaltSync(10);
     var hashed = await bcrypt.hash(this.password, salt);
     this.password=hashed
     next();

})

const User=mongoose.model("User",userSchema);

module.exports=User;
