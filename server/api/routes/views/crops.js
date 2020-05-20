const express = require("express");
const router = express.Router();
const cropService = require('../../services/crops');


router.get("/", async function(req, res){    
    try{
        const crops = await cropService.getCrops(req, res);
        res.render("crops", { crops });
    }catch(err){
        res.render("crops", { crops: [] });
    }
});

module.exports=router;