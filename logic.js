function fill(a){
document.getElementById("city").value=a;
}

function trip(){

let city=document.getElementById("city").value;
let start=document.getElementById("start").value;
let end=document.getElementById("end").value;
let budget=document.getElementById("budget").value;
let people=document.getElementById("people").value;

if(city==""||start==""||end==""||budget==""||people==""){
alert("Fill all details");
return;
}

let trip={
city:city,
start:start,
end:end,
budget:budget,
people:people
};

localStorage.setItem("trip",JSON.stringify(trip));

window.location="plan.html";

}
let act=[];

function loadTrip(){
let trip=JSON.parse(localStorage.getItem("trip"));
document.getElementById("city").innerHTML=trip.city;
document.getElementById("start").innerHTML=trip.start;
document.getElementById("end").innerHTML=trip.end;
document.getElementById("budget").innerHTML=trip.budget;
document.getElementById("people").innerHTML=trip.people;
}

function add(){
let txt=document.getElementById("txt").value;

if(txt==""){
alert("Enter activity");
return;
}
act.push(txt);

show();
document.getElementById("txt").value="";

let p=act.length*20;
if(p>100){
p=100;
}

document.getElementById("fill").style.width=p+"%";
document.getElementById("per").innerHTML=p+"% Completed";
if(act.length>=5){
document.getElementById("next").disabled=false;
}
}
function show(){
let list=document.getElementById("list");

list.innerHTML="";
for(let i=0;i<act.length;i++){
list.innerHTML+=`
<li>
${act[i]}
<button onclick="del(${i})">Delete</button>
</li>
`;
}

}
function del(i){

act.splice(i,1);
show();
let p=act.length*20;

document.getElementById("fill").style.width=p+"%";
document.getElementById("per").innerHTML=p+"% Completed";
if(act.length<5){
document.getElementById("next").disabled=true;
}
}