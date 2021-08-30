import pandas as pd
import math  
import random 
pd.set_option('display.max_rows', None)

# DisponibilidadDocente tiene las siguientes columnas:
# Cedula - Lunes  - Martes - Miercoles - Jueves - Viernes - Sabado
# int    - string - string - string    - string - string  - string
# 06:00 - 09:00, 09:00 - 12:00, 13:00 - 16:00, 14:00 - 17:00, 15:00 - 18:00, 18:20 - 21:20, 18:20 - 22:20
def generarDisponibilidadDocente(cedulas):
    print()
    horas = ['06:00 - 09:00', '09:00 - 12:00', '13:00 - 16:00', '14:00 - 17:00', '15:00 - 18:00', '18:20 - 21:20', '18:20 - 22:20']
    df = pd.DataFrame()
    df['CEDULA'] = None
    df['LUNES'] = None
    df['MARTES'] = None
    df['MIERCOLES'] = None
    df['JUEVES'] = None
    df['VIERNES'] = None
    df['SABADO'] = None

    semana = [[],[],[],[],[],[]]
    horasDisponibles=[]
    for i in range(len(cedulas)):
        for j in range(len(semana)):
            horasDisponibles=horas.copy()
            for k in range(random.randint(3,5)):
                n = random.randint(0,len(horasDisponibles)-1)
                del horasDisponibles[n]
            semana[j].append(", ".join(horasDisponibles))
    df['CEDULA'] = cedulas
    df['LUNES'] = semana[0]
    df['MARTES'] = semana[1]
    df['MIERCOLES'] = semana[2]
    df['JUEVES'] = semana[3]
    df['VIERNES'] = semana[4]
    df['SABADO'] = semana[5]  
    print(df)    
    df.to_csv('dispo.csv', index=False,sep=";",mode='w')
    
    return 0




# ProgramacionAcademica tiene las siguientes columnas:
# plan - jornada  - semestre - codigo asig - nombre asig - cedula - nombre docente - intensidad - cupo
# int  - Diur/Noc - int      - xxxxxxA     - string      - int    - string         - int        - int

def generarProgramacionAcademica(docentes, asignaturas):
    #nombres = ['Kayley Wang', 'Jolene Jennings', 'Daanish Battle', 'Kristen Corrigan', 'Isobel Jefferson', 'Mica Parks', 'Yash Mullen', 'Lukasz Wheeler', 'Rebekka Cresswell', 'Bilaal Shaffer', 'Daisie Palmer', 'Isabel French', 'Gage Rosa', 'Alfie-Lee Stein', 'Ameen Salinas', 'Ariella Finnegan', 'Summer-Rose Kerr', 'Husnain Everett', 'Harriett Wainwright', 'Louise Mendez', 'Aurelia Lopez', 'Darryl Dillon', 'Nafisa Rutledge', 'Kelis Avery', 'Sophia Deleon', 'Ellenor Ashton', 'Bailey Bain', 'Yasser Franks', 'Marguerite Nunez', 'Rowan Hicks', 'Jaime Crossley', 'Amiyah Hurst', 'Iwan Emery', 'Abdulahi Hutchinson', 'Aleksandra Hirst', 'Ashlyn Whitehouse', 'Frederic Villarreal', 'Grayson Puckett', 'Lillie-Rose Woods', 'Herman Saunders', 'Ellie-Mai Calhoun', 'Felicity Dejesus', 'Eathan Firth', 'Saeed Conroy', 'Samah Mcarthur', 'Angel Sims', 'Vera Morton', 'Missy Mohammed', 'Jardel Wickens', 'Paloma Castro', 'Katey Norman', 'Vikki Michael', 'Marion Calvert', 'Zachariah Rees', 'Inaya Mckee', 'Herbie Phan', 'Isla-Rose Hyde', 'Corey Rennie', 'Abubakr Hunter', 'Ariah Sharples', 'Sianna Fountain', 'Fahmida Boyer', 'Lisa-Marie Obrien', 'Perry Goddard', 'Catriona Mora', 'Miriam Cardenas', 'Amelie Plant', 'Meerab Stephens', 'Annette Dawe', "Haydon O'Reilly", 'Arla Horne', 'Sanah Wynn', 'Jeff Mcnally', 'Amanda Rivas', 'Allison Cain', 'Jensen Murray', 'Moshe Berg', 'Brandon-Lee Vang', 'Morgan Dotson', 'Agnes Bellamy', 'Manon Hampton', 'Yasin Mckenna', 'Myah Bevan', 'Ella-Mai Mcfarland', 'Ahyan Pickett', 'Adriana Holder', 'Kyan Schneider', 'Taylah Nash', 'Ella-Rose Nieves', 'Antonio Mill', 'Jovan Ferrell', 'Saif Underwood', 'Ruari Maynard', 'Elspeth Read', 'Vernon Mair', 'Brady Kidd', 'Marie Wiley', 'Marta Magana', 'Nico Henderson', 'Huma Bowers','Dominic Thomas', 'Hillary Hull', 'Regan Medina', 'Maris Hendrix', 'Brandon Vinson', 'Quemby Rivas', 'Martin Knapp', 'McKenzie Salazar', 'Bree Foster', 'Rhea Chan', 'Priscilla Wolfe', 'Nayda Pickett', 'Kaseem Summers', 'Rhonda Sweet', 'Yeo Gallegos', 'Aurelia Ewing', 'Jeanette Vazquez', 'Quincy Douglas', 'Vladimir Reilly', 'Justina Nielsen', 'Tara Dickson', 'Ralph Freeman', 'Justina Valentine', 'Owen Combs', 'Jescie Pacheco', 'Lucian Dillard', 'Jelani Mckenzie', 'Nell May', 'Amela Vargas', 'Jason Hoover', 'Maya Jefferson', 'Illana Warren', 'Vaughan Powell', 'Tatyana Ferguson', 'Fletcher Lee', 'Quincy Jordan', 'Matthew Ortiz', 'Michelle Lindsey', 'Miranda Aguirre', 'Ashton Kramer', 'Kennan Robertson', 'Keely Craig', 'Orla Chavez', 'Joshua Mclaughlin', 'Kasimir Kane', 'Ferris Hubbard', 'Liberty Baldwin', 'Graham Vance', 'Abbot Mullen', 'Harper Holt', 'Harper Chang', 'Anika Griffin', 'Jaquelyn Mcleod', 'Shelley Dejesus', 'Rajah Burgess', 'Summer Powell', 'Flavia Nixon', 'Bruno Lowery', 'Germane Rocha', 'Dieter Stout', 'Tarik Burns', 'Carson Campbell', 'Sawyer Hudson', 'Axel Campos', 'Hector Logan', 'Gil Carlson', 'Caesar Jarvis', 'Sophia Baldwin', 'Maxwell Hicks', 'Grant Parks', 'Phoebe Vazquez', 'Gannon Mcknight', 'Lavinia Nolan', 'Sydnee Duffy', 'John Kirk', 'Channing Sykes', 'Channing Greer', 'Ciaran Harvey', 'Carl Blackburn', 'Kaitlin Camacho', 'Brandon Travis', 'Zia Stark', 'Buffy Robertson', 'Kieran Leach', 'Nadine Gallagher', 'Jasmine Chan', 'Grant Pickett', 'Cameron Strickland', 'Ora Haney', 'Benjamin Fitzgerald', 'Herrod Sanders', 'Audrey David', 'Calista Nielsen', 'Sloane Holland', 'Stewart Jacobson', 'Lillian Young', 'Charlotte Shannon', 'Xena Bonner', 'Donovan Mcintosh', 'Medge Anderson']
    
    df = pd.DataFrame()
    df['PLAN'] = None
    df['JORNADA'] = None
    df['SEMESTRE'] = None
    df['CODIGO'] = None
    df['NOMBRE'] = None
    df['CEDULA'] = None
    df['DOCENTE'] = None
    df['INTENSIDAD'] = None
    df['CUPO'] = None
    #print(df)
    plan = []
    jornada = []
    semestre = []
    codigo = []
    nombre = []
    cedula = []
    docente = []
    intensidad = []
    cupo = []
    contPlan = 2000
    jornadasDisponibles = ["DIURNA","NOCTURNA"]
    varJornada = jornadasDisponibles[random.randint(0,1)]
    varSemestre = 1
    materiasPorDocente = int(asignaturas / docentes)
    varDocente = 0
    #varCodigo = 100000
    print("materiasPorDocente",materiasPorDocente)
    for i in range(0,asignaturas):
        if(i%60 == 0):
            contPlan+=1
            varJornada = jornadasDisponibles[random.randint(0,1)]
            varSemestre = 0
        if(i%6 == 0):
            varSemestre +=1
        if(i % materiasPorDocente == 0):
            varDocente +=1
        plan.append(contPlan)
        jornada.append(varJornada)
        semestre.append(varSemestre)
        codigo.append(str(100000+i+1)+"M")
        nombre.append("Materia"+str(i+1))
        cedula.append(10000+varDocente)
        docente.append("docente"+str(varDocente))
        if(i%4==0):
            intensidad.append(random.randint(2,5))
        else:
            intensidad.append(random.randint(2,4))
        cupo.append(random.randint(25,50))
        
    df['PLAN'] = plan
    df['JORNADA'] = jornada
    df['SEMESTRE'] = semestre
    df['CODIGO'] = codigo
    df['NOMBRE'] = nombre
    df['CEDULA'] = cedula
    df['DOCENTE'] = docente
    df['INTENSIDAD'] = intensidad
    df['CUPO'] = cupo
    print(df)
    newCedula = []
    for i in range(0,len(cedula),materiasPorDocente):
        newCedula.append(cedula[i])
    generarDisponibilidadDocente(newCedula)
    df.to_csv('prog.csv', index=False ,sep=";",mode='w')
    
    return 0

generarProgramacionAcademica(100,400)


#data=pd.read_csv("prog.csv",sep=";",encoding='latin-1') 
#print(data)