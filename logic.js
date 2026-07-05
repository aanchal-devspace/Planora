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

window.location="planner.html";

}