import {test} from "@playwright/test"
import fs from 'fs';

const dataarray=["sandhya.vanga","amazon"]
const filePath="testData/creds.json"
const data=JSON.parse(fs.readFileSync(filePath,'utf-8'))
//fs is file syatem, 

test.skip("array", async() =>{
    console.log(dataarray)
    console.log(dataarray[0])
    console.log(dataarray[1])

})
test.skip("json", async() =>{
    console.log(data)
    console.log(data.username)
    console.log(data.products.productname)
})

test.skip("commandLine", async() =>{
    const us1=process.env.usn
    const pw1=process.env.pwd
    console.log(us1)
    console.log(pw1)
})

//data parameterisation
//multi dimensional array
//to regularise out test case we need to use $ symbol- ${i}

const arr=[["us1","pw1","success"],["us2","pw2","unsuccess"],["us3","pw3","success"]]
//method 1
for(let i=0;i<arr.length;i++){

    test("data parameterisation", async() =>{
    console.log(arr[i][0])
    console.log(arr[i][1])
    console.log(arr[i][2])
})
}