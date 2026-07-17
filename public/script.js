const API_URL = "/api";

const studentsSection = document.getElementById("studentsSection");
const adminToken = localStorage.getItem("adminToken");

if (!adminToken && studentsSection) {
    studentsSection.style.display = "none";
}

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("search");
const submitBtn = document.getElementById("submitBtn");

let studentsData = [];

// LOAD STUDENTS
async function loadStudents() {

    try {

        const token = localStorage.getItem("adminToken");

        if (!token) return;

        const res = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        studentsData = await res.json();

        if (!res.ok) {
            throw new Error(studentsData.message);
        }

        displayStudents(studentsData);

    } catch (err) {

        console.log(err);

    }

}



// DISPLAY STUDENTS
function displayStudents(students) {

    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `

        <tr>

            <td>${student.name}</td>

            <td>${student.regNo}</td>

            <td>${student.fatherName}</td>

            <td>${student.motherName}</td>

            <td>${student.mobile}</td>

            <td>${student.alternativeMobile || ""}</td>

            <td>${student.email}</td>

            <td>${student.programmingLanguage}</td>

            <td>${student.address}</td>

            <td>

                <button class="edit-btn"
                onclick="editStudent('${student._id}')">

                Edit

                </button>

                <button class="delete-btn"
                onclick="deleteStudent('${student._id}')">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}
// ADD / UPDATE STUDENT

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const id = document.getElementById("studentId").value;

    const courses = [];

    document
        .querySelectorAll(".checkbox input:checked")
        .forEach(item => {
            courses.push(item.value);
        });

    const student = {

        id,

        name: document.getElementById("name").value,

        regNo: document.getElementById("regNo").value,

        fatherName: document.getElementById("fatherName").value,

        motherName: document.getElementById("motherName").value,

        dob: document.getElementById("dob").value,

        mobile: document.getElementById("mobile").value,

        alternativeMobile:
        document.getElementById("alternativeMobile").value,

        email:
        document.getElementById("email").value,

        gender:
        document.getElementById("gender").value,

        courses,

        address:
        document.getElementById("address").value,

        programmingLanguage:
        document.getElementById("programmingLanguage").value

    };

    const method = id ? "PUT" : "POST";

    const res = await fetch(API_URL, {

        method,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {

        form.reset();

        document.getElementById("studentId").value = "";

        submitBtn.innerText = "Register Student";

        loadStudents();

    }

});



// EDIT STUDENT

function editStudent(id) {

    const student = studentsData.find(s => s._id === id);

    if (!student) return;

    document.getElementById("studentId").value = id;

    document.getElementById("name").value = student.name;

    document.getElementById("regNo").value = student.regNo;

    document.getElementById("fatherName").value = student.fatherName;

    document.getElementById("motherName").value = student.motherName;

    document.getElementById("dob").value = student.dob;

    document.getElementById("mobile").value = student.mobile;

    document.getElementById("alternativeMobile").value =
        student.alternativeMobile || "";

    document.getElementById("email").value = student.email;

    document.getElementById("gender").value = student.gender;

    document.getElementById("address").value = student.address;

    document.getElementById("programmingLanguage").value =
        student.programmingLanguage;

    // Courses
    document
        .querySelectorAll(".checkbox input")
        .forEach(item => {

            item.checked =
                student.courses &&
                student.courses.includes(item.value);

        });

    submitBtn.innerText = "Update Student";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
// DELETE STUDENT

async function deleteStudent(id) {

    if (!confirm("Delete this student?")) return;

    const res = await fetch(API_URL, {

        method: "DELETE",

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("adminToken")
        },

        body: JSON.stringify({ id })

    });

    const data = await res.json();

    alert(data.message);

    loadStudents();

}



// SEARCH

if (search) {

    search.addEventListener("keyup", () => {

        const value = search.value.toLowerCase();

        const filtered = studentsData.filter(student =>

            student.name.toLowerCase().includes(value) ||
            student.regNo.toLowerCase().includes(value) ||
            student.email.toLowerCase().includes(value)

        );

        displayStudents(filtered);

    });

}



// LOGOUT

function logout() {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    window.location.href = "login.html";

}



// INITIAL LOAD

loadStudents();

