import firebase from "firebase"
import 'firebase/database';

const db = firebase.database();

const getUsernotesInfo = (userId, setnoteIds) => {
    const getnoteInfo = snapshot => {
        if (snapshot.val()) {
          let noteIdArr = Object.keys(snapshot.val()).sort(function(a,b) 
            {
               
                return snapshot.val()[a] - snapshot.val()[b]
            }
            );
          
            setnoteIds(noteIdArr);
        }
        else{
            //const updateUser = {};
            //updateUser[`/Users/${usedId}/notes/` + 0] = true;
            //db.ref().update(updateUser);
            setnoteIds([0])

        }
    };

    const usernoteDb = db.ref(`Users/${userId}/notes`).orderByValue();
    usernoteDb.on("value", getnoteInfo, error => alert(error));
}

const getCompletetionTime = (userId, noteId) => {
    const noteDb = db.ref("User/" + userId + "/Completed/"+noteId);
    noteDb.once(
        "value",
        snapshot => {
            return snapshot.val()
        },
        error => alert(error)
    );
}

const getCompletedNoteInfo = (userId, setCompletedIds) => {

    const getnoteInfo = snapshot => {
        if (snapshot.val()) {
          let noteIdArr = Object.keys(snapshot.val()).sort(function(a,b) 
            {
               
                return snapshot.val()[a] - snapshot.val()[b]
            }
            );
          
            setCompletedIds(noteIdArr);
        }
        else{
            //const updateUser = {};
            //updateUser[`/Users/${usedId}/notes/` + 0] = true;
            //db.ref().update(updateUser);
            setCompletedIds([0])

        }
    };

    const usernoteDb = db.ref(`Users/${userId}/Completed`).orderByValue();
    usernoteDb.on("value", getnoteInfo, error => alert(error));
}

const getnoteInfo = (noteId, setnote) => {
    const noteDb = db.ref("notes/" + noteId);
    noteDb.once(
        "value",
        snapshot => {
            setnote(snapshot.val());
        },
        error => alert(error)
    );
}


const addnote = (usedId, note) =>{
    const noteId = db.ref().child('notes').push().key;
    const updatenote = {};
    const updateUser = {};
    updatenote['/notes/' + noteId] = note;
    updateUser[`/Users/${usedId}/notes/` + noteId] = new Date(note.date).getTime();
    db.ref().update(updatenote);
    db.ref().update(updateUser);
    return noteId
}

export {getUsernotesInfo, getnoteInfo, addnote, getCompletedNoteInfo, getCompletetionTime}