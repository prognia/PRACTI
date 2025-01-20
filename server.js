const express = require('express');
const connectDb = require('./config/db');
const itemModel = require('./itemSchema/itemSchema');

const app = express();

app.use(express.json());

connectDb();

app.get('/items', async (req, res) => {
    const items = await itemModel.find();
    res.send(items);
})

app.get('/items/:id', async (req, res) => {
    try {
        const item = await itemModel.findById(req.params.id);
        console.log(item);

        if (!item) {
            res.send("Item not found");
            return;
        }

        res.send(item);
    }
    catch(err) {
        console.error(err);
        res.send("invalid item id");
    }
})

app.post('/items', async (req, res) => {
    const { name, price, category } = req.body;
    const findName = await itemModel.findOne({ name });

    if (findName) {
        res.send("Item already exists");
        return;
    }

    if (!name && !price && !category) {
        res.send("All fields are required");
    }

    const item = new itemModel({ name, price, category });
    console.log(item);
    item.save();
    res.send("item saved successfully");
})

app.put('/items/:id', async (req, res) => {
    try {
        const item = await itemModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!item) {
            res.send("Item not found");
            return;
        }

        res.send("item updated successfully");
    }
    catch(err) {
        console.error(err);
        res.send("invalid item id");
    }
})

app.delete('/items/:id', async (req, res) => {
    try {
        const item = await itemModel.findByIdAndDelete(req.params.id);

        if (!item) {
            res.send("Item not found");
            return;
        }

        res.send("item deleted successfully");
    }
    catch(err) {
        console.error(err);
        res.send("invalid item id");
    }
})

app.listen(8000, () => console.log("server is listening on http://localhost:8000"));