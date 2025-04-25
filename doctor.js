var current_page = 1;
var records_per_page = 5;
var create_modal = document.getElementById("createModal");
var span = document.getElementsByClassName("close")[0];
var search_mode = false;
var search_results = [];

var patientDB = [
    {name: "Monica",
    email: "monica@mail.com",
    phone: "222-555-777",
    program: "Malaria"
    },
    {name: "John Doe",
        email: "johndoe@mail.com",
        phone: "222-123-870",
        program: "HIV",
    },
    {name: "Diane H. Anderson",
        email: "dianeanderson@mail.com",
        phone: "222-888-445",
        program: "TB",
    },
    {name: "Aïchatou Bitrus",
        email: "aichatoubitrus@gmail.com",
        phone: "288-345-122",
        program: "TB"
    },
    {name: "Ogechukwu Omari",
        email: "ogechukwuomari@gmail.com",
        phone: "235-214-444",
        program: "Malaria"
    },
    {name: "Mwayi Okafor",
        email: "mwayiokafor@gmail.com",
        phone: "900-450-567",
        program: "HIV"
    },
    {name: "Ebrima Ihejirika",
        email: "ebrimaihejirika@gmail.com",
        phone: "930-560-700",
        program: "HIV"
    },
    {name: "Ifunanya Pretorius",
        email: "ifunanyapretorius@gmail.com",
        phone: "777-224-313",
        program: "TB"
    },
    {name: "Mamadu Okeke",
        email: "mamaduokeke@gmail.com",
        phone: "777-344-567",
        program: "TB"
    },
    {name: "Jummai Obama",
        email: "jummaiobama@gmail.com",
        phone: "777-212-453",
        program: "TB"
    },
]

function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page)
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page)
    }
}

function changePage(page) {
    var tbl = document.getElementById("programlist").getElementsByTagName("tbody")[0];
    var previousbutton = document.getElementById("prevbutton");
    var nextbutton = document.getElementById("nextbutton");

    tbl.innerHTML = "";

    if (search_mode == false) {
        for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
            if (i < patientDB.length)
                addPatient(patientDB[i], tbl)
        }
    } else {
        for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
            if (i < search_results.length) {
                addPatient(search_results[i], tbl)
            }
        }
    }
    if (page == 1) {
        previousbutton.disabled = true;
    } else {
        previousbutton.disabled = false;
    }
    if (page == numPages()) {
        nextbutton.disabled = true;
    } else {
        nextbutton.disabled = false;
    }
}

function numPages()
{
    var numberOfPages = 1;

    if (search_mode == false) {
        numberOfPages = Math.ceil(patientDB.length / records_per_page);
    } else {
        numberOfPages = Math.ceil(search_results.length / records_per_page);
    }
    return numberOfPages;
}

function search()
{
    var search_string = document.getElementById("search_text").value;
    var filter = search_string.toUpperCase();

    console.log("Searched for " + "'" + search_string + "'");
    search_results = [];
    for(var i = 0; i < patientDB.length; i++) {
        var txtValue = patientDB[i].name;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            search_results.push(patientDB[i]);
        }
    }
    search_mode = search_results.length != 0 ? true : false;
    current_page = 1;
    changePage(1);
}

function addPatient(element, tbl) {
    var row0 = tbl.insertRow(-1);

    var name = row0.insertCell(-1);
    name.innerHTML = element.name;

    var email = row0.insertCell(-1);
    email.innerHTML = element.email;

    var phone = row0.insertCell(-1);
    phone.innerHTML = element.phone;

    var program = row0.insertCell(-1);
    program.innerHTML = element.program;
}

function newPatient() {
    create_modal.style.display = "block";
}

function createPatient() {
    let newpatient = {
        name: create_modal.querySelector("#name").value,
        email: create_modal.querySelector("#email").value,
        phone: create_modal.querySelector("#phone").value,
        program: create_modal.querySelector("#program").value
    }
    create_modal.style.display = "none";

    search_mode = false;
    patientDB.push(newpatient)
    current_page = numPages();
    changePage(current_page)
}

span.onclick = function() {
    create_modal.style.display = "none";
}

window.onload = function() {
    changePage(1);
}