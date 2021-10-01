const express = require("express");
const app = express();
const cors = require('cors');
const port = 5000;

// middleware
app.use(cors(), () => {
    
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});