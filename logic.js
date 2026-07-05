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
fetch("/trip",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(trip)
});

window.location="plan.html";

}
let act=JSON.parse(localStorage.getItem("act"))||[];

function loadTrip(){
let trip=JSON.parse(localStorage.getItem("trip"));
document.getElementById("city").innerHTML=trip.city;
document.getElementById("start").innerHTML=trip.start;
document.getElementById("end").innerHTML=trip.end;
document.getElementById("budget").innerHTML=trip.budget;
document.getElementById("people").innerHTML=trip.people;
show();
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
function loadbag(){
    showbag();
}

function add(){
let txt=document.getElementById("txt").value;

if(txt==""){
alert("Enter activity");
return;
}
act.push(txt);
localStorage.setItem("act",JSON.stringify(act));

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
localStorage.setItem("act",JSON.stringify(act));
show();
let p=act.length*20;

document.getElementById("fill").style.width=p+"%";
document.getElementById("per").innerHTML=p+"% Completed";
if(act.length<5){
document.getElementById("next").disabled=true;
}
}
let bag=JSON.parse(localStorage.getItem("bag"))||[];
function additem(){

let item=document.getElementById("item").value;

if(item==""){
alert("Enter item");
return;
}
bag.push({
name:item,
done:false
});
localStorage.setItem("bag",JSON.stringify(bag));

showbag();
document.getElementById("item").value="";
}

function showbag(){
let box=document.getElementById("bag");
box.innerHTML="";

let done=0;

for(let i=0;i<bag.length;i++){
if(bag[i].done){
done++;
}
box.innerHTML+=`
<li>
<input type="checkbox" onchange="tick(${i})" ${bag[i].done?"checked":""}>
${bag[i].name}
<button onclick="removeitem(${i})">Delete</button>
</li>
`;
}

let p=0;
if(bag.length>0){
p=Math.floor(done*100/bag.length);
}

document.getElementById("fill2").style.width=p+"%";
document.getElementById("packPer").innerHTML=p+"% Packed";
if(done==bag.length && bag.length>0){
document.getElementById("dash").disabled=false;
}
else{
document.getElementById("dash").disabled=true;
}
}

function tick(i){
bag[i].done=!bag[i].done;
localStorage.setItem("bag",JSON.stringify(bag));
showbag();

}
function removeitem(i){
bag.splice(i,1);
localStorage.setItem("bag",JSON.stringify(bag));
showbag();
}
function loadDash(){
let trip=JSON.parse(localStorage.getItem("trip"));

document.getElementById("d1").innerHTML=trip.city;
document.getElementById("d2").innerHTML=trip.start;
document.getElementById("d3").innerHTML=trip.end;
document.getElementById("d4").innerHTML=trip.budget;
document.getElementById("d5").innerHTML=trip.people;
let a=JSON.parse(localStorage.getItem("act"))||[];
let b=JSON.parse(localStorage.getItem("bag"))||[];
document.getElementById("a1").innerHTML=a.length;
document.getElementById("a2").innerHTML=b.length;

}
function again(){
localStorage.removeItem("trip");
localStorage.removeItem("act");
localStorage.removeItem("bag");
window.location="index.html";

}
async function loadtrips(){
let res=await fetch("/trip");
let data=await res.json();
let list=document.getElementById("list");
list.innerHTML="";

for(let i=0;i<data.length;i++){
list.innerHTML+=`
<li>
${data[i].city}
(${data[i].start})
</li>
`;
}

}