import os
from PyPDF2 import PdfFileMerger

def combinePdf():
    pdfs = os.listdir(r'C:/HSCODEVALIDATION/mergedirectory')
    merger = PdfFileMerger(strict=False)
    path_with_file = ""
    for file in pdfs:
        if file.endswith(".pdf"):
            path_with_file = os.path.join(r'C:/HSCODEVALIDATION/mergedirectory', file)
            print(path_with_file)
            merger.append(path_with_file)   
    merger.write("final.pdf")
    # os.remove(file)        
    merger.close()        
        