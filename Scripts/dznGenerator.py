# -*- coding: utf-8 -*-
"""
Created on Tue Aug 25 10:39:44 2020

@author: Usuario
"""
import re
import pandas as pd
import numpy as np

pd.set_option('max_columns', None)

def generarDH():
    data=pd.read_csv("prog.csv",sep=";",encoding='latin-1') 
    df=pd.DataFrame(data)
    df=df.sort_values(by=["PLAN","SEMESTRE"])
    #plan - jornada - semestre - codigo asig - nombre asig - cedula - nombre docente - intensidad - cupo
    ###df=df.iloc[:, [0,1,2,3,4,5,7,8,14,17]]
    #63:109
#    print(df)
    datad=pd.read_csv("dispo.csv",sep=";",encoding='latin-1') 
    dd=pd.DataFrame(datad)
    ###dd=dd.iloc[:, [4,14,15,16,17,18,19]]

#    datad=pd.read_csv("dispo.csv",sep=";",encoding='latin-1') 
#    dd=pd.DataFrame(datad)
#    dd=dd.iloc[0:, [3,20,21,22,23,24,25]]
#    dd = dd.rename(columns={'Disponibilidad [Lunes].1': 'L',
#                            'Disponibilidad [Martes].1': 'M',
#                            'Disponibilidad [Miercoles].1': 'X',
#                            'Disponibilidad [Jueves].1': 'J',
#                            'Disponibilidad [Viernes].1': 'V',
#                            'Disponibilidad [Sabado].1': 'S'})
#    #print(dd)
    print("dd ANTES",dd)
    asig=len(df)    
    doc=len(df.drop_duplicates(subset=['CEDULA']))    
    df2=df.drop_duplicates(subset=['CEDULA']).copy().sort_values(by=["CEDULA"])
    dd = pd.merge(dd, df2[["CEDULA"]], how ='inner', on =['CEDULA'])
    print("DF ",df)
    print("dd despues",dd)
    """
    ########################
    data=pd.read_csv("prog2.csv",sep=";",encoding='latin-1') 
#    print(data)
    data=data.sort_values(["PLAN","SEMESTRE"])
#    print(data)
#    df1=data.loc[data["PLAN"]==3743,["PLAN","SEMESTRE","GR S","JORNADA","INTENSIDAD",
#             "CODIGO","CEDULA"]].sort_values(by=["SEMESTRE"]).copy()
    df1=data.loc[(data["PLAN"]<=plan) & (data["PLAN"]>=plen) & (data["SEMESTRE"]<=sem),["PLAN","SEMESTRE","GR S","JORNADA","INTENSIDAD",
             "CODIGO","CEDULA"]].sort_values(by=["SEMESTRE"]).copy()
    
    df= df1.groupby(['CODIGO',"GR S"])['INTENSIDAD'].transform('sum').copy()
    df1a=df1.drop_duplicates(subset=['CODIGO', 'GR S'])#.sort_values(by=["SEMESTRE"]).copy()
    df1a= df1a.merge(df, left_index=True, right_index=True)
    df1a= df1a.iloc[:,[0,1,2,3,7,5,6]]
    asig=len(df1a)
    df2=data.loc[(data["PLAN"]<=plan) & (data["PLAN"]>=plen) & (data["SEMESTRE"]<=sem),["CODIGO","SEMESTRE","CEDULA","DOCENTE"]]
    df2=df2#.sort_values(by=["SEMESTRE"])
    dfd=df2.drop_duplicates(subset=['CEDULA']).copy()
    #print(dfd)
    doc=len(dfd)
    ######################################
    """
    text_file = open("DataHorariosS.dzn", "w") 
    #text_file.write("diurno = {1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10 ,11 ,12};\n")
    text_file.write("diurno = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92};\n")
                                
    #text_file.write("nocturno = {0 ,13 ,14 ,15 };\n")
    text_file.write("nocturno = {13, 14, 15, 16, 29, 30, 31, 32, 45, 46, 47, 48, 61, 62, 63, 64, 77, 78, 79, 80, 93, 94, 95, 96};\n")
                               

    text_file.write("H = 96;\n")
    text_file.write("asignaturas = %s;\n" % asig)
    text_file.write("docentes = %s;\n" % doc)

    text_file.write("\nA=[|")
    ##########CONTINUAR DESDE AQUI; CAMBIAR LOS PRINT POR WRITE
    """for i in df.iterrows():
    if(i[1][1].strip()=="DIURNA"):a="0"
    if(i[1][1].strip()=="NOCTURNA"):a="1"
    print(str(i[1][0]),end=", ")
    print(str(i[1][2]),end=", ")
    print(str(i[1][3]),end=", ")
    print(str(i[1][5]),end=", ")    
    print(a,end=", ")
    print(str(i[1][8]),end="\n|")"""
    for i in df.iterrows():
#        print(i[1][3])
        #print("ERROR",i[1])
        if(i[1][1].strip().startswith("DIURN")):a="0"
        if(i[1][1].strip().startswith("NOCTUR")):a="1"
        text_file.write(str(i[1][0]))
        text_file.write(", ")
        text_file.write(str(i[1][2]))
        text_file.write(", ")
        text_file.write(str(i[1][3]).strip()[:-1])
        text_file.write(", ")
        text_file.write(str(i[1][5]))
        text_file.write(", ")
        text_file.write(a)
        text_file.write(", ")
        text_file.write(str(i[1][7]))
        text_file.write("\n|")
    text_file.write("];\n")
#    print(dfd)
    Da=[[] for i in range(len(dd))]
    p=-1
    for i in dd.iterrows():
        p+=1
        a=0
        for j in df.iterrows():
            a+=1
            #print(i[1][0],j[1][6])
            if(i[1][0]==j[1][5]):#if(i[1][0]==j[1][6]):
                Da[p].append(a)
    Ad=[0]*asig
    print(df,len(df))
#    print(dfd)
#    print(df1a)
#    print(asig)
    print(Da)
#    print(Ad)
    text_file.write("Da=[")
    for i in range(len(Da)):
        text_file.write("{ ")
        for j in range(len(Da[i])):
            if(j==len(Da[i])-1):
                text_file.write(str(Da[i][j]))
                Ad[Da[i][j]-1]=i+1
                if(i==len(Da)-1):text_file.write("}\n")
                else:text_file.write("},\n")
#                print(Da[i][j]-1)
                
            else:
                text_file.write(str(Da[i][j]))
                text_file.write(", ")
                Ad[Da[i][j]-1]=i+1
    text_file.write("];\nAd=[")
    for i in range(len(Ad)):
        if(i==(len(Ad)-1)):
            text_file.write(str(Ad[i]))
        else:
            text_file.write(str(Ad[i]))
            text_file.write(", ")        
    text_file.write("];\n")    
    text_file.write("D=[|")
    
#    df15=data.loc[data["PLAN"]==3743,["CODIGO","GR S","CEDULA","FRANJA HORARIA","DIA","INTENSIDAD","ENTRADA"]]
#    df15=data.loc[:,["CODIGO","GR S","CEDULA","FRANJA HORARIA","DIA","INTENSIDAD","ENTRADA"]]
#    DDD=[[False]*doc]*96
    D=np.zeros((96, doc), dtype=bool)
#    print(D)
    dia=["lunes","martes","miércoles","jueves","viernes","sábado"]
    #print(dia.index("lunes"))
    print("\n\n")
    
#    print(df15)
    pro=-1
    
    for i in dd.iterrows():
        #print(pro"EROROR CON INDEX PRO REVISAR EL DROP DUPLICATE AL INICIO")
        pro+=1
        #print("pro",pro)
        diasp=[i[1][1],i[1][2],i[1][3],i[1][4],i[1][5],i[1][6]]
#        print()
        #print(diasp)
        diaact=-1
        for j in diasp:
            diaact+=1
            if(type(j)==str):
                s=re.split(', |,\n|, \n|\n| - |,',j)
                #print(s)
                while("" in s):
                    s.remove("")
                    #print(s)
                while(" " in s):
                    s.remove(" ")
                    #print(s)
                #print(dia[diaact])
                for k in range(0,len(s),2):
                    if(s[k]!=""):
                        #print(s[k][0:2],"-",s[k+1][:-3],end="   ")
                        #print(i[1][0])
                        ini=int(s[k][0:2])-6+(diaact*16)
                        fin=int(s[k+1][:-3])-6+(diaact*16)
                        #print("INFIN",ini,fin,end="---")
                        for ifi in range(ini,fin):
                        #    print("er",range(ini,fin),D[ifi][pro])
                            D[ifi][pro]=True
                    
    for i in range(96):
        for j in range(doc):
            if(D[i][j]):
                text_file.write(str(D[i][j]).lower()+" ")
            else:
                text_file.write(str(D[i][j]).lower())
            if(j<doc-1):text_file.write(",  ")
        text_file.write("\n|")
    text_file.write("];")
    text_file.close()
    print("Data generado")
    #print(dd,df)
    

generarDH()





def generarDS():
    N=96
    S=24
    sem=10
    plan=3845
    plen=2710
            
    data=pd.read_csv("prog2 - copia.csv",sep=";",encoding='latin-1') 
    ####data=data.sort_values(["PLAN","SEMESTRE"])
    
#    print(data)
#    df1=data.loc[data["PLAN"]==3743,["PLAN","SEMESTRE","GR S","JORNADA","INTENSIDAD",
#             "CODIGO","CEDULA"]].sort_values(by=["SEMESTRE"]).copy()
    #####df1=data.loc[(data["PLAN"]<=plan) & (data["PLAN"]>=plen) & (data["SEMESTRE"]<=sem),["PLAN","SEMESTRE","GR S","JORNADA","INTENSIDAD",
    #####     "CODIGO","CEDULA","SALON","CUPO"]].sort_values(by=["SEMESTRE"]).copy()
    #####df= df1.groupby(['CODIGO',"GR S"])['INTENSIDAD'].transform('sum').copy()
    #df1a=df1.drop_duplicates(subset=['CODIGO', 'GR S']).sort_values(by=["SEMESTRE"]).copy()
    #####df1a=df1.drop_duplicates(subset=['CODIGO', 'GR S'])#.sort_values(by=["SEMESTRE"]).copy()
    #####df1a= df1a.merge(df, left_index=True, right_index=True)
    #####print(df1a)
    #####print(len(df1a))
    df1a= data.iloc[:,[3,2,10,17]]
    print(df1a)
#    df1=data.loc[data["PLAN"]==2710,["CODIGO","SEMESTRE","SALON","CUPO"]]
#    df1=df1.sort_values(by=["SEMESTRE"])
    text_file = open("DataSalones12.dzn", "w") 
    text_file.write("Recursos=[SalaSistemas, VideoBean, Ninguno];\n")
    text_file.write("sede=17;\n")
    text_file.write("salones=24;\n")
    text_file.write("Sc=[50,50,35,27,50,50,50,50,50,60,60,60,60,35,40,40,35,45,24,55,55,45,36,50];\n")
    text_file.write("Sr=[SalaSistemas, SalaSistemas, VideoBean,VideoBean,VideoBean, VideoBean,VideoBean, VideoBean,VideoBean, VideoBean,VideoBean, VideoBean,VideoBean, VideoBean,VideoBean, VideoBean,VideoBean, VideoBean,VideoBean, VideoBean,VideoBean, VideoBean,VideoBean, SalaSistemas];\n")
    text_file.write("N=96;\n")
    text_file.write("ini=1;\n")
    text_file.write("fin= %s;\n" % len(df1a))
    text_file.write("Asig= %s ;\n" % len(df1a))
    s="Ar=["
    for row in df1a["SALÓN"]:
        if(row=="SALA"):
            s+="SalaSistemas,"
            #text_file.write("VideoBean,")
        else:
            s+="VideoBean,"
            #text_file.write("SalaSistemas,")
    s=s[:-1]
    s+="];\n"
    text_file.write(s)
    s="Ae=["
    for row in df1a["CUPO ASIGNATURA"]:
        s+=str(row)
        s+=","
    s=s[:-1]
    s+="];\n"
    text_file.write(s)
    text_file.write("\nSAI=[|")
    for i in range(N):
        for j in range(S):
            if(j==S-1):
                text_file.write("0 ")
            else:
                text_file.write("0, ")
        text_file.write("\n|")
    text_file.write("];")
    text_file.write("\n")
#    text_file.write(dfd.to_string())
    text_file.close()
    print("Data generado")
#generarDS()
def ejecutarModelo():
    #os.system('cmd /k "minizinc SalonesGC.mzn DataSalones.dzn -o ej.txt"')
    tf = open("ej.txt", "r")
    s=""
    for i in tf.readlines():
        s+=i
    s=s.split("\n")[:-4]
#    for i in s:
#        print(i)
    tf.close()
    df = open("DataSalones.dzn", "r")
    ds=""
    for i in df.readlines():
        ds+=i
    ds=ds.split("\n")
    for i in ds:
        print(i)
    df.close()

#ejecutarModelo()    

def LeerPD():
    
    data=pd.read_csv("pruebaDo.csv",sep=";",encoding='latin-1') 
    #df=data.loc[(data["CC"]>=0),["CC","Lunes","Martes","Miercoles","Jueves",
     #        "Viernes","Sabado"]].sort_values(by=["CC"]).copy()
    dat=data.iloc[:,[1,5,6,7,8,9,10]]
    for i in dat.iterrows():
        s=i[1][1].split(", ")
        for j in s:
            s1=j.split(" - ")
            print("Lunes: ",int(s1[0][:2]),int(s1[1][:2]))
            
    #print(dat)
    
#LeerPD()