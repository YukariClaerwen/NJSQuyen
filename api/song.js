const cheerio = require("cheerio");
const request = require("request-promise");

module.exports = (app) => {
    app.get("/nhac/:n", (req, res) => {
        let name = req.params.n || 1; 
        
        request(`http://m.nhaccuatui.com/bai-hat/${name}`, (error, response, body) => {
            const $ = cheerio.load(body);
            let data = {};
            if(!error && response.statusCode == 200) {
                let key = $('#icon-play').attr('keyencrypt');

                request(`http://m.nhaccuatui.com/ajax/get-media-info?key1=${key}&key2=&key3=&ip=14.169.121.22`, (error, response, body) =>{
                    if(!error && response.statusCode == 200) {
                        data = JSON.parse(body);
                        console.log(response);
                        res.json(data);
                    }
                    else {
                        console.log(error);
                    }
                })
            }
            else {
                console.log(error);
            }
        })
    })
}