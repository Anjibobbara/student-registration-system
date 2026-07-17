const API_URL = "/api/students";

const token = localStorage.getItem("adminToken");


if(!token){

    alert("Please Login First");

    window.location.href="login.html";

}



const table = document.getElementById("studentTable");

const search = document.getElementById("search");


let studentsData = [];




// LOAD STUDENTS

async function loadStudents(){


    try{


        const res = await fetch(API_URL,{

            headers:{

                Authorization:`Bearer ${token}`

            }

        });



        studentsData = await res.json();


        displayStudents(studentsData);



    }
    catch(error){


        alert("Unable to load students");


        console.log(error);


    }


}





// DISPLAY STUDENTS

function displayStudents(students){


    table.innerHTML="";


    students.forEach(student=>{


        table.innerHTML += `


        <tr>


        <td data-label="Name">
        ${student.name}
        </td>


        <td data-label="Email">
        ${student.email}
        </td>


        <td data-label="Mobile">
        ${student.mobile}
        </td>


        <td data-label="Language">
        ${student.programmingLanguage}
        </td>


        <td>


        <button 
        class="delete-btn"
        onclick="deleteStudent('${student._id}')">

        Delete

        </button>


        </td>


        </tr>


        `;


    });


}






// DELETE STUDENT


async function deleteStudent(id){



    if(!confirm("Delete this student?"))

    return;



    const res = await fetch(API_URL,{

        method:"DELETE",

        headers:{

            "Content-Type":"application/json",

            Authorization:`Bearer ${token}`

        },


        body:JSON.stringify({

            id

        })

    });



    const data = await res.json();


    alert(data.message);


    loadStudents();


}







// SEARCH


search.addEventListener("keyup",()=>{


    const value =
    search.value.toLowerCase();



    const filtered =
    studentsData.filter(student=>


        student.name
        .toLowerCase()
        .includes(value)


    );



    displayStudents(filtered);



});







// LOGOUT


function logout(){


    localStorage.removeItem("adminToken");

    localStorage.removeItem("admin");


    window.location.href="login.html";


}





loadStudents();