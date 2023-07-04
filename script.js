const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const btn = document.getElementById("btn");
const searchInput = document.getElementById("search");
let id = 0;

let students = [];

function renderDataTable(item){
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.ID}</td>
    <td>${item.name}</td>
    <td>${item.email}</td>
    <td>${item.grade}</td>
    <td>${item.age}</td>
    <td id="degree-box">${item.degree}
    <div>
    <img id = "edit${item.ID}" src = "./assets/edit 1.png" width="20" alt = "edit"><img id = "delete${item.ID}" src= "./assets/trash-2 1.png" width="20" alt ="delete"> </div>
        </td>`
        
        tbody.appendChild(row);
        const editKey = document.getElementById(`edit${item.ID}`);
        const deleteKey = document.getElementById(`delete${item.ID}`);
    
        editKey.addEventListener("click",() => {
            btn.innerText = "Edit Student";
            btn.className = "edit-btn";
            form["name"].value = item.name;
            form["email"].value = item.email;
            form["age"].value = item.age;
            form["grade"].value = item.grade;
            form["degree"].value = item.degree;
        })
        deleteKey.addEventListener("click",() => {
            students.splice(item.ID-1,1); 
            // console.log(students);
            tbody.removeChild(row);
         })
}

form.addEventListener("submit",(e) => {
    e.preventDefault();
    let userData = {
        name : form["name"].value,
        email: form["email"].value,
        grade : form["grade"].value,
        age : form["age"].value,
        degree : form["degree"].value
    }
    if(btn.innerText === "Edit Student"){
        let obj = {ID: id , name: `${userData.name}`, age: `${userData.age}`, grade: `${userData.grade}`, degree: `${userData.degree}`, email: `${userData.email}`};
        students.splice(obj.ID-1,1,obj);
        tbody.innerHTML = "";
        for(let i = 0 ; i < students.length; i++){
            let item = students[i];
            renderDataTable(item);
        }
    }
    else{
    let obj = {ID: ++id , name: `${userData.name}`, age: `${userData.age}`, grade: `${userData.grade}`, degree: `${userData.degree}`, email: `${userData.email}`};
     students.push(obj);
    renderDataTable(obj);
    }
})

searchInput.addEventListener("keyup",() => {
   let filteredStudents =  students.filter(obj => {
         return (obj.name.toLowerCase().includes(searchInput.value.toLowerCase()) || obj.email.toLowerCase().includes(searchInput.value.toLowerCase()) || obj.degree.toLowerCase().includes(searchInput.value.toLowerCase()))
    })
    tbody.innerHTML = "";
    for (let i=0 ;i<filteredStudents.length;i++){
        const item = filteredStudents[i];
        renderDataTable(item);
    }
})


