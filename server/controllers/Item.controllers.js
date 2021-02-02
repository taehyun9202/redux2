const Item = require('../models/Item.models');

class ItemController {
    getAll(req, res) {
        Item.find()
            .sort({ date: -1 })
            .then(items => res.json(items))
            .catch(err => res.json(err));
    }
    create(req, res){
        const newItem = new Item(req.body);
        newItem.save()
               .then(()=> res.json(items))
               .catch(err => res.json(err));
    }
    delete(req, res){
        Item.findOneAndDelete({_id: req.params._id})
            .then(() => res.json({msg: "Deleted "}))
            .catch(err => res.json(err));
    }
}

module.exports = new ItemController()