const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Task = require("./model/taskSchema");

app.use(express.json());

mongoose
    .connect(
        "mongodb+srv://tamim59:e8yZM2fADBWPsrCm@cluster0.cyb0k19.mongodb.net/eCommerce?retryWrites=true&w=majority"
    )
    .then(() => console.log("Database Connected!"));

app.post("/createtask", function (req, res) {
    let { title, priority } = req.body;

    let task = new Task({
        title: title,
        priority: priority,
    });

    task.save();
    res.send({ success: "data Created" });
});

app.get("/createtask", async function (req, res) {
    let data = await Task.find({});
    res.send(data);
});

app.post("/edittask", async function (req, res) {
    let { id, title, priority } = req.body;
    await Task.findByIdAndDelete(
        { _id: id }
        // { title: title },
        // { priority: priority }
    );
});

app.listen(8000, function () {
    console.log("Server is running");
});

// e8yZM2fADBWPsrCm
// tamim59
