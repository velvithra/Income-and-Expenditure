const  balance =document.querySelector("#balance");
const inc=document.querySelector("#inc-amt");
const exp=document.querySelector("#exp-amt");
const form=document.querySelector("#form");
const  description=document.querySelector("#desc");
const amount=document.querySelector("#amount");
const trans=document.querySelector("#trans");
/*
const dummyData=[
    { id:1, description: "Flower", amount:-20},
    { id:2, description: "Petrol", amount:-120},
    { id:3, description: "Salary", amount:35000},
    { id:4, description: "Milk", amount:-50},
    { id:5, description: "Grocerry", amount:-9000},
];
let transactions=dummyData;
*/
const localStorageTrans=JSON.parse(localStorage.getItem("trans")); 
let transactions= localStorage.getItem("trans")!==null ? localStorageTrans :[];

function loadTransactionDetails(transaction){
    const sign=transaction.amount<0?"-":"+";
    const item=document.createElement("li");
    item.classList.add(transaction.amount<0? "exp":"inc");
    item.innerHTML= `${transaction.description}
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick="removeTrans(${transaction.id})">x</button>`;
   
    trans.appendChild(item);

}
function removeTrans(id){
 if(confirm("Are you sure you want to delete Transaction?")){
    transactions=transactions.filter(
        (transaction)=>transaction.id != id);
    config();
    updateLocalStorage();
} else {
    return;
 }
}
function updateAmount(){
 const amounts=transactions.map((transaction)=>transaction.amount);
 console.log(amounts);
 const total=amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);
 balance.innerHTML=`${total}`;

 const income=amounts.filter((item) => item>0).reduce
 ((acc,item)=> (acc+=item),0).toFixed(2);
 inc.innerHTML=`${income}`;

 const expenditure=amounts.filter((item) => item<0).reduce
 ((acc,item)=> (acc+=item),0).toFixed(2);
 exp.innerHTML=`${Math.abs(expenditure)}`;

}
function config(){
    trans.innerHTML="";
    transactions.forEach(loadTransactionDetails);
    updateAmount();
}
function addTransaction(e){
e.preventDefault();
if(description.value.trim()==""|| amount.value.trim()==""){
    alert("Please Enter Description and amount");
} else{
    const transaction={
        id:uniqueId(),
        description:description.value,
        amount: +amount.value,
    };
    transactions.push(transaction);
    loadTransactionDetails(transaction);
    description.value="";
    amount.value="";
    updateAmount();
    updateLocalStorage();
}
}

form.addEventListener("submit",addTransaction)

window.addEventListener("load",function(){
    config();
});
 
function updateLocalStorage(){
    localStorage.setItem("trans",JSON.stringify(transactions));
}

function uniqueId(){
    return Math.floor(Math.random() * 1000000);
}