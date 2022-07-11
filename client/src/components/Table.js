import './Table.css';
import axios from 'axios';
import React ,{useState} from 'react';
import PDFViewer from './PDFViewer';

let linkopen;

const Table = ({ data, column ,flag}) => {

  let [file2,setFile2] = useState(null);


  linkopen = (event,params) => {



    axios.get('http://127.0.0.1:5000/pdfviewer',{params : {"searchResfilename" : params}}).then((res) => {
      const byteCharaters = atob(res.data);
      const byteNumbers = new Array(byteCharaters.length);
     for(let i=0;i<byteCharaters.length;i++){
       byteNumbers[i] = byteCharaters.charCodeAt(i);
     }
     const byteArray= new Uint8Array(byteNumbers);

    let image = new Blob([byteArray],{type : 'document/pdf'});
    let imageURL = URL.createObjectURL(image);
    setFile2(imageURL);
    },(error) => {
      setFile2(null);
    });
  }
  if(flag === "Please provide HS code" || flag === "Sorry , No match found" || flag === "Results will appear here..")
   return (<></>)

  return (
    <>
    <table>
      <thead>
        <tr>
          {column.map((item, index) => <TableHeadItem item={item} />)}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => <TableRow item={item} column={column} />)}
      </tbody>
    </table>
    <div>
      <PDFViewer filename={file2}/>
    </div>
    </>
  )
}



const TableHeadItem = ({ item }) => <th>{item.heading}</th>
const TableRow = ({ item, column }) => (
  <tr>
    {column.map((columnItem, index) => {

      if(columnItem.value.includes('.')) {
        const itemSplit = columnItem.value.split('.') //['address', 'city']
        return <td>{item[itemSplit[0]][itemSplit[1]]}</td>
      }
      if(`${columnItem.heading}` === "filename")
        return <td className='link' onClick={event => linkopen(event,item[`${columnItem.value}`])}>{item[`${columnItem.value}`]}</td> 
      return <td>{item[`${columnItem.value}`]}</td>
    })}
  </tr>
)

export default Table