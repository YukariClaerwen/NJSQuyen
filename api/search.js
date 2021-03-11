const cheerio = require("cheerio");
const request = require("request-promise");

module.exports = (app) => {
    app.get("/timkiem/:k/:p", (req, res) => {
        let keyword = req.params.k;
        let page = req.params.p;
        
        request(`http://m.nhaccuatui.com/tim-kiem/bai-hat?q=${keyword}&page=${page}`, (error, response, body) => {
            const $ = cheerio.load(body);
            let data = {};
            if(!error && response.statusCode == 200) {
                let count = $('p.count').find('br').get(0).nextSibling.nodeValue.split(' ')[1];
                data = {
                    found : parseInt(count),
                    res : []
                }
                $('.song_item_single').each((index, el) => {
                    const song = $(el).find('.title_song > a').text();
                    const song_url = $(el).find('.title_song > a').attr("href");
                    const singer = $(el).find('.singer_song > a').text();
                    const singer_url = $(el).find('.singer_song > a').attr("href");
                    const img_url = $(el).find ('.item_thumb img').attr('data-src');
                    if(song != ""){
                        data.res.push({
                            song, song_url, singer, singer_url, img_url
                        })
                    }
                })
    
                res.json(data);
            }
            else {
                console.log(error);
            }
        })
    })
}