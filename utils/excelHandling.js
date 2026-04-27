import XLSX from 'xlsx'

export function getExcelData(filePath){
    
        const workBook=XLSX.readFile(filePath)
        const sheet=workBook.Sheets["Sheet1"]
        const excelData=XLSX.utils.sheet_to_json(sheet)
        return excelData;
}