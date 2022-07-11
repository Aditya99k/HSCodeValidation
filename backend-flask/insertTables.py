#import pymssql
from msilib.schema import tables
from sqlalchemy import false
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
    pdf_path='C:/project/files/{}'.format(filename)
    tables=camelot.read_pdf(pdf_path,pages='all')
    total_tables = tables.n

    lis = []
    for i in range(total_tables):
        df = tables[i].df
        df.columns = df.iloc[0]
        df = df[1:]
        lis.append(df)

    result = pd.concat(lis)
    super_table = result
    super_table.columns = super_table.columns.str.replace(' ','_')
    rows = super_table.shape[0]
    list_filename = [filename] * rows
    super_table['filename'] = list_filename

    new_table = super_table
    exsisting = pd.read_excel('C:/project/files/DB.xlsx')
    if(len(exsisting) != 0):
        new_table = pd.concat([super_table,exsisting])

    new_table.to_excel('C:/project/files/DB.xlsx',index=False)
    return new_table    