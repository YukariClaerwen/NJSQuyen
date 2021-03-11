const cheerio = require("cheerio");
const request = require("request-promise");

module.exports = (app) => {
    app.get("/baihat/:p", (req, res) => {
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
                    const song_url = paths[paths.length - 1];
                    paths = song_url.split(".");
                    const singer = $(el).find('.singer_song > a').text();
                    const singer_url = $(el).find('.singer_song > a').attr("href");
                    const img_url = $(el).find ('.item_thumb img').attr('data-src');
                    if(song != ""){
                        data.items.push({
                            song, song_url, singer, singer_url, img_url
                        })
                    }
                });
                res.json(data);
            }
            else {
                console.log(error);
            }
        })
    })
}