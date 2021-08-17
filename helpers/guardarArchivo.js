const fs = require('fs');
const archivo ="./db/data.json"
const guardarDB =(data)=>{
    fs.writeFileSync(archivo,JSON.stringify(data))
}
const leerDB = ()=>{
    if(!fs.existsSync(archivo)){
        return;
    }
    const info = fs.readFileSync(archivo,{encoding:"UTF-8"});
    const data = (info)?JSON.parse(info):[]
    // console.log(data);
    return data

}
module.exports = {guardarDB,leerDB}