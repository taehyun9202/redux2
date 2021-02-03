const Items = require("../controllers/Item.controllers");
const auth = require("../config/middleware");

module.exports = app => {
    app.get("/api/Items", Items.getAll)
    app.post("/api/Items", auth, Items.create)
    app.delete("/api/Items/:_id", auth, Items.delete)
}

