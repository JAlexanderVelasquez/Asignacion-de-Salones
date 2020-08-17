int:sede;
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
array[asi] of var int: Ai;
array[asi] of var doc: Ad;
%array[asi] of var bool: falta;
array[horas,asi] of var bool: C;
constraint forall(a in asi)(sum(h in horas where C[h,a])(1) = Ai[a]); %intensidad

predicate diur(array[horas] of var bool: hor, var int: inten) =
               (sum(h in horas where (h mod 16) in diurno /\ hor[h])(1) = inten);
               
predicate noc(array[horas] of var bool: hor, var int: inten) =
               (sum(h in horas where (h mod 16) in nocturno /\ hor[h])(1) = inten);  
                            
constraint forall(a in asi)(if A[a,4]=0 then diur(col(C,a),Ai[a])
                                        else noc(col(C,a),Ai[a]) endif);%tipo noc diu para cada asig


constraint forall(d in dias, a in asi)(let {var int: s=sum(h in horas where (h-1) div 16 = d /\ C[h,a])(1)} in
                                        (s=0 \/ if Ai[a]<=3 then s=Ai[a] 
                                                            else if Ai[a]=4 then s=4 \/ s=2 
                                                                            else s=2 \/ s=3 endif endif));
constraint forall(a in asi, h in 2..H-1 where Ai[a]!=1)(C[h,a] -> (C[h+1,a] \/ C[h-1,a]));
constraint forall(a in asi where Ai[a]!=1 )(C[1,a] -> C[2,a]);

constraint forall(h in horas, a in asi)(C[h,a] -> D[h,Ad[a]]);

constraint forall(d in doc)(forall(h in horas)
                                  (sum(a in row(Da,d) where a!=0)(if C[h,a] then 1 else 0 endif) <=1));

output [ " " ++ show_int(2,C[g,t]) ++ if t = asignaturas then "\n" else "" endif
       | g in horas, t in asi ] 