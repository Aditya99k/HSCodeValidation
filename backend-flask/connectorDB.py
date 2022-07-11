# import pymssql
import tabula 
import pandas as pd
# from sqlalchemy import create_engine

def connectToDB():
    server = 'ADITYAKASHYAP-D:1433'
    user = 'root'
    password = 'root'
    database = 'SAMPLE_DB'

    conn = pymssql.connect(server, user, password, database)
    my_conn = create_engine('mssql+pymssql://'+ user +':' + password + '@' + server + '/' + database)
    cursor = conn.cursor()
    return [cursor,my_conn]  