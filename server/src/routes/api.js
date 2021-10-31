//Modules
const Todo = require('../controllers/ToDo');
const express = require("express");
const router = express.Router();

//Get request for checking the database when the website loads
router.get("/api/home", async function (req, res) {

    let data = await new Todo().getItems();
    res.json(data);
});

//A post request for adding items
router.post("/api/", function(req, res) {
    
    new Todo().addItem(req.body.newItem);
    res.redirect("http://localhost:3001/api/home");
});

//A post request for marking items
router.post("/api/mark",function(req, res) {
    
    let data = new Todo().markItem(req.body.itemName);
    res.json(data);
});

//A put request for updating items
router.put("/api/",function(req, res) {

    new Todo().updateItem(req.body.oldItem,req.body.newItem);
});

//A delete request for deleting items
router.delete("/api/", function(req, res) {

    new Todo().deleteItem(req.body.itemName);
});

module.exports = router;