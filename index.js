import fs from 'fs'


fs.readFileSync('./page.json',(data,err)=>{
        console.log(data)
})