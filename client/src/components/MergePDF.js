import React ,{useState} from 'react';
import PDFViewer from './PDFViewer'
import axios from 'axios';
export const MergePDF = () =>{

    let [file2,setFile2] = useState(null);
    let pdfs = null;

  const uploadHandler = (event) =>{
    pdfs = event.target.files
  }
  const submitHandler = (event)  =>{
    event.preventDefault();
    if(!pdfs){
        console.log("No file selected ...");
        return;
    }
    
    for(var i=0;i<pdfs.length;i++){
        const data = new FormData();
        data.append('pdfs',pdfs[i]);
        fetch('http://127.0.0.1:5000/mergeUpload',{
        method: 'POST',
        body:data,
        }).then((res)=>{
        console.log(res);
        event.target.style.backgroundColor = '#4CAF50'
        },(error) =>{
        console.log(error);
        })
    }
    
  } 
  const MergeHandler = (event) =>{
    event.preventDefault();
    axios.get('http://127.0.0.1:5000/combine',{params :{"merge":"mergeParams"}}).then((res) => {

    const byteCharaters = atob(res.data);
    const byteNumbers = new Array(byteCharaters.length);
    for(let i=0;i<byteCharaters.length;i++){
      byteNumbers[i] = byteCharaters.charCodeAt(i);
    }
    const byteArray= new Uint8Array(byteNumbers);

     let image = new Blob([byteArray],{type : 'document/pdf'});
     const code = "mergedfile"
     var FileSaver = require('file-saver');
     FileSaver.saveAs(image, code+".pdf");
     let imageURL = URL.createObjectURL(image);
    setFile2(imageURL);
    event.target.style.backgroundColor = '#4CAF50'
    },(error) => {
      setFile2(null);
    });
  }
  return (
    <div>
    <h2 align='center'>Merge PDFs</h2>
    <hr></hr>
    <form align='center'>
    <input type="file" className="choosefile" accept="application/pdf" onChange={uploadHandler} required multiple></input>
    <button className="btngen" onClick={submitHandler}>save PDFs</button>
    <button className="btnrem" onClick={MergeHandler}>Merge</button>
    <hr></hr>
    </form>
    <PDFViewer filename = {file2}/>
    </div>
  )
}

export default MergePDF;
