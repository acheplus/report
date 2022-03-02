import { Button, Icon, Text } from '@chakra-ui/react';
import { mdiDownloadMultiple } from '@mdi/js';
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
        <Button bgColor='white' color='gray' border='1px' onClick={(e) => exportToCSV(csvData,fileName)}>
            <Icon><path fill='currentColor' d={mdiDownloadMultiple}></path></Icon>
            <Text>Salvar</Text>
            </Button>
    )
}