const express = require("express");
const app = express();
const cheerio = require("cheerio");
const request = require("request-promise");
let port = 7000;

var morgan = require("morgan");
app.use(morgan("dev"));
app.set("view engine", "ejs");

let bodyParser = require("body-parser");
app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => { res.render("index")})
app.get('/news', (req, res) => { res.render("news")})
app.get('/vip', (req, res) => { res.render("vip")})


app.get("/timkiem/:k/:p", (req, res) => {
    let keyword = req.params.k;
    let page = req.params.p;
    // let request = require("request");
    request(`http://m.nhaccuatui.com/tim-kiem/bai-hat?q=${keyword}&b=title&sort=0&page=${page}`, (error, response, body) => {
        const $ = cheerio.load(body);
        let data = [];
        if(!error && response.statusCode == 200) {
            $('.song_item_single').each((index, el) => {
                const song = $(el).find('.title_song > a').text();
                const song_url = $(el).find('.title_song > a').attr("href");
                const singer = $(el).find('.singer_song > a').text();
                const singer_url = $(el).find('.singer_song > a').attr("href");
                const img_url = $(el).find ('.item_thumb img').attr('src');
                data.push({
                    song, song_url, singer, singer_url, img_url
                })
            })

            res.json(data);
        }
        else {
            console.log(error);
        }
    })
})

app.get("/tygia", function (req, res) {

    var request = require("request");
    
    request("https://tygia.com/gold.amp?ngay=#amp=1", function(error, response, body){
        res.send(body);
    })

})

const server = app.listen(port, () => {
    console.log(`Run success in port ${port}`)
});