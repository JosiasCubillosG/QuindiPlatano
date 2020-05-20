const express = require("express");
const router = express.Router();
const incomeService = require('../../services/incomes');


router.get("/", async function(req, res){    
    try{
        const incomes = await incomeService.getIncomes(req, res);
        res.render("incomes", { incomes });
    }catch(err){
        res.render("incomes", { incomes: [] });
    }
});

module.exports=router;