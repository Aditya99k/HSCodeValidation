import React , {useState} from 'react'
import {Document ,Page} from 'react-pdf'

export default function SinglePage(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage(){
        changePage(-1);
    }

    function nextPage(){
        changePage(1);
    }

    const { pdf } = props;
    const searchRes = props.out;
    if(!pdf || searchRes === "Results will appear here..." || searchRes === "Please provide HS code" || searchRes === "Sorry , No match found")
     return <></>
    return (
        <div>
            <div align ="center" className='pageUpDown'>
                <p align = "center">
                    Page {pageNumber || (numPages ? 1 :"--")} of {numPages || "--"}
                </p>
            <button className='btngen' type='button' disabled = {pageNumber<=1} onClick={previousPage}>
              Previous
            </button>
            <button className='btngen' type='button' disabled={pageNumber>=numPages} onClick={nextPage}>
                Next
            </button>
            </div>
            <div className='App'>
                <Document
                 file={pdf}
                 onLoadSuccess = {onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber}/>
                </Document>
            </div>
        </div>
    ) ;
}