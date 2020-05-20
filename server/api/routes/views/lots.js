const express = require("express");
const router = express.Router();
const lotService = require('../../services/lots');


router.get("/", async function(req, res){    
    try{
        const lots = await lotService.getLots(req, res);
        res.render("lots", { lots });
    }catch(err){
        res.render("lots", { lots: [] });
    }
});

module.exports=router;