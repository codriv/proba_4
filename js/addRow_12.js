var GombNone = document.querySelector("#varGomb").firstElementChild;
//var postBody = "e2"
var ssz = getInputIDs()[0];

let fetchInitGet = {
    method: "GET",
    headers: new Headers(),
    mode: "cors",
    cache: "no-cache"
};

let fetchInitPut = {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    mode: "cors",
    cache: "no-cache"
};

let fetchInitPost = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    mode: "cors",
    cache: "no-cache",
    //body: JSON.stringify(kiolvas())
};

let fetchInitDelete = {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    mode: "cors",
    cache: "no-cache"
};

leker();
//rowCalc();

function rowCalc() {
    var userNumber = document.querySelector("table tbody").childElementCount;
    var InputNr = document.querySelector("#" + getInputIDs()[0]);
    InputNr.value = userNumber+1;
    console.log(userNumber)
}

function rowCalcJson() {
    var userNumber = document.querySelector("table tbody").childElementCount;
    var InputNr = document.querySelector("#" + getInputIDs()[0]);
    InputNr.value = userNumber+1;
    console.log(userNumber)
}

function getInputIDs() {
    var inputObjects = document.querySelectorAll("table thead tr td input");
    var InputIDs = [];
    for (i of inputObjects) {
        InputIDs.push(i.id);
    };
    return InputIDs;
}

function kiolvas() {
    var inputs = {};
    for (i of getInputIDs()) {
        inputs[i]=document.querySelector("#"+i).value;
    };
    return inputs;
}

function deleteInputValues(){
    var inputKeys = getInputIDs();
    for (i of getInputIDs()){
        if ( i != inputKeys[0]){
            document.querySelector('input[id='+i+']').value = "";
        };
    };
}

function CheckInput() {
    var InputsFree = document.querySelectorAll('table input:not([id="Nr"])');
    var InputValues = []
    for ( i of InputsFree ) {InputValues.push(i.value) }
    function Mind (val) { return val == ""}
    return InputValues.every(Mind);
}

function createGombok(tr){
    let tdGomb = document.createElement("td");
    tdGomb.setAttribute("class", "gombok");
    var GombNoneCln = GombNone.cloneNode(true);
    tdGomb.append(GombNoneCln);
    tr.append(tdGomb);
}

function addRow_0() {
    if (CheckInput()) {
    } else {
        let newUser = kiolvas();
        let tb = document.querySelector("table tbody");
        let tr = document.createElement("tr");
        tb.appendChild(tr);
        for (k in newUser){
            if (k == getInputIDs()[0]) {
                let th = document.createElement("th");
                th.innerHTML = newUser[k];
                tr.appendChild(th)
                th.setAttribute("scope", "row");
            } else {
                let td = document.createElement("td");
                td.innerHTML = newUser[k];
                tr.appendChild(td)
            }
        }
        createGombok(tr);
        //rowCalc();
        addRowFetch();
        //deleteInputValues();
    }
    leker()
}
function addRow() {
        if (CheckInput()) {
    } else {
        let newUser = kiolvas();
        delete newUser.Nr;
        addRowFetch(newUser);
        //leker()
        };
        //let tb = document.querySelector("table tbody");
        //let tr = document.createElement("tr");
        //tb.appendChild(tr);
        
        
      /*   for (k in newUser){
            if (k == getInputIDs()[0]) {
                let th = document.createElement("th");
                th.innerHTML = newUser[k];
                tr.appendChild(th)
                th.setAttribute("scope", "row");
            } else {
                let td = document.createElement("td");
                td.innerHTML = newUser[k];
                tr.appendChild(td)
            }
        }
        createGombok(tr); */
        //rowCalc();
        
        //deleteInputValues();
    }
    //leker()

    function addRow_2() {
    /* fetch("http://localhost:3000/users", fetchInitGet).then(
        data => data.json(),
        err => console.log(err)
        ).then(
        users => {
            console.log("addRow" + users);
            createTable(users)
        },
        err => console.error(err)
        ) */
    if (CheckInput()) {
    } else {
        let newUser = kiolvas();
        delete newUser.Nr;
        new Promise ((resolve, reject) => {
            resolve(addRowFetch(newUser))
        }
        ).then(
            resolve => {
                console.log("post fetch ment");
                document.querySelector("table tbody").innerHTML="";
                leker()
            },
            reject => {
                return console.error(reject);
            }
        )
        //let tb = document.querySelector("table tbody");
        //let tr = document.createElement("tr");
        //tb.appendChild(tr);
        
        
      /*   for (k in newUser){
            if (k == getInputIDs()[0]) {
                let th = document.createElement("th");
                th.innerHTML = newUser[k];
                tr.appendChild(th)
                th.setAttribute("scope", "row");
            } else {
                let td = document.createElement("td");
                td.innerHTML = newUser[k];
                tr.appendChild(td)
            }
        }
        createGombok(tr); */
        //rowCalc();
        
        //deleteInputValues();
    }
    //leker()
}

function leker() {
    //var ssz = getInputIDs()[0];
    fetch("http://localhost:3000/users", fetchInitGet).then(
        data => data.json(),
        err => console.log(err)
        ).then(
        userek => {
            //console.log(userek);
            //console.log(userek[userek.length-1][ssz]);
            //console.log(userek[userek.length-1][ssz]+1);
            var ujSsz = userek[userek.length-1][ssz] + 1;
            //console.log(ujSsz);
            document.querySelector("tbody").innerHTML="";
            createTable(userek, ujSsz)
        },
        err => console.error(err)
        )
}

function createTable(userek, ujSsz) {
    let tb = document.querySelector("table tbody");
    for ( i of userek ) {
        let tr = document.createElement("tr");
        tb.appendChild(tr);
        for (k in i){
            if (k == ssz) {
                //console.log(i[k]);
                let th = document.createElement("th");
                th.innerHTML = i[k];
                tr.insertBefore(th, tr.childNodes[0]);
                th.setAttribute("scope", "row");
            } else {
                let td = document.createElement("td");
                td.innerHTML = i[k];
                tr.appendChild(td);
            };
        };
        createGombok(tr);
        //rowCalc();
        //deleteInputValues();
        //addRowFetch()
    };
    document.querySelector("#"+getInputIDs()[0]).value=ujSsz
}

function rowDel (gomb) {
    //console.log("valtozott");
    let selectedRow = gomb.parentElement.parentElement.parentElement;
    var sorszam = selectedRow.childNodes[0].innerHTML;
    selectedRow.parentElement.removeChild(selectedRow);
    //rowCalc();
    // var Nrek = document.querySelectorAll("table tbody tr th");
    // var userNumber = document.querySelector("table tbody").childElementCount;
    // for (i=0; i < Nrek.length; i++){Nrek[i].innerHTML = i+1};
    rowDelFetch(sorszam)
}

function createUsersDb() {
    var tomb = [];
    var sorok = document.querySelectorAll("table tbody tr");
    for ( i of sorok){
        var obj = {};
        for (var j=0; j<4; j++){
            var ertek = i.children[j].innerHTML;
            var oc = (kulcs[j]);
            obj[oc] = ertek;
            };
    tomb.push(obj)}
}

function rowDelFetch (sorszam) {
    fetch(`http://localhost:3000/users/${sorszam}`, fetchInitDelete).then(
        resolve => resolve.json(),
        rejet => console.error(reject)
    ).then(
        data => console.log(data),
        err => console.error(err)
    )
}

function addRowFetch (newUser) {
    fetchInitPost.body= JSON.stringify(newUser);
    fetch("http://localhost:3000/users", fetchInitPost).then(
        resolve => resolve.json(),
        rejet => console.error(reject)
    ).then(
        data => {
            console.log("POST fetch ment:");
            console.log(data);
            deleteInputValues();
            leker();
        },
        err => console.error(err)
    )
}
