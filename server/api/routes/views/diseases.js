const express = require("express");
const router = express.Router();
const diseaseService = require('../../services/diseases');


router.get("/", async function(req, res){    
    try{
        const diseases = await diseaseService.getDiseases(req, res);
        res.render("diseases", { diseases });
    }catch(err){
        res.render("diseases", { diseases: [] });
    }
});

module.exports=router;