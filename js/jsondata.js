var request = require('request')
var fs = require('fs')

function getUrl(key, date, time, x, y) {
    var url1='http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'//초단기 실황
    var url2='http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'//초단기 예보
    var url3='http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'//단기 예보
    var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'+'?serviceKey=' + key + '&numOfRows=15&pageNo=1&dataType=JSON&base_date=' + date + '&base_time=' + time + '&nx=' + x + '&ny=' + y
    return url
}



function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

function getTime() {
    var date = new Date();
    let hour = date.getHours()-1;
    if(hour<0){
        hour=23
    }
    let minute = date.getMinutes();

    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;

    return hour + minute;
}

function setTime() {
    var time = getTime() - 100
    time = time >= 1000 ? time : '0' + time
    return time
}

function getdatajson(a,b,c) {
    const dataBuffer = fs.readFileSync('./public/data/data.json')
    const dataJson = dataBuffer.toString()
    var user = JSON.parse(dataJson)
    var pos = user.filter(d => d.section1 == a && d.section2 == b && d.section3 == c)

    console.log(pos[0])
    return pos[0]
}

function getApi() {
    var key = 'EFHEzjBkBbkp8n6QBL%2BpJCv5FhcrJ2IItzP2rvkJmxia%2FX2DLBX5lELTfwP0fuwkrjW0D7h3xE54VdlI%2FraWjA%3D%3D'
    var date = getToday()
    var time = getTime()

    //post로 받아야하는곳
    var section1 = '서울특별시'
    var section2 = '노원구'
    var section3 = '월계1동'
    

    var posdata = getdatajson(section1,section2,section3)

    var x = posdata.sectionX
    var y = posdata.sectionY

    var url = getUrl(key, date, time, x, y)
    console.log(url);

    const options = {
        uri: url,
    };
    request(options, function (err, response, body) {
        var data = JSON.parse(body)
        console.log(data.response.body.items);
    })
}

getApi()