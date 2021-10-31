//Modules
const ItemCollection = require('../config/db');

class Todo {

    //Get all the items from the database
    async getItems() {

        let data = await ItemCollection.find();
        if(Object.keys(data).length === 0) {
            return { Message: "The database is currently empty."};
        }
        else {
            return data;
        }
    }

    //Add item to the database
    addItem(newItem) {
        
        const item = new ItemCollection({
            name: newItem,
            checked: false
        });
        console.log("Item added to database!")
        item.save();
    }

    //Update item in a database
    updateItem(oldItem,newItem) {
        
        const filter = { name: oldItem };
        const update = { name: newItem };
        
        let doc = ItemCollection.findOne(filter,function(err,itemFound) {
            if(err) {
                console.log(err);
            } else {
                return itemFound;
            }
        });
        doc.updateOne(update);
        console.log("Item with text: " + oldItem + " updated!");
    }

    //delete item from a database
    deleteItem(itemName) {

        ItemCollection.deleteOne({name: itemName}, function(err) {
            if (!err) {
                console.log("Item deleted from database!");
        }});
    }

    //mark an item in a database
    markItem(itemName) {

        const filter = { name: itemName };

        let doc = ItemCollection.findOne(filter,function(err,itemsFound) {
            if(err) {
                console.log(err);
            } else {
                return itemsFound;
            }
        });
        doc.updateOne([{$set:{checked:{$eq:[false,"$checked"]}}}]);
        console.log("Item with text: " + itemName + " updated!");
    }

}

module.exports = Todo;