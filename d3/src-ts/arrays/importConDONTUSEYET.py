#! /usr/bin/python
import sys

def getPath(subject,nested):
    ret=''
    go=False
    for i in subject:
        if(i==nested):
            go= not go
        elif(go):
            ret+=i
    return ret




def convertImport(fileName):
    with open(fileName) as src,open(fileName[:-2]+"ts",'w') as out:
        out.write('/// <reference path="../../d3.d.ts" />\n')
        for line in src:
            out.write('/// <reference path="'+getPath(line,'"')+'.ts" />\n')


if __name__ == "__main__":
        convertImport(sys.argv[1])
