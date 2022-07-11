import json
from operator import methodcaller
from unittest import result
from sqlalchemy import column
import tabula 
import pandas as pd
from flask import Flask, request,send_file,jsonify
from flask_cors import CORS
from insertTables import pushTablesToExcel
from pandasql import sqldf
from pdfmerge import combinePdf
import base64
import string
import io
import random
import os
import shutil
import os.path

app = Flask(__name__)
CORS(app)

# db_connection = connectToDB()
# cursor = db_connection[0]
# my_conn = db_connection[1]


@app.route('/')
def mainPage():
    return "Server started...."

@app.route('/uploadFileName',methods = ['GET'])
def uploadFileName():
    global filename
    filename = request.args.getlist('filename')[0]
    file_exists = os.path.exists('C:/HSCODEVALIDATION/files/{}'.format(filename))
    print(file_exists)
    if(file_exists):
        return 'true'
    return 'false'

@app.route('/upload',methods =['POST'])
def upload(): 
    str = request.files['file']
    str.save('C:/HSCODEVALIDATION/files/{}'.format(filename))
    #pushTablesToDB(my_conn)
    dfs = pushTablesToExcel(filename)
    return "POST hitted..."


@app.route('/search',methods = ['GET'])
def search():
        args = request.args
        hs_code = args.getlist('code')
        print(hs_code[0])
        dfs = pd.read_excel('C:/HSCODEVALIDATION/files/DB.xlsx')
        column_names = dfs.columns.values.tolist()
        if(column_names.count('HS_Code') == 0):
            return "Not found"
        query1 = 'select * from dfs where HS_Code = \'{}\''.format(hs_code[0])
        ans = sqldf(query1)

        if(len(ans) == 0):
            return "Not found"  
        # dic=ans.to_dict('dict')
        # print(dic)   
        dic1 = ans.to_dict('records')
        print(dic1)
        # print(dict_temp)
        # cursor.execute(query)
        # records = cursor.fetchall()
        # print('total rows found : ',len(records))
        # if(len(records) == 0):
        #     print('No matches found')
        # else:
        #     for row in records:
        #         print(str(row))
        return json.dumps(dic1)

@app.route('/pdfviewer',methods = ['GET'])
def pdfviewer():
    args = request.args
    searchfilename = args.getlist('searchResfilename')[0]
    with open ("C:/HSCODEVALIDATION/files/{}".format(searchfilename),"rb") as pdf_file:
        img = base64.b64encode(pdf_file.read())
    return send_file(io.BytesIO(img),attachment_filename="hello.pdf",as_attachment=True)    

@app.route('/mergeUpload',methods =['POST'])
def mergeUpload(): 
    str = request.files['pdfs']
    res = ''.join(random.choices(string.ascii_uppercase +
                             string.digits, k = 6))
    str.save('C:/HSCODEVALIDATION/mergedirectory/test{}.pdf'.format(res))
    # combinePdf()
    return "saved..."


@app.route('/combine',methods=['GET'])
def combine():
   combinePdf()
   dir = 'C:\HSCODEVALIDATION\mergedirectory'
   for f in os.listdir(dir):
        os.remove(os.path.join(dir,f))
   
   with open ("C:/HSCODEVALIDATION/backend-flask/final.pdf","rb") as pdf_file:
        img = base64.b64encode(pdf_file.read())
   return send_file(io.BytesIO(img),attachment_filename="hello.pdf",as_attachment=True)  

app.run(debug=True)
