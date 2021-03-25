const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require('fs');
const dl = require("download");

module.exports = (app) => {
    app.get("/songlist/:p", (req, res) => {
        let page = req.params.p || 1; 
        
        request(`http://m.nhaccuatui.com/bai-hat/bai-hat-moi.${page}.html`, (error, response, body) => {
            const $ = cheerio.load(body);
            let data = {
                items : [],
                current : parseInt(page),
                pages : 10
            };
            if(!error && response.statusCode == 200) {
                $('.song_item_single').each((index, el) => {
                    const song = $(el).find('.title_song > a').text();
                    // const song_url = ;
                    let paths = $(el).find('.title_song > a').attr("href").split("/");
                    const refkeyyoutube = $(el).find('.title_song > a').attr("refkeyyoutube");
                    const keyencrypt = $(el).find('span.ic_play_circle').attr('keyencrypt');
                    const songKey = $(el).find('.title_song > a').attr('key');
                    let song_url = paths[paths.length - 1];
                    paths = song_url.split(".");
                    song_url = paths[0];
                    const singer = $(el).find('.singer_song > a').text();
                    const singer_url = $(el).find('.singer_song > a').attr("href");
                    const img_url = $(el).find('.item_thumb img').attr('data-src');
                    const img_default = $(el).find('.item_thumb img').attr('src');
                    if(song != ""){
                        data.items.push({
                            song, refkeyyoutube, keyencrypt, songKey, song_url, singer, singer_url, img_url, img_default
                        });
                    }
                });
                res.json(data);
            }
            else {
                console.log(error);
            }
        })
    });

    app.get("/search/:k/:p", (req, res) => {
        let keyword = req.params.k;
        let page = req.params.p;
        
        request(`http://m.nhaccuatui.com/tim-kiem/bai-hat?q=${keyword}&page=${page}`, (error, response, body) => {
            const $ = cheerio.load(body);
            let data = {};
            if(!error && response.statusCode == 200) {
                let count = $('p.count').find('br').get(0).nextSibling.nodeValue.split(' ')[1];
                data = {
                    items : [],
                    current : parseInt(page),
                    found : parseInt(count)
                }
                $('.song_item_single').each((index, el) => {
                    const song = $(el).find('.title_song > a').text();
                    const refkeyyoutube = $(el).find('.title_song > a').attr("refkeyyoutube");
                    const keyencrypt = $(el).find('span.ic_play_circle').attr('keyencrypt');
                    const songKey = $(el).find('.title_song > a').attr('key');
                    let paths = $(el).find('.title_song > a').attr("href").split("/");
                    const song_url = paths[paths.length - 1];
                    paths = song_url.split(".");
                    const singer = $(el).find('.singer_song > a').text();
                    const singer_url = $(el).find('.singer_song > a').attr("href");
                    const img_url = $(el).find ('.item_thumb img').attr('data-src');
                    const img_default = $(el).find ('.item_thumb img').attr('src');
                    if(song != ""){
                        data.items.push({
                            song, refkeyyoutube, keyencrypt, songKey, song_url, singer, singer_url, img_url, img_default
                        })
                    }
                });
    
                res.json(data);
            }
            else {
                console.log(error);
            }
        })
    });

    app.post("/song", async (req, res) => {
        // let key = await req.params.k; 
        let key = await req.body.key;
        // console.log(req.session.user_id)
        let re = request(`http://m.nhaccuatui.com/ajax/get-media-info?key1=${key}&key2=&key3=&ip=14.169.121.22`, async (error, response, body) =>{
            if(!error && response.statusCode == 200) {
                data = await JSON.parse(body);
                // let mp3 = await data.data.location;
                // let title = await data.data.title;
                // dl(await mp3).pipe(fs.createWriteStream(`public/files/ms.mp3`));
                // dl(await mp3).pipe(fs.createWriteStream(`public/files/${title}.mp3`));
                return res.json(await data);
            }
            else {
                console.log(error);
            }
        });
        re()
        // if(req.session.user_id) {
            
        // } else {
        //     res.json(0);
        // }

        
    })
}