int:docentes;
set of int: dias=0..5;
set of int: doc=1..docentes;
int:H;
set of int: horas=1..H;
set of int: dasi=1..5;
array[horas,doc] of var bool: D;
array[doc,dasi] of var 0..asignaturas: Da;
set of int: diurno;
set of int: nocturno;
int:asignaturas;
set of int: asi=1..asignaturas;
array[asi,dasi] of var int: A;
array[asi] of var doc: Ad;
%array[asi] of var bool: falta;
array[horas,asi] of var bool: C;
constraint forall(a in asi)(sum(h in horas where C[h,a])(1) = A[a,5]); %intensidad

predicate diur(array[horas] of var bool: hor, var int: inten) =
               (sum(h in horas where (h mod 16) in diurno /\ hor[h])(1) = inten);
               
predicate noc(array[horas] of var bool: hor, var int: inten) =
               (sum(h in horas where (h mod 16) in nocturno /\ hor[h])(1) = inten);  
                            
constraint forall(a in asi)(if A[a,4]=0 then diur(col(C,a),A[a,5])
                                        else noc(col(C,a),A[a,5]) endif);%tipo noc diu para cada asig

%%REVISAR LA SIGUIENTE RESTRICCION
constraint forall(d in dias, a in asi)(let {var int: s=sum(h in horas where (h-1) div 16 = d /\ C[h,a])(1)} in
                                        (s=0 \/ if A[a,5]<=3 then s=A[a,5] 
                                                            else if A[a,5]=4 then s=2 \/ (s=4 /\ junto(col(C,a),d))  
                                                                            else s=2 \/ s=3 endif endif));
constraint forall(a in asi, h in 2..H-1 where A[a,5]!=1)(C[h,a] -> (C[h+1,a] \/ C[h-1,a]));
predicate junto(array[horas] of var bool: hor, var int: di) =
               (forall(h in 4..H-4 where (h-1) div 16 = di /\ hor[h])((hor[h] /\ hor[h+3])\/(hor[h+1] /\ hor[h-1])\/(hor[h] /\ hor[h-3])));  

constraint forall(h in horas, a in asi)(C[h,a] -> D[h,Ad[a]]);

constraint forall(d in doc)(forall(h in horas)
                                   (sum(a in row(Da,d) where a!=0)(if C[h,a] then 1 else 0 endif) <=1));
                                   
constraint forall(x,y in asi where x<y /\ A[x,1]=A[y,1] /\ A[x,2]=A[y,2])
                      (forall(h in horas where C[h,x])(C[h,x]!=C[h,y]));
var int: obj1;
constraint obj1=sum(h in horas, a in asi where C[h,a] /\ ((h mod 16) = 7 \/ (h mod 16) = 8))(1);
var int: obj2;
constraint obj2=sum(h in horas, a in asi where C[h,a] /\ (h mod 16) = 1)(1);

solve minimize obj1+obj2;
output [ " " ++ show_int(2,C[g,t]) ++ if t = asignaturas then "  -\(g mod 17 + 5)\n" else "" endif
       | g in horas, t in asi ] ++ ["\nmediodia = \(obj1);\n6am = \(obj2)"]
        