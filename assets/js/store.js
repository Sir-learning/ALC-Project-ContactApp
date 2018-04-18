var store = {
    key: 'marshall-contacts',
    init: function (){
        var contacts = store.get();
    
        if(!contacts){
            store.set([]);
        }
    },
    get: function (){
        var item = localStorage.getItem(store.key);
        return item !=null ? JSON.parse(item) : false;
    },
    set: function (item){
        localStorage.setItem(store.key, JSON.stringify(item));
        return true;
    },
    clear: function clear(){
        return store.set(null);
    },
    getContact: function (id = "all"){
        var contacts = store.get();
    
        if(id == "all"){
            return contacts;
        }
        else{
            var filterContacts = contacts.filter(
                function(contact){
                    return contact.id == id
                }
            );
        
            return filterContacts.length > 0 ? filterContacts[0] : false;       
        }
    },
    updateContact: function (id, contactUpdate){
        var contacts = store.get();
        var contactsUpdate = contacts.map(
            function(contact){
                return contact.id == id 
                    ? Object.assign({}, contact, contactUpdate)
                    : contact
            }
        );
        return store.set(contactsUpdate);
    },
    saveContact: function (contact = {}){
        var contacts = store.get();
        var newContact = Object.assign({}, contact, {id: contacts.length+1});
    
        store.set(contacts.concat([newContact]));
        return true;
    },
    deleteContact: function (id){
        var contacts = store.get();
        var newContacts = contacts.filter(
            function(contact){
                return id != contact.id
            }
        );
    
        return store.set(newContacts); 
    }
};

store.init();




