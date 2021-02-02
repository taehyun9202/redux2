const Items = require("../controllers/Item.controllers");

module.exports = app => {
    app.get("/api/Items", Items.getAll);
    app.post("/api/Items", Items.create);
    app.delete("/api/Items/:_id", Items.delete);
}

