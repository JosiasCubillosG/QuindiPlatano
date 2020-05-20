const express = require("express");
const router = express.Router();
const expenseService = require('../../services/expenses');


router.get("/", async function(req, res){    
    try{
        const expenses = await expenseService.getExpenses(req, res);
        res.render("expenses", { expenses });
    }catch(err){
        res.render("expenses", { expenses: [] });
    }
});

module.exports=router;