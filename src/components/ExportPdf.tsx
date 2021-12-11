import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Button, Icon } from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa';
// Create styles
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
    //   padding: 10,
        flexDirection: 'row',
    },
    text: {
        width: 100,
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
      },
});

export default function ExportPdf({csvData, headers}) {
    const rowsData = csvData.map(data => data.original?.values ) 
    // Create Document Component
    const MyDocument = () => (
        <Document title='Lista em PDF' creator='acheplustecnologia'>
            <Page size="A4" style={styles.page} orientation='landscape' debug={true}>
                <View style={styles.section} debug={true}>
                    {
                        headers.map((header, i) => (
                            <Text key={i} style={styles.text}>{header.Header}</Text>
                        ))
                    }
                </View>
                <View style={styles.section} debug={true}>
                    {
                        csvData.map((row, i) => {
                            console.log(row.original)
                            return (
                                
                                        // row.map((cell) => (
                                            <Text key={i} style={styles.text}>
                                                {typeof(row.original)}
                                            </Text>
                                        //     )
                                        // )
                                    
                                
                            )
                            
                        })
                    }
                </View>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
    return (
        <PDFDownloadLink document={<MyDocument />} fileName='download.pdf'><Icon as={FaDownload}></Icon></PDFDownloadLink>
    )
  
}