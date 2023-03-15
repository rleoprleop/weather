function readjson(){
    const dataBuffer=fs.readFileSync('data/data.json')
    const dataJson=dataBuffer.toString()
    var user=JSON.parse(dataJson)
    console.log(user);
    return user
}

export {readjson}
