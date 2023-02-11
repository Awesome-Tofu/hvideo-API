const axios=require('axios');
const cheerio=require('cheerio');
const express=require('express');
const app=express();
const PORT= 3000;

function hentai() {	
    return new Promise((resolve, reject) => {	
        const page = Math.floor(Math.random() * 1153)	
        axios.get('https://sfmcompile.club/page/'+page)	
        .then((data) => {	
            const $ = cheerio.load(data.data)	
            const hasil = []	
            $('#primary > div > div > ul > li > article').each(function (a, b) {	
                hasil.push({	
                    title: $(b).find('header > h2').text(),	
                    link: $(b).find('header > h2 > a').attr('href'),	
                    category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),	
                    share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),	
                    views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),	
                    type: $(b).find('source').attr('type') || 'image/jpeg',	
                    video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),	
                     video_2: $(b).find('video > a').attr('href') || ''	
                })	
            })	

            resolve(hasil) 	
        })	
    })	
}


app.get('/', (req, res) => {
    hentai().then((results) => {
      const hvid1 = results[0].video_2;
     
      const data={ vid: hvid1,status:200 };
      res.status(200).json(data);
    }).catch((err) => {
        res.send({vid_1:"Something Went Wrong!",status:401});
    });
  });




app.listen(PORT, () => console.log(`Listening on PORT ${PORT} 
Access here: http://localhost:${PORT}`));