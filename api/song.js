const youtube = require('scrape-youtube').default;
const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require('fs');
const dl = require("download");

// const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = (app) => {
    app.get("/songlist/:p", (req, res) => {
        let page = req.params.p || 1; 
        let data = {
            items : [],
            current : parseInt(page),
            pages : 1
        };
        youtube.search('nhạc trẻ').then(results => {
            // Unless you specify a type, it will only return 'video' results
            // console.log(results.videos); 
            for(var i = 0; i < results.videos.length; i++) {
                let item = {
                    song: results.videos[i].title,
                    refkeyyoutube: results.videos[i].id, 
                    keyencrypt: '', 
                    songKey: '', 
                    song_url: results.videos[i].title, 
                    singer: results.videos[i].channel.name, 
                    singer_url: results.videos[i].channel.link, 
                    img_url: `/yt/thumbnail/hq/${results.videos[i].id}.jpg`, 
                    img_default: `/yt/thumbnail/max/${results.videos[i].id}.jpg`
                }
                data.items.push(item);
            }
            res.json(data);
        });
        
        // request(`http://m.nhaccuatui.com/bai-hat/bai-hat-moi.${page}.html`, (error, response, body) => {
        //     const $ = cheerio.load(body);
        //     let data = {
        //         items : [],
        //         current : parseInt(page),
        //         pages : 10
        //     };
        //     if(!error && response.statusCode == 200) {
        //         $('.song_item_single').each((index, el) => {
        //             const song = $(el).find('.title_song > a').text();
        //             // const song_url = ;
        //             let paths = $(el).find('.title_song > a').attr("href").split("/");
        //             const refkeyyoutube = $(el).find('.title_song > a').attr("refkeyyoutube");
        //             const keyencrypt = $(el).find('span.ic_play_circle').attr('keyencrypt');
        //             const songKey = $(el).find('.title_song > a').attr('key');
        //             let song_url = paths[paths.length - 1];
        //             paths = song_url.split(".");
        //             song_url = paths[0];
        //             const singer = $(el).find('.singer_song > a').text();
        //             const singer_url = $(el).find('.singer_song > a').attr("href");
        //             const img_url = $(el).find('.item_thumb img').attr('data-src');
        //             const img_default = $(el).find('.item_thumb img').attr('src');
        //             if(song != ""){
        //                 data.items.push({
        //                     song, refkeyyoutube, keyencrypt, songKey, song_url, singer, singer_url, img_url, img_default
        //                 });
        //             }
        //         });
        //         res.json(data);
        //     }
        //     else {
        //         console.log(error);
        //     }
        // })
    });

    app.get("/search/:k/:p", (req, res) => {
        let keyword = req.params.k;
        let page = req.params.p || 1; 
        let data = {
            items : [],
            current : parseInt(page),
            pages : 1
        };
        youtube.search(keyword).then(results => {
            // Unless you specify a type, it will only return 'video' results
            // console.log(results.videos); 
            for(var i = 0; i < results.videos.length; i++) {
                let item = {
                    song: results.videos[i].title,
                    refkeyyoutube: results.videos[i].id, 
                    keyencrypt: '', 
                    songKey: '', 
                    song_url: results.videos[i].title, 
                    singer: results.videos[i].channel.name, 
                    singer_url: results.videos[i].channel.link, 
                    img_url: `/yt/thumbnail/hq/${results.videos[i].id}.jpg`, 
                    img_default: `/yt/thumbnail/max/${results.videos[i].id}.jpg`
                }
                data.items.push(item);
            }
            res.json(data);
        });
        
        // request(`http://m.nhaccuatui.com/tim-kiem/bai-hat?q=${keyword}&page=${page}`, (error, response, body) => {
        //     const $ = cheerio.load(body);
        //     let data = {};
        //     if(!error && response.statusCode == 200) {
        //         let count = $('p.count').find('br').get(0).nextSibling.nodeValue.split(' ')[1];
        //         data = {
        //             items : [],
        //             current : parseInt(page),
        //             found : parseInt(count)
        //         }
        //         $('.song_item_single').each((index, el) => {
        //             const song = $(el).find('.title_song > a').text();
        //             const refkeyyoutube = $(el).find('.title_song > a').attr("refkeyyoutube");
        //             const keyencrypt = $(el).find('span.ic_play_circle').attr('keyencrypt');
        //             const songKey = $(el).find('.title_song > a').attr('key');
        //             let paths = $(el).find('.title_song > a').attr("href").split("/");
        //             const song_url = paths[paths.length - 1];
        //             paths = song_url.split(".");
        //             const singer = $(el).find('.singer_song > a').text();
        //             const singer_url = $(el).find('.singer_song > a').attr("href");
        //             const img_url = $(el).find ('.item_thumb img').attr('data-src');
        //             const img_default = $(el).find ('.item_thumb img').attr('src');
        //             if(song != ""){
        //                 data.items.push({
        //                     song, refkeyyoutube, keyencrypt, songKey, song_url, singer, singer_url, img_url, img_default
        //                 })
        //             }
        //         });
    
        //         res.json(data);
        //     }
        //     else {
        //         console.log(error);
        //     }
        // })
    });

    app.post("/song", async (req, res) => {
        // let key = await req.params.k; 
        let key = await req.body.key;
        let link = `http://m.nhaccuatui.com/ajax/get-media-info?key1=${key}&key2=&key3=&ip=14.169.121.22`;
        // console.log(req.session.user_id)
        request(link, async (error, response, body) =>{
            if(!error && response.statusCode == 200) {
                data = await JSON.parse(body);
                // let mp3 = await data.data.location;
                // let title = await data.data.title;
                // dl(await mp3).pipe(fs.createWriteStream(`public/files/ms.mp3`));
                // dl(await mp3).pipe(fs.createWriteStream(`public/files/${title}.mp3`));
                res.json(await data);
            }
            else {
                console.log(error);
            }
        });
        // if(req.session.user_id) {
            
        // } else {
        //     res.json(0);
        // }

        
    })
    // app.get("/yt/video/", async (req, res) => {
    //     let key = await req.params.k;
    //     let info = await ytdl.getInfo("1zxNH09Nzdc");
    //     let format = ytdl.chooseFormat(info.formats, {quality: 'highestvideo'});
    //     console.log(format);
    //     // ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ').pipe(fs.createWriteStream('video.mp4'));
    // });

    app.get("/yt/video/:k.mp4", async (req, res) => {
        let key = await req.params.k;
        let info = await ytdl.getInfo(key);
        let format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
        // console.log(format);
        res.writeHead(301, {"location": format.url});
        return res.end();
    });
    
    app.get("/yt/thumbnail/hq/:k.jpg", (req,res) => {
        let key = req.params.k;
        let link = `https://i.ytimg.com/vi/${key}/hqdefault.jpg`;
        res.writeHead(301, {"location": link});
        // console.log(res);
        return res.end();
    })
    app.get("/yt/thumbnail/max/:k.jpg", (req,res) => {
        let key = req.params.k;
        let link = `https://i.ytimg.com/vi/${key}/maxresdefault.jpg`;
        res.writeHead(301, {"location": link});
        return res.end();
    })
    app.get("/mp3/:id.mp3", async (req, res) => {
        let key = await req.params.id;
        let link = `http://m.nhaccuatui.com/ajax/get-media-info?key1=${key}&key2=&key3=&ip=14.169.121.22`;
        request(link, async (error, response, body) =>{
            if(!error && response.statusCode == 200) {
                data = await JSON.parse(body);
                res.writeHead(301, {"location": data.data.location});
                return res.end()
            }
            else {
                console.log(error);
            }
        });
        // if(req.session.user_id) {
            
        // } else {
        //     res.json(0);
        // }

        
    })


}