showNotes();
showImpNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click" , addNote);

function addNote(){
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes"); 
    let titles = localStorage.getItem("titles"); 
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    if(titles == null){
        titlesObj = [];
    }
    else{
        titlesObj = JSON.parse(titles);
    }
    titlesObj.push(addTitle.value);
    notesObj.push(addTxt.value);
    localStorage.setItem("notes" , JSON.stringify(notesObj));
    localStorage.setItem("titles" , JSON.stringify(titlesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
}


function showNotes(){
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes"); 
    let titles = localStorage.getItem("titles"); 
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    if(titles == null){
        titlesObj = [];
    }
    else{
        titlesObj = JSON.parse(titles);
    }
    let html = ``; 
    notesObj.forEach((element,index) => {
        html+= `<div class="card noteCard my-2 mx-2" style="width: 18rem; " id="card${index}">
                    <div class="card-body">
                        <h5 class="card-title">${titlesObj[index]}</h5>
                        <p class="card-text">${element}</p>
                        <a href="#" id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary  my-1">Delete Note</a>
                        <a href="#" id="${index}" onClick="addToImp(this.id)" class="btn btn-primary  my-1">Add to Imp</a>
                    </div>
                </div>`;
    });
    
    if(notesObj.length != 0){
        document.getElementById("notes").innerHTML = html;
    }
    else{
        document.getElementById("notes").innerHTML = `Click on Add Note and add some notes`;
    }
}
function showNotes(){
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes"); 
    let titles = localStorage.getItem("titles"); 
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    if(titles == null){
        titlesObj = [];
    }
    else{
        titlesObj = JSON.parse(titles);
    }
    let html = ``; 
    notesObj.forEach((element,index) => {
        html+= `<div class="card noteCard my-2 mx-2" style="width: 18rem; " id="card${index}">
                    <div class="card-body">
                        <h5 class="card-title">${titlesObj[index]}</h5>
                        <p class="card-text">${element}</p>
                        <a href="#" id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary  my-1">Delete Note</a>
                        <a href="#" id="${index}" onClick="addToImp(this.id)" class="btn btn-primary  my-1">Add to Imp</a>
                    </div>
                </div>`;
    });
    
    if(notesObj.length != 0){
        document.getElementById("notes").innerHTML = html;
    }
    else{
        document.getElementById("notes").innerHTML = `Click on Add Note and add some notes`;
    }
}

function deleteNote(index){
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes"); 
    let titles = localStorage.getItem("titles"); 
    
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    if(titles == null){
        titlesObj = [];
    }
    else{
        titlesObj = JSON.parse(titles);
    }
    
    notesObj.splice(index , 1);
    titlesObj.splice(index , 1);
    localStorage.setItem("notes" , JSON.stringify(notesObj));
    localStorage.setItem("titles" , JSON.stringify(titlesObj));
    showNotes();
    
}
let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input" , searched)

function searched(){
    searchTxtVal = searchTxt.value.toLowerCase();
    
    console.log(searchTxtVal)
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(element => {
        let notesVal = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        // notesVal = notesVal.toLowerCase();
        let titleVal = element.getElementsByTagName("H5")[0].innerText.toLowerCase();
        // titleVal = titleVal.toLowerCase();
        if(notesVal.includes(searchTxtVal)|| titleVal.includes(searchTxtVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none"
        }
    });
}

function addToImp(index){
    
    impTitlesObj.push(titlesObj[index])
    impNotesObj.push(notesObj[index])
    titlesObj.splice(index,1)
    notesObj.splice(index,1)
    localStorage.setItem("impTitles" , JSON.stringify(impTitlesObj))
    localStorage.setItem("impNotes" , JSON.stringify(impNotesObj))
    localStorage.setItem("notes" , JSON.stringify(notesObj));
    localStorage.setItem("titles" , JSON.stringify(titlesObj));
    showNotes();
    showImpNotes();
}

function showImpNotes(){
    let impTitles = localStorage.getItem("impTitles");
    let impNotes = localStorage.getItem("impNotes");
    if(impTitles == null){
        impTitlesObj = []
    }
    else{
        impTitlesObj = JSON.parse(impTitles);
    }
    if(impNotes == null){
        impNotesObj = []
    }
    else{
        impNotesObj = JSON.parse(impNotes);
    }
    let html = ``; 
    impNotesObj.forEach((element,index) => {
        html+= `<div class="card noteCard my-2 mx-2"  style="width: 18rem ; background-color: rgb(32,42,45 ) ; color: white " id="card${index}">
                    <div class="card-body">
                        <h5 class="card-title">${impTitlesObj[index]}</h5>
                        <p class="card-text">${element}</p>
                        <a href="#" id="${index}" onClick="deleteImpNote(this.id)" class="btn btn-danger   my-1">Delete Note</a>
                        <a href="#" id="${index}" onClick="rmvFromImp(this.id)" class="btn btn-danger  my-1">Remove From Imp</a>
                    </div>
                </div>`;
    });
    
    if(impNotesObj.length != 0){
        document.getElementById("impNotes").innerHTML = html;
    }
    else{
        document.getElementById("impNotes").innerHTML = `Click on Add to Imp button and add some imp notes`;
    }
}


function deleteImpNote(index){
    let impTitles = localStorage.getItem("impTitles");
    let impNotes = localStorage.getItem("impNotes");
    if(impTitles == null){
        impTitlesObj = []
    }
    else{
        impTitlesObj = JSON.parse(impTitles);
    }
    if(impNotes == null){
        impNotesObj = []
    }
    else{
        impNotesObj = JSON.parse(impNotes);
    }
    impTitlesObj.splice(index,1);
    impNotesObj.splice(index,1);
    localStorage.setItem("impTitles" , JSON.stringify(impTitlesObj));
    localStorage.setItem("impNotes" , JSON.stringify(impNotesObj));
    showImpNotes();
}

function rmvFromImp(index){
    let notes = localStorage.getItem("notes"); 
    let titles = localStorage.getItem("titles"); 
    
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    if(titles == null){
        titlesObj = [];
    }
    else{
        titlesObj = JSON.parse(titles);
    }

    let impTitles = localStorage.getItem("impTitles");
    let impNotes = localStorage.getItem("impNotes");
    if(impTitles == null){
        impTitlesObj = []
    }
    else{
        impTitlesObj = JSON.parse(impTitles);
    }
    if(impNotes == null){
        impNotesObj = []
    }
    else{
        impNotesObj = JSON.parse(impNotes);
    }

    titlesObj.push(impTitlesObj[index]);
    notesObj.push(impNotesObj[index]);
    impTitlesObj.splice(index , 1);
    impNotesObj.splice(index , 1);
    localStorage.setItem("impTitles" , JSON.stringify(impTitlesObj))
    localStorage.setItem("impNotes" , JSON.stringify(impNotesObj))
    localStorage.setItem("notes" , JSON.stringify(notesObj));
    localStorage.setItem("titles" , JSON.stringify(titlesObj));
    showImpNotes();
    showNotes();

}