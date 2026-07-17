const API_URL = "/api";

const token = localStorage.getItem("adminToken");

if (!token) {
    alert("Please Login First");
    window.location.href = "login.html";
}

const table = document.getElementById("studentTable");
const search = document.getElementById("search");

let studentsData = [];


// LOAD STUDENTS

async function loadStudents() {

    try {

        const res = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        studentsData = data;

        displayStudents(studentsData);

    } catch (error) {

        console.log(error);
        alert("Unable to load students");

    }

}



// DISPLAY STUDENTS

function displayStudents(students) {

    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `

        <tr>

            <td>${student.name || ""}</td>

            <td>${student.regNo || ""}</td>

            <td>${student.fatherName || ""}</td>

            <td>${student.motherName || ""}</td>

            <td>${student.dob || ""}</td>

            <td>${student.mobile || ""}</td>

            <td>${student.alternativeMobile || ""}</td>

            <td>${student.email || ""}</td>

            <td>${student.gender || ""}</td>

            <td>${student.courses ? student.courses.join(", ") : ""}</td>

            <td>${student.programmingLanguage || ""}</td>

            <td>${student.address || ""}</td>

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

async function deleteStudent(id) {

    if (!confirm("Delete this student?")) return;

    const res = await fetch(API_URL, {

        method: "DELETE",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({ id })

    });

    const data = await res.json();

    alert(data.message);

    loadStudents();

}



// SEARCH

search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    const filtered = studentsData.filter(student =>

        student.name.toLowerCase().includes(value) ||
        student.regNo.toLowerCase().includes(value) ||
        student.email.toLowerCase().includes(value)

    );

    displayStudents(filtered);

});



// LOGOUT

function logout() {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    window.location.href = "login.html";

}


loadStudents();