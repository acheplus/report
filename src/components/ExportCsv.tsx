import React from 'react'
import { Button, Icon } from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa'


export default function ExportCSV ({csvData, headers}) {
   
    function ConvertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                if(typeof(array[i][index]) == "boolean"){
                    line += array[i][index] != '' ? "Sim" : 'Não';
                } else {
                    line += array[i][index] != '' ? array[i][index] : '-';
                }
            }

            str += line + '\r\n';

        }

        return str;
    }
    
    function exportCsv() {
        let csvtemp = csvData.map(data => data.original)
        let csv = ConvertToCSV(JSON.stringify(csvtemp))
        window.open("data:text/csv;charset=iso-8859-1," + escape(headers.map(e=>e.Header)) + escape("\n") + escape(csv))
    }

    return (
        <Button onClick={exportCsv}><Icon as={FaDownload}></Icon></Button>
    )
}