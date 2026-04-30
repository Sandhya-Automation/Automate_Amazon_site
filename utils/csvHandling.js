import fs from 'fs';
import {parse} from 'csv-parse/sync'

export function getCsvData(filePath)
{
    const data=fs.readFileSync(filePath,'utf-8')
    const csvData=parse(data, {columns:true, skip_empty_lines:true})
    return csvData;
}