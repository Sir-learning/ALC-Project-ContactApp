
window.addEventListener("load", injectContactBody);

function formModal(type, data = {}){
    var modalBody   = '';
    var modalHeader = '';
    let btn = '';

    if(type == 'add'){
        modalBody = formAddContactBody();
        modalHeader = 'Add';
        btn = '<button type="button" class="btn save-btn" onclick="addContact()">Add Contact</button>';
    }
    else if(type == 'edit'){
        modalBody = formEditContactBody(data);
        modalHeader = 'Edit';
        btn = '<button type="button" class="btn save-btn" onclick="updateContact('+data.id+')">Update Contact</button>';
    }
    else{
        modalBody = formViewContactBody();
        modalHeader = 'View';
    }

    var modalContent = 
        '<div id="myModal" class="modal">'
            +'<div class="modal-content">'
                +'<div class="modal-header">'
                    +'<span class="close" onclick="modal.close()">&times;</span>'
                    +'<h2>'+modalHeader+' Contact</h2>'
                +'</div>'
                +'<div class="modal-body">'
                    + modalBody
                +'</div>'
                +'<div class="modal-footer">'
                    +btn
                +'</div>'
            +'</div>'
        +'</div>';

        return modalContent;
}

function formAddContactBody(){
    var body = 
        '<form>'
            +'<img src="./assets/img/user.png" style="width:50px;" />'
            +'<input type="text" placeholder = "Contact Name" id="cadd-name" autocomplete="name">'
            +'<input type="email" placeholder = "Contact Email" id="cadd-email" autocomplete="email">'
            +'<input type="phone" placeholder = "Contact Number" id="cadd-phone" autocomplete="tel">'
        '</form>';
    return body;
}

function formEditContactBody(data){
    var body = 
        '<form>'
            +'<img src="./assets/img/user.png" style="width:50px;" />'
            +'<input type="text" placeholder = "Contact Name" id="cadd-name" autocomplete="name" value="'+data.name+'">'
            +'<input type="email" placeholder = "Contact Email" id="cadd-email" autocomplete="email" value='+data.email+'>'
            +'<input type="phone" placeholder = "Contact Number" id="cadd-phone" autocomplete="tel" value='+data.phone+'>'
        '</form>';
    return body;
}

function openModal(type, data){
    var modalDiv = document.getElementById("inject-modal");
    if(modalDiv.innerHTML = formModal(type, data)){
        modal.open();
    }
}

function addContact(){
    var cAddName  = document.getElementById('cadd-name').value;
    var cAddEmail = document.getElementById('cadd-email').value;
    var cAddPhone = document.getElementById('cadd-phone').value;

    var contact = {
        name:  cAddName,
        email: cAddEmail,
        phone: cAddPhone
    };

    if(store.saveContact(contact)){
        modal.close();
        injectContactBody();
        alert('New contact added successfully');
    }
}

function updateContact(id){
    var cAddName  = document.getElementById('cadd-name').value;
    var cAddEmail = document.getElementById('cadd-email').value;
    var cAddPhone = document.getElementById('cadd-phone').value;

    var contact = {
        name:  cAddName,
        email: cAddEmail,
        phone: cAddPhone
    };

    if(store.updateContact(id, contact)){
        modal.close();
        injectContactBody();
    }
}

function injectContactBody(){
    var contacts = store.get();
    var contactList = document.getElementById("contact-body");

    contactList.innerHTML = contacts.length > 0
        ? formContactList()
        : '<div class="no-data">'
            +'<img src="./assets/img/nodata-available.jpg"/>'
            +'<button type="button" class="btn" onclick="openModal(\'add\')">Begin by adding a new Contact</button>'
           +'</div>';
}

function formContactList(){
    var contactList =                 
        '<table width="100%">'
            +'<thead>'

            +'</thead>'
            +'<tbody>'
            +formContactRows()
            +'</tbody>'
        +'</table>'
    return contactList;
}
function formContactRows(){
    var contacts    = store.get();
    var contactsRow = contacts.map(
        function(contact){
            return '<tr class="each-contact">'
                    +'<td><img src="./assets/img/user.png" class="user-img"/></td>'
                    +'<td>'+contact.name+'</td>'
                    +'<td>'
                        +'<button class="btn edit-btn" onclick="editContact('+contact.id+')">Edit</button>'
                        +'&nbsp;&nbsp;'
                        +'<button class="btn delete-btn" onclick="deleteContact('+contact.id+')"> Delete</button>'
                    +'</td>'
                +'</tr>'
        }
    );

    return contactsRow.reverse().join("");
}

function editContact(id){
    var contact = store.getContact(id);
    openModal('edit', contact);
}

function deleteContact(id){
    var confirmDelete = confirm('Are you sure you want to delete the contact?');

    if(confirmDelete){
        if(store.deleteContact(id)){
            injectContactBody();
            alert('Contact deleted successfully');
        }
    }
    else{
        alert("Operation cancelled");
    }

}