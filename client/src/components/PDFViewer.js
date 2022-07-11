import React , {useState} from 'react';
import SinglePagePDFViewer from './single-page';
import axios from 'axios'

const PDFViewer = ({filename}) => {

    return (
        <div>
            <SinglePagePDFViewer pdf= {filename} />
        </div>
    )
}
export default PDFViewer