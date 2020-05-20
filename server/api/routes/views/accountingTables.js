const express = require("express");
const router = express.Router();
const accountingTableService = require('../../services/accountingTables');


router.get("/", async function(req, res){    
    try{
        const accountingTables = await accountingTableService.getAccountingTables(req, res);
        res.render("accountingTables", { accountingTables });
    }catch(err){
        res.render("accountingTables", { accountingTables: [] });
    }
});

module.exports=router;