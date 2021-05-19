const express = require('express');
const router = express.Router();
const request = require('request')
const moment = require('moment')


const seasonUrl = "https://www.dongqiudi.com/api/v2/config/data_menu";//获取赛季id
const standingUrl = "https://www.dongqiudi.com/sport-data/soccer/biz/data/standing";//积分榜
const personRankingUrl = "https://www.dongqiudi.com/sport-data/soccer/biz/data/person_ranking";//球员榜
const scheduleUrl = "https://www.dongqiudi.com/sport-data/soccer/biz/data/schedule";//赛程榜


/**
 * 获取各个联赛的赛季id
 */
router.get('/', (req, res, next) => {
    request(seasonUrl, (err, response) => {
        // console.log(response);
        let body = JSON.parse(response.body)
        let arr = body.data.list;
        let seasonArr = []
        arr.forEach(element => {
            // console.log(element)
            let obj = {
                "label": element.label,
                "season_id": element.season_id
            }
            seasonArr.push(obj)
        });
        // console.log(seasonArr.length)
        res.send(seasonArr)
    })
})


/**
 * 获取积分榜
 * 参数：season_id
 */
router.get('/standing', (req, res, next) => {
    let season_id = req.query.season_id;
    request({
        method: 'GET',
        url: standingUrl,
        qs: { season_id: season_id }
    }, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            body = JSON.parse(body)
            let description = body.content.description;
            let data = body.content.rounds[0].content.data
            let standingData = {
                description: description,
                data: []
            }
            data.forEach(ele => {
                let obj = {
                    team_logo: ele.team_logo,
                    team_name: ele.team_name,
                    matches_total: ele.matches_total,
                    matches_won: ele.matches_won,
                    matches_draw: ele.matches_draw,
                    matches_lost: ele.matches_lost,
                    goals_pro: ele.goals_pro,
                    goals_against: ele.goals_against,
                    points: ele.points
                }
                standingData.data.push(obj)
            })
            res.json(standingData)
        } else {
            res.json(err)
        }
    })
})

/**
 * 获取球员榜
 */
router.get('/person_ranking', (req, res, next) => {
    let season_id = req.query.season_id;
    let type = req.query.type;
    request({
        method: 'GET',
        url: personRankingUrl,
        qs: {
            season_id, type
        }
    }, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            let data = JSON.parse(body).content.data
            let personRankingArr = []
            data.forEach(ele => {
                let obj = {
                    person_logo: ele.person_logo,
                    person_name: ele.person_name,
                    team_name: ele.team_name,
                    count: ele.count
                }
                personRankingArr.push(obj)
            })
            res.json(personRankingArr)
        } else {
            res.json(err)
        }
    })
})

/**
 * 获取赛程信息
 */
router.get('/schedule', (req, res, next) => {
    let season_id = req.query.season_id;
    let gameweek = req.query.gameweek;
    request({
        method: 'GET',
        url: scheduleUrl,
        qs: { season_id }
    }, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            body = JSON.parse(body)
            // res.json(body)
            let rounds = body.content.rounds;
            let length = rounds.length;
            if (!gameweek) {
                let matchesArr = []
                let matches = body.content.matches;
                matches.forEach(ele=>{
                    let formatDate = moment(ele.start_play).add(8,'hours').format('YYYY-MM-DD HH:mm')
                    let obj = {
                        start_play: formatDate,
                        team_A_name: ele.team_A_name,
                        team_A_logo: ele.team_A_logo,
                        fs_A: ele.fs_A,
                        fs_B: ele.fs_B,
                        team_B_logo: ele.team_B_logo,
                        team_B_name: ele.team_B_name,
                        status: ele.status,
                        gameweek_total:length
                    } 
                    matchesArr.push(obj)
                })
                
                res.json(matchesArr)
            } else {
                gameweek = gameweek > length ? length : gameweek;
                let matchurl = rounds[gameweek - 1].url
                request(matchurl, (errer, response, body) => {
                    body = JSON.parse(body)
                    let matchesData = {
                        gameweek:gameweek,
                        gameweek_total:length,
                        matches:[]
                    }
                    let matches = body.content.matches;
                    matches.forEach(ele=>{
                        let formatDate = moment(ele.start_play).add(8,'hours').format('YYYY-MM-DD HH:mm')
                        // formatDate = formatDate.setHours(formatDate.getHours()+8)
                        let obj = {
                            start_play: formatDate,
                            team_A_name: ele.team_A_name,
                            team_A_logo: ele.team_A_logo,
                            fs_A: ele.fs_A,
                            fs_B: ele.fs_B,
                            team_B_logo: ele.team_B_logo,
                            team_B_name: ele.team_B_name,
                            status: ele.status,
                            gameweek:gameweek,
                            gameweek_total:length
                        } 
                        matchesData.matches.push(obj)
                    })
                    
                    res.json(matchesData)
                })
            }

        } else {
            res.json(err)
        }
    })
})

module.exports = router;