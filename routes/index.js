const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const fs = require('fs')
const db = require('../config/db');
const transferDb = require('../models/transferDb'); 
dotenv.config({path : '../config/config.env'});
const Customers = require("../models/Customers");
db().then();
const data = JSON.parse(fs.readFileSync("_seedData/customers.json", {encoding: 'utf-8'}));
console.log(data);

router.get('/createData', async(req,res) => {
   
      try
      {
         const alldata = await Customers.create(data);
         console.log("Data Created");
        return  res.render("../views/alldata.ejs", { message : "All Customers Data", alldata : alldata})
         
      }
      catch(err)
      {
         console.log(err);
      }
   
})

router.get('/deleteData', async(req,res) => {
   try {
      await Customers.deleteMany();
      console.log("Data Deleted");
      return  res.redirect("/allcustomers")

  } catch (err) {
      console.log(err);
  }
})
  
 //importData();
//deleteData();

router.get('/', (req,res) => {
   res.render("index.ejs",{message : "Home Page"})
} )

router.get('/allcustomers',async (req,res) => {
   totaldata = await Customers.find({});
   res.render("alldata.ejs", { message : "All Customers Data", alldata : totaldata})
} )

router.get("/transfer/:accountNo", async (req,res)=> {
   const accNo = await Customers.findOne({ accountNo : req.params.accountNo});
   if(accNo == null) res.redirect("/allcustomers");

   res.render("transfer.ejs", {accNo :accNo.currentBalance, message:"Tranfer Money" } )
})

router.post('/customer/transfer', async (req,res,next)=> {
   const {myAc,OppositeAc,amount} = req.body;
   try
   {
   const myAccount = await Customers.findOne({accountNo:myAc});
   const OpAccount = await Customers.findOne({accountNo : OppositeAc});
   // const currentBalance = await Customers.findOne({ currentBalance })4
   console.log(myAccount.currentBalance);
   if(myAccount == null || OpAccount == null ) res.send("No Such accountNo");
   const filter = { _id: myAccount._id  };
   // update the value of the 'z' field to 42
   const updateDocument = {
      $set: {
         currentBalance :  myAccount.currentBalance - amount 
      },
   };
   const result = await Customers.updateOne(filter, updateDocument);
   const filter2 = { _id: OpAccount._id  };
   // update the value of the 'z' field to 42
  
   const updateDocument2 = {
      $set: {
         currentBalance :  OpAccount.currentBalance + parseInt(amount,10) 
      },
   };
   const result2 = await Customers.updateOne(filter2, updateDocument2);
   console.log(updateDocument2);
   console.log(result2);
   const user = new transferDb({
       fromAc : myAccount.accountNo,
       toAc : OpAccount.accountNo,
       tAmount : amount
   })
    user.save();
   res.redirect('/allcustomers');
   }
   catch(err)
   {
      res.send(err);
      console.log(err);
   }
})

router.get("/transactionHistory", async(req,res)=> {
   const alluser = await transferDb.find({});
   try 
   {
      res.render("transactionHistory.ejs", {message :"All Transactions", alluser : alluser})

   }
   catch(e)
   {
      console.log(e);
   }
})

module.exports = router;