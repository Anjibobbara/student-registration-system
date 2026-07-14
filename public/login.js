const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async (e)=>{

    e.preventDefault();


    const email =
    document.getElementById("email").value;


    const password =
    document.getElementById("password").value;



    try{


        const res = await fetch("/api/admin-login",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },


            body:JSON.stringify({

                email,
                password

            })

        });



        const data = await res.json();



        if(res.ok){


            localStorage.setItem(
                "adminToken",
                data.token
            );


            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );



            alert("Login Successful");


            window.location.href="admin.html";


        }
        else{


            alert(data.message);


        }



    }
    catch(error){


        alert("Login Failed");


        console.log(error);


    }


});