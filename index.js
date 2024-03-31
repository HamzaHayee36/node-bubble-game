const express = require('express');
const bodyParser = require('body-parser');
const {join} = require("path");
const fs = require("fs");
const app = express();


app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'public')));

function saveDataToFile(data) {
    try {
        fs.writeFileSync("data.json", JSON.stringify(data), 'utf8');
    } catch (error) {
        console.error('Error writing to the data file:', error);
    }
}

app.post('/json-data', (req, res) => {
    const { username, characters, seconds } = req.body;
    console.log(`Received data: username=${username}, characters=${characters}, seconds=${seconds}`);
    saveDataToFile({ username, characters, seconds });
    res.json({ message: 'Data received successfully' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
