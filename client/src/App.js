import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Tables from './components/Table'
import MergePDF from './components/MergePDF';
export const App = () => {
  
  const [buttonText,setbuttonText] = useState('Upload');
  const [searchRes,setSearchRes] = useState('Results will appear here..');
  let [table_columns,setTableColumn] = useState([]);
  let [table_data,setTableData] = useState([]);
  let [mergePDF,setMergePDF] = useState(false);
  let table_columns3; 
  let file = null;
 
  const uploadHandler = (event) =>{
     file = event.target.files[0];
        if(!file) return; 

    axios.get('http://127.0.0.1:5000/uploadFileName',{params :{"filename":file.name}}).then((res)=>{
      console.log(res.data);
      let k= res.data+'';
      if(k=='true')
      {
        console.log('file already exists');
        alert('file already exist')
        window.location.reload();
      }
      else
      {
        console.log('you can upload');
      }
    })

  }
  
  const submitHandler = (event) =>{
    event.preventDefault();
    if(!file){
      console.log("No file selected ...");
      return;
    }
    if(buttonText === 'Upload'){
      setbuttonText('Uploading.....')
    } 
    console.log(file); 


    const data = new FormData();
    data.append('file',file);
    fetch('http://127.0.0.1:5000/upload',{
      method: 'POST',
      body:data,
     }).then((res)=>{
      console.log(res);
      if(res.ok){
        event.target.style.backgroundColor = '#4CAF50';
        setbuttonText('Uploaded');
      }else{
        event.target.style.backgroundColor = '#f51919';
        setbuttonText('Failed');
      }
      
    },(error) =>{
      console.log(error);
      event.target.style.backgroundColor = '#f51919';
      setbuttonText('Failed');
    })
   }
    
  const searchHandler = (event) =>{
    event.preventDefault();
    const code = document.getElementById("search-bar").value;
    if(!code){
      console.log("No HS code provided...")
      setSearchRes('Please provide HS code')
      return;
    }
    console.log("code is :",code);
    axios.get('http://127.0.0.1:5000/search',{params :{"code":code}}).then((res) => {
      console.log(res);
      let str = ""
      if(res.data === "Not found"){
        setSearchRes("Sorry , No match found");
        return;
      }
      
        
        table_columns = []
        table_data = []
        table_columns3 = []
        let dic2={},dic3={}
        for(var i=0;i<res.data.length;i++){

          let dic = {};
          let demodic = {}
          console.log(res.data[i])
          Object.entries(res.data[i]).forEach(([key,value]) => {
            if(!key.startsWith("Unnamed") && value != null){
              dic = {}
              str += key + " : " + value + "\n";
              dic["heading"] =key;
              dic["value"]=key
              let k = key + '';

              demodic[key] = value;
              dic2[key] = key;
            }

          });
          table_columns.push(dic);
          table_data.push(demodic);
        }
        console.log("print dic")
        console.log(dic2)

          Object.entries(dic2).forEach(([key,value]) => {
            dic3={};
            dic3["heading"] =key;
            dic3["value"]=key;
            table_columns3.push(dic3)
          });
          console.log("i m column3")
          console.log(table_columns3)
              console.log(table_data)
              setTableColumn(table_columns3)

              setTableData(table_data)

              console.log(table_columns)
              setSearchRes("Result Table")
        },(error) => {
          console.log(error);
        });

  }  
   
  const removeHandler = (event)=> {
    window.location.reload();
  }   
  
  const MergePDFHandler = (event) => {
    event.preventDefault();
    setMergePDF(true)
  }
  




  if(mergePDF){
    return(
      <MergePDF/>
    )  
  }
  
  return (
    <div>
         <h1 align ='center'>Upload PDF and search interface</h1>
         <hr></hr>
         <form align='center'>
            <input type="file" className="choosefile" accept="application/pdf" onChange={uploadHandler} required />
            <button className="btngen" type="submit" onClick={submitHandler}>{buttonText}</button>
            <button className="btnrem" type="submit" onClick={removeHandler}>Remove</button>
            <button className="btnmerge" type="submit" onClick={MergePDFHandler}>MergePDF</button>
         </form>
         <hr></hr>
         <h3 align ='center'>Enter the HS code to search</h3>
         <form align='center'>
         <input type="text" id="search-bar"></input>
         <button className="btngen" onClick={searchHandler}>Search</button>
         </form>
         <h4 className="search-res" align='center'>Search results : </h4>
         <pre className='answer'>{searchRes}</pre>
         <Tables data={table_data} column = {table_columns} flag={searchRes}/>
    </div>
  )
}

export default App;
