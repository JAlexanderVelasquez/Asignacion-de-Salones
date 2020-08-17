%Conjunto de los recursos
enum Recursos;
int:sede;
int:salones;
set of int: sal=1..salones;
array[sal] of var int: Sc;
array[sal] of var Recursos: Sr;
int:N;
int:Asig;
int:ini;
int:fin;
set of int: asi=ini..fin;
set of int: asit=1..Asig;
%enum A;
array[asit] of var Recursos: Ar;
array[asit] of var int: Ae;
set of int: horas=1..N;
array[horas,asit] of var bool: C;
array[horas,sal] of var 0..Asig: SA;
array[horas,sal] of var 0..Asig: SA1;

constraint forall(h in horas, s in sal where SA1[h,s]!=0)(SA[h,s]=SA1[h,s]);

include "global_cardinality.mzn";
%  constraint forall(h in horas, a in asi)(if C[h,a] 
%                                            then global_cardinality(row(SA,h),[a],[1])
%                                            else global_cardinality(row(SA,h),[a],[0])
%                                            endif);
% % constraint forall(a in asit,h in horas, s in sal where C[h,a] )(if a =1 then count(row(SA,h),a)=1
% else 1=1 endif);
constraint forall(h in horas, a in asi where C[h,a])(count(row(SA,h),a)=1);
%constraint forall(a in asi,h in horas) (C[h,a] -> (exists(s in sal) (SA[h,s]=a)));

%%%las dos siguientes se pueden unir en la restriccion mas abajo
 constraint forall(h in horas,s in sal, a in asi)(SA[h,s]=a -> (C[h,a] /\ (Ar[a]=Recursos[6] \/ Ar[a]=Sr[s])));
 constraint forall(h in horas,s in sal,a in asi)(SA[h,s]=a -> (C[h,a] /\ Sc[s]>=Ae[a]));
 constraint forall(a in asi,s in sal)(
                 let {var int: sp=sum(h in horas where SA[h,s]=a)(1)} in
                   (sp=0 \/ sp=2 \/ sp=3));
% %%%%las dos siguientes son equivalentes
%constraint forall(h in horas,s in sal,a in asi)(SA[h,s]=a -> (Sc[s]>=Ae[a] /\ (Ar[a]=Recursos[6] \/ Ar[a]=Sr[s])));
%constraint forall(h in horas,s in sal)(SA[h,s]!=0 -> (Sc[s]>=Ae[SA[h,s]] /\ (Ar[SA[h,s]]=Recursos[6] \/ Ar[SA[h,s]]=Sr[s])));
predicate slib(array[horas] of var 0..Asig: salon) =
               (sum(h in horas where salon[h]=0)(1) = N);
var 0..salones: libres;
constraint libres = sum(s in sal where slib(col(SA,s)))(1);
solve maximize libres;
output ["SA1=[|"] ++ [ " " ++ show_int(2,SA[g,t]) ++ if t = salones then "\n|" else "," endif
       | g in horas, t in sal ] ++ ["]\nlibres = \(libres)"]