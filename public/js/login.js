let users = JSON.parse(localStorage.getItem("users"));
if(users == undefined)
{
    users=[];
    let admin = {};
    admin.userName = "admin";
    admin.password = window.btoa("admin");
    //var encodedString = window.btoa( baseString );
    //console.log(admin);
    admin.email = "admin@gmail.com";
    users.push(admin);
    localStorage.setItem("users",JSON.stringify(users))
}


document.getElementById("signinlog").addEventListener("click", function loginWithEmail(event) {
    event.preventDefault()
    let email = document.getElementById("sign-in-email").value;
    let password = window.btoa(document.getElementById("sign-in-pass").value);
    //console.log(password);
    if ((email != "") && (password != "")) {
        if (validateEmail(email)) {
            users = JSON.parse(localStorage.getItem("users"));
            //console.log(users);
            let flag = 0;
            for(let i=0;i<users.length;i++)
            {
                if(users[i].email == email && users[i].password == password)
                {
                    iziToast.info({
                        title: "signing in",
                        position: "topRight"
                    });
                    localStorage.setItem("current_user",JSON.stringify(users[i]))
                    flag=1;
                    window.location.assign("./dashboard.html");
                }
            }
            if(flag==0)
            {
                iziToast.error({
                    message: "username or pass is incorrect",
                    position: "topRight"
                })
            }
        } else {
            iziToast.error({
                message: "Enter valid email",
                position: "topRight"
            })
        }
    } else {
        var msg = "";
        if (email == "")
            msg += "Email "
        if (password == "")
            (msg == "") ? msg += "password " : msg += "& password "
        iziToast.error({
            message: msg + " field empty",
            position: "topRight"
        })
    }
})

document.getElementById("signuplog").addEventListener("click", function signupWithEmail(event) {
    event.preventDefault()
    //console.log("singup")
    let uname = document.getElementById("sign-up-username").value;
    let email = document.getElementById("sign-up-email").value;
    let password = window.btoa(document.getElementById("sign-up-pass").value);
    users = JSON.parse(localStorage.getItem("users"));
    if ((email != "") && (password != "") && (uname != "")) {
        if (validateEmail(email)) {

            let user = {};
            user.email = email;
            user.password = password;
            user.userName = uname;
            users.push(user);
            localStorage.setItem("users",JSON.stringify(users));
            localStorage.setItem("current_user",JSON.stringify(user));
            window.location.assign("./dashboard.html");

        } else {
            iziToast.error({
                message: "Enter valid email",
                position: "bottomLeft"
            })
        }
    } else {
        var msg = "";
        if (uname == "")
            msg += "username "
        if (email == "")
            (msg == "") ? msg += "Email " : msg += "& E-Mail "
        if (password == "")
            (msg == "") ? msg += "password " : msg += "& password "
        iziToast.error({
            message: msg + " field empty",
            position: "bottomLeft"
        })
    }
});


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
