# #import pymssql
from msilib.schema import tables
# from sqlalchemy import false
import tabula 
import camelot
import pandas as pd
# from sqlalchemy import create_engine

# def pushTablesToDB(my_conn):
#     pdf_path='C:/project/files/test_new.pdf'
#     dfs=tabula.read_pdf(pdf_path,pages='all')
#     no_of_tables = len(dfs)
#     print(no_of_tables)
#     result = pd.concat(dfs)
#     desired_width = 320
#     pd.set_option('display.width',desired_width)
#     pd.set_option('display.max_columns',20)
#     result.columns = result.columns.str.replace(' ','_')
#     result.to_sql("mergedtable",my_conn,if_exists='replace')

def pushTablesToExcel(filename):
    pdf_path='C:/HSCODEVALIDATION/files/{}'.format(filename)
    dfs=tabula.read_pdf(pdf_path,pages='all',stream=False)
    no_of_tables = len(dfs)
    print(no_of_tables)
    result = pd.concat(dfs)
    desired_width = 320
    pd.set_option('display.width',desired_width)
    pd.set_option('display.max_columns',20)
    result.columns = result.columns.str.replace(' ','_')
    result.to_excel('C:/HSCODEVALIDATION/files/DB.xlsx')
    return result