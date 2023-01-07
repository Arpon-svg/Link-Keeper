// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA9zWjS_T1K_bkxqBSA4ssVhFy3RdGqjpk",
  authDomain: "orbital-concord-321509.firebaseapp.com",
  databaseURL: "https://orbital-concord-321509-default-rtdb.firebaseio.com",
  projectId: "orbital-concord-32150",
  storageBucket: "orbital-concord-321509.appspot.com",
  messagingSenderId: "439707659919",
  appId: "1:439707659919:web:e50655cad68abfc25c4afa",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Global Doms
const submitBtn = document.getElementById("submit");

const tBody = document.getElementById("tbody");

// INSERT THE RECORD
submit.onclick = () => {
  // DOM Elements
  const titleData = document.getElementById("title");
  const detailsData = document.getElementById("details");
  const linkData = document.getElementById("link");
  const uid = Math.floor(Math.random() * 696969) + 1;
  firebase
    .database()
    .ref("linkNotes/" + uid)
    .set({
      uid: uid,
      title: titleData.value,
      details: detailsData.value,
      link: linkData.value,
    });
  fetchAllRecord();
  clearAll();
};
function clearAll() {
  titleData.value = "";
  detailsData.value = "";
  linkData.value = "";
}
// DISPLAY THE ALL RECORDS
function fetchAllRecord() {
  firebase
    .database()
    .ref("linkNotes")
    .once("value", (records) => {
      let output = "";
      let sno = 1;
      records.forEach((list) => {
        const title = list.val().title;
        const details = list.val().details;
        const link = list.val().link;
        const uid = list.val().uid;

        output += ` 
            <tr>
                <td data-column="S.NO">${sno++}</td>
                <td data-column="Title">${title}</td>
                <td data-column="Details">${details}</td>
                <td data-column="Link"><a href='${link}'target="_blank">${link}</a></td>
                <td data-column="Action">
                    <a id="${uid}" onclick="deleteRecord(this.id)">DEL</a>
                </td>
            </tr>`;
      });
      tBody.innerHTML = output;
    });
}

fetchAllRecord();
// DELETE THE RECORD
function deleteRecord(id) {
  firebase
    .database()
    .ref("linkNotes/" + id)
    .remove();
  fetchAllRecord();
}
