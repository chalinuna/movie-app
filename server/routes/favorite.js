const express = require('express')
const router = express.Router()
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req,res)=> {

    // 프론트에서 movieId 받아오기
    req.body.movieId
    console.log('req.body.movieId 출력'+req.body.movieId)

    //mongoDB에서 프론트에서 받아온 Id와 같은 영화의 favorite 숫자 가져오기

    Favorite.find({"movieId": req.body.movieId})
    .exec((err,info)=>{
        if(err) return res.status(400).send(err)

        // 프론트에 가져온 숫자 보내주기
        res.status(200).json({success:true, favoriteNumber:info.length})
        })
    })
    router.post('/favorited', (req,res)=>{

        //나의 버튼 누름 유무 가져오기

        Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((err, info)=>{
            if(err) return res.status(400).send(err)

            let result = false
            
            //눌렀을 경우 반환
            if(info.length !==0 ) {
                result = true
                console.log('눌러서 true보내는 중')
            }

            res.status(200).json({success:true, favorited:result})


        })

    })

    router.post('/removeFromFavorite', (req,res)=>{

        Favorite.findOneAndDelete({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((err,doc)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true, doc})
        })            
    })

    router.post('/addToFavorite', (req,res)=>{

        // create new instance (models/Favorite.js)
        const favorite = new Favorite(req.body)
        favorite.save((err,doc) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true})
        })

    })

    
    router.post('/getFavoredMovie', (req,res)=>{
        Favorite.find({'userFrom': req.body.userFrom})
        .exec((err, favorites)=>{
            console.log('내가 좋아하는 목록 가져오기 성공했을때 백엔드',favorites)
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true, favorites})
        })
    })


    router.post('/removeFromFavorite', (req,res) => {
        Favorite.findOneAndDelete({'movieId': req.body.movieId, 'userFrom':req.body.userFrom})
        .exec((err, result) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true})
        })
    })



module.exports = router;