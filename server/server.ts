import express from 'express'            //Import section
import * as dotenv from 'dotenv'


const app = express();
dotenv.config();                  // Basic config section
const port = process.env.PORT;


// Routes section
app.get("/teste", (req, res) => {
    const objJson = [{
        id: "1", text: "Annoucement 1"
    },
    {
        id: "2", text: "Annoucement 2"
    },
    {
        id: "3", text: "Annoucement 3"
    }]

    return res.json(objJson[1])
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})