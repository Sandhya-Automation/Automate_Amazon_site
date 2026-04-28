import {test} from "@playwright/test"
import fs from 'fs';
import {parse} from 'csv-parse/sync'
import XLSX from 'xlsx'
import {getCsvData} from "../utils/csvHandling.js"
import {getExcelData} from "../utils/excelHandling.js"



const dataarray=["sandhya.vanga","amazon"]

//fs is file syatem, 
//////////////////////////////////////Array/////////////////////////////
test("array", async() =>{
    console.log(dataarray)
    console.log(dataarray[0])
    console.log(dataarray[1])

})

//////////////////////////////////////json/////////////////////////////
test.only("json", async() =>{
    const filePath="testData/creds.json"
    const data=JSON.parse(fs.readFileSync(filePath,'utf-8'))
    console.log(data)
    console.log(data.username)
    console.log(data.products.productname)
})

//////////////////////////////////////Command line/////////////////////////////
test("commandLine", async() =>{
    const us1=process.env.URL
    //const pw1=process.env.pwd
    console.log(us1)
    //console.log(pw1)
})

//data parameterisation
//multi dimensional array
//to regularise out test case we need to use $ symbol- ${i}
//////////////////////////////////////Data parameterisation/////////////////////////////
// const arr=[["us1","pw1","success"],["us2","pw2","unsuccess"],["us3","pw3","success"]]
// //method 1
// for(let i=0;i<arr.length;i++){

//     test("data parametarisation", async() =>{
//     console.log(arr[i][0])
//     console.log(arr[i][1])
//     console.log(arr[i][2])
// })
// }

//////////////////////////////////////csv/////////////////////////////
//csv is comma seperated values.
//npm install csv-parse
test("csv handling", async()=>{

    const file="testData/creds_csv.csv"
    const data=fs.readFileSync(file,'utf-8')
    const csvData=parse(data, {columns:true, skip_empty_lines:true})
    console.log(csvData[0].products)
    console.log(csvData[0].how_many)


})
test("csv handling1", async()=>{
    const file="testData/creds_csv.csv"
    const data=getCsvData(file)
    console.log(data[1].products)
    console.log(data[1].how_many)

})
    
//////////////////////////////////////Excel/////////////////////////////
//npm install xlsx
test("excel handling", async()=>{
    const file="testData/creds_xlsx.xlsx"
    const workBook=XLSX.readFile(file)
    const sheet=workBook.Sheets["Sheet1"]
    const excelData=XLSX.utils.sheet_to_json(sheet)
    console.log(excelData[0].Username)
    console.log(excelData[0].Password)

})

test("excel handling1", async()=>{
    const file="testData/creds_xlsx.xlsx"
    const data=getExcelData(file)
    console.log(data[1].Username)
    console.log(data[1].Password)
})