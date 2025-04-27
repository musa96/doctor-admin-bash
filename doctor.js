// Current page
var current_page = 1;
// Number of records displayer per page
var records_per_page = 5;
// Modals
var create_modal = document.getElementById("createModal");
var delete_modal = document.getElementById("deleteModal");
var edit_modal = document.getElementById("editModal");
// Are we in search mode?
var search_mode = false;
// Search results populated by the input from the search bar
var search_results = [];
// Which patient to delete?
var deleteID;
// Which patient to edit?
var editPatientID;

// Patient records
var patientDB = [
    {id: 1,
    name: "Monica",
    email: "monica@mail.com",
    phone: "222-555-777",
    program: "Malaria"
    },
    {id: 2,
    name: "John Doe",
    email: "johndoe@mail.com",
    phone: "222-123-870",
    program: "HIV",
    },
    {id: 3,
    name: "Diane H. Anderson",
    email: "dianeanderson@mail.com",
    phone: "222-888-445",
    program: "TB",
    },
    {id: 4,
    name: "Aïchatou Bitrus",
    email: "aichatoubitrus@gmail.com",
    phone: "288-345-122",
    program: "TB"
    },
    {id: 5,
    name: "Ogechukwu Omari",
    email: "ogechukwuomari@gmail.com",
    phone: "235-214-444",
    program: "Malaria"
    },
    {id: 6,
    name: "Mwayi Okafor",
    email: "mwayiokafor@gmail.com",
    phone: "900-450-567",
    program: "HIV"
    },
    {id: 7,
    name: "Ebrima Ihejirika",
    email: "ebrimaihejirika@gmail.com",
    phone: "930-560-700",
    program: "HIV"
    },
    {id: 8,
    name: "Ifunanya Pretorius",
    email: "ifunanyapretorius@gmail.com",
    phone: "777-224-313",
    program: "TB"
    },
    {id: 9,
    name: "Mamadu Okeke",
    email: "mamaduokeke@gmail.com",
    phone: "777-344-567",
    program: "TB"
    },
    {id: 10,
    name: "Jummai Obama",
    email: "jummaiobama@gmail.com",
    phone: "777-212-453",
    program: "TB"
    },
]

// Goes to the previous page
function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page)
    }
}

// Goes to the next page
function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page)
    }
}

// Updates the table with specified page
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

// Gets number of pages
function numPages()
{
    var numberOfPages;

    if (search_mode == false) {
        numberOfPages = Math.ceil(patientDB.length / records_per_page);
    } else {
        numberOfPages = Math.ceil(search_results.length / records_per_page);
    }
    return numberOfPages;
}

// Searches patient records
function search() {
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
    search_mode = search_string.length != 0 ? true : false;
    current_page = 1;
    changePage(1);
}

// Find patient by ID
function findPatientById(patientId) {
    return patientDB.findIndex(e => e.id == patientId);
}

// Brings up the delete patient modal
function confirmDeletePatient(patientId) {
    var modal = new bootstrap.Modal(delete_modal);

    deleteID = patientId;
    modal.show();
}

// Deletes a patient from the records
function deletePatient(patientId) {
    console.log("Deleting patient ID #" + patientId);
    var index = findPatientById(patientId);
    if (index > -1) {
        patientDB.splice(index, 1);
    }
    if (current_page > numPages()) {
        current_page = numPages();
    }
    changePage(current_page);
}

// Updates a patient in the record
function updatePatient(patientId) {
    var index = findPatientById(patientId);
    patientDB[index].name = edit_modal.querySelector("#name").value;
    patientDB[index].email = edit_modal.querySelector("#email").value;
    patientDB[index].phone = edit_modal.querySelector("#phone").value;
    patientDB[index].program = edit_modal.querySelector("#program").value;
    changePage(current_page);
}

// Brings up the edit patient modal
function editPatientModal(patientId) {
    var modal = new bootstrap.Modal(edit_modal);
    var index = findPatientById(patientId);

    editPatientID = patientId;
    if (index > -1) {
        edit_modal.querySelector("#name").value = patientDB[index].name;
        edit_modal.querySelector("#email").value = patientDB[index].email;
        edit_modal.querySelector("#phone").value = patientDB[index].phone;
        edit_modal.querySelector("#program").value = patientDB[index].program;
    }
    modal.show();
}

// Populates the table with patients from the record
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

    var actions = row0.insertCell(-1);
    actions.innerHTML = "<button class=\"btn btn-secondary\" id=\"edit\" onClick=\"editPatientModal(" + element.id + ")\">Edit</button>" +
                        " <button class=\"btn btn-danger\" id=\"delete\" onClick=\"confirmDeletePatient(" + element.id + ")\">Delete</button>";
}

function newPatient() {
    var modal = new bootstrap.Modal(create_modal);
    create_modal.querySelector("#name").value = "";
    create_modal.querySelector("#email").value = "";
    create_modal.querySelector("#phone").value = "";
    create_modal.querySelector("#program").value = "";
    modal.show();
}

// Creates a new patient in the record
function createPatient() {
    let newpatient = {
        id: Math.random().toString().split('.')[1],
        name: create_modal.querySelector("#name").value,
        email: create_modal.querySelector("#email").value,
        phone: create_modal.querySelector("#phone").value,
        program: create_modal.querySelector("#program").value
    }

    search_mode = false;
    patientDB.push(newpatient)
    current_page = numPages();
    changePage(current_page)
}

window.onload = function() {
    changePage(1);
}