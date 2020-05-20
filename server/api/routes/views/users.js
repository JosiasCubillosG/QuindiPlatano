const express = require("express");
const router = express.Router();
const userService = require('../../services/users');


router.get("/", async function(req, res){    
    try{
        const users = await userService.getUsers(req, res);
        res.render("users", { users });
    }catch(err){
        res.render("users", { users: [] });
    }
});

module.exports=router;