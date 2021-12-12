import { Button, Icon } from '@chakra-ui/react';
import * as FileSaver from 'file-saver'
import { FaDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx'

export default function ExportXls({csvData, fileName}) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData.map(row => row.original));
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button colorScheme='gray' onClick={(e) => exportToCSV(csvData,fileName)}>Salvar <Icon as={FaDownload}></Icon></Button>
    )
}