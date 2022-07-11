const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.post("/upload", (req, res) => {
    // use modules such as express-fileupload, Multer, Busboy
    console.log("upload hitted");
    console.log(req.body);
    return res.status(200).json({ result: true, msg: 'file uploaded' });
});

app.get("/search",(req,res) => {
    console.log("search hitted");
    console.log(req.params);
    res.send("Apple bat ball");
})

app.listen(8080, () => {
    console.log(`Server running on port 8080`)
});