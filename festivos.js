// festivos.js — Festivos Colombia (Ley Emiliani + Semana Santa)
function calcularPascua(a){
  const b=Math.floor(a/100),c=a%100,d=Math.floor(b/4),e=b%4,
    f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),
    h=(19*(a%19)+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,
    l=(32+2*e+2*i-h-k)%7,m=Math.floor((a%19+11*h+22*l)/451),
    mes=Math.floor((h+l-7*m+114)/31)-1,
    dia=((h+l-7*m+114)%31)+1;
  return new Date(a,mes,dia);
}
function sigLunes(d){
  const x=new Date(d),n=x.getDay();
  if(n===1)return x;
  x.setDate(x.getDate()+(n===0?1:8-n));
  return x;
}
function ymd(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function getFestivos(anio){
  const f=new Set();
  // Fijos
  [`${anio}-01-01`,`${anio}-05-01`,`${anio}-07-20`,
   `${anio}-08-07`,`${anio}-12-08`,`${anio}-12-25`].forEach(x=>f.add(x));
  // Traslado lunes
  [new Date(anio,0,6),new Date(anio,2,19),new Date(anio,5,29),
   new Date(anio,7,15),new Date(anio,9,12),new Date(anio,10,1),
   new Date(anio,10,11)].forEach(x=>f.add(ymd(sigLunes(x))));
  // Semana Santa y relativos
  const p=calcularPascua(anio);
  const add=(dias,traslado=false)=>{
    const x=new Date(p); x.setDate(x.getDate()+dias);
    f.add(ymd(traslado?sigLunes(x):x));
  };
  add(-3);add(-2);add(39,true);add(60,true);add(68,true);
  return f;
}
function esFestivo(s,a){return getFestivos(a).has(s);}
function esDomingo(s){return new Date(s+'T12:00:00').getDay()===0;}
function esNoLaborable(s,a){return esDomingo(s)||esFestivo(s,a);}
function toYMD(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
