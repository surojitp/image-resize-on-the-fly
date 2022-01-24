'use strict';
import fs from "fs";
import express from 'express';
import path from 'path';
const __dirname = path.resolve('public');
const app = express();
app.use(express.static('public'));
const router = express.Router();
import sharp from "sharp";
import got from "got";
import request from "request";

import https from "https";

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/thumb',(req, res, next) =>{
    
    let image = req.query.src ? req.query.src : 'https://thumbs.dreamstime.com/b/businessman-hand-writing-demo-marker-business-concep-concept-96434578.jpg';
        
    let width = parseInt(req.query.width ? req.query.width : 100) 
    let height = parseInt(req.query.height ? req.query.height : 100)

        
    var transformer = sharp()
    .resize(width, height)
    .on('info', function(info) {
        // console.log('Image height is ' + info.height);
    });

    /********* Using GOT */
    got.stream(image).pipe(transformer).pipe(res);
    
    /********* Using HTTPS */
    // https.get(image, (stream) => {
    //     stream.pipe(transformer).pipe(res);
    // });

    /********* Using REQUEST */
    // request(image).pipe(transformer)
    //     .on('data', function(d){
    //         var img = Buffer.from(d);
    //         res.writeHead(200, {
    //             'Content-Type': 'image/png',
    //             'Content-Length': img.length
    //         });
    //         res.end(img);
    //     })
    //     .on('error', function(e) {
    //         console.log("error", e);
            
            
    //     })

    
})

app.get('/local',(req, res, next) =>{
    var transformer = sharp()
    .resize(100, 100)
    .on('info', function(info) {
        // console.log('Image height is ' + info.height);
    });

    ///////// ************** Buffer Example ////
    
    ////// create buffer //////
    //  var buf = Buffer.from(path.join(__dirname+'/images/demo.jpg'));
    //////// Create Read stream //////
    //  const readStream = fs.createReadStream(buf)

    /////// *************** End Buffer ///////

    //////// Create Read stream //////
    const readStream = fs.createReadStream(path.join(__dirname+'/images/demo.jpg'));
    ///////// Send Response ////////
    readStream.pipe(transformer).pipe(res);
})

app.use('/', router);
app.listen(8080);
