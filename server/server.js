import express from 'express';
import * as dotenv from 'dotenv'      // Import section


const app = express();
dotenv.config();           // Basic Config section
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
        }];
    return res.json(objJson);
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
