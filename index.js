import express from "express";
import axios from "axios";
import TypeIt from "typeit-react";

const app = express();
const port = 3000;
const apiKey = "FUuMuLTEZAieTjrNJ9gXa4l8slyLxPvdqNt4lzil";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=1`);
        const result = response.data[0];
        console.log(result);
        res.render("index.ejs", {
            date: result.date,
            explanation: result.explanation,
            hdurl: result.hdurl,
            title: result.title,
            url: result.url,
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});