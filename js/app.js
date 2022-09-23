showNotes();
showImpNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notess = localStorage.getItem("notes");
  let titles = localStorage.getItem("titles")
  if (notess == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(titles);
  }
  if (titles == null) {
    titlesObj = [];
  } else {
    titlesObj = JSON.parse(titles);
  }
//   let regEx = /^[a-zA-Z0-9]+$/;
//   if(addTxt.value.match(regEx) &&  addTitle.value.match(regEx)){
//     notesObj.push(addTxt.value);
//     titlesObj.push(addTitle.value);
//   }
  
//   else{
//       alert("Title and Note Can not be empty ");
//   }

  notesObj.push(addTxt.value);
  titlesObj.push(addTitle.value);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("titles", JSON.stringify(titlesObj));
  addTxt.value = " ";
  addTitle.value = " ";
  showNotes();
});

function showNotes() {
  let notess = localStorage.getItem("notes");
  let titles = localStorage.getItem("titles");
  if (notess == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notess);
  }
  if (titles == null) {
    titlesObj = [];
  } else {
    titlesObj = JSON.parse(titles);
  }
  let html = ``;
  notesObj.forEach(function (element, index) {
    html += `
        <div class="card noteCard my-2 mx-2" style="width: 18rem;" id="card${index}">
            <div class="card-body">
                <h5 class="card-title">${titlesObj[index]}</h5>
                <p class="card-text">${element}</p>
                <a href="#" id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary my-1">Delete Note</a>
                <a href="#" id="${index}" onClick="addToImportant(this.id)" class="btn btn-primary">Add to Important</a>
            </div>
        </div>`;
  });
  if(notesObj.length !=0){
    document.getElementById("notes").innerHTML = html;
  }
  else{
      document.getElementById("notes").innerHTML = "Nothing to show, Use 'Add a Note' button to add text "
  }
}


function deleteNote(index){
    let notess = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");
    if (notess == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notess);
    }    

    if (titles == null) {
        titlesObj = [];
      } else {
        titlesObj = JSON.parse(titles);
    }


    titlesObj.splice(index,1)
    notesObj.splice(index,1)
    localStorage.setItem("notes" , JSON.stringify(notesObj))
    localStorage.setItem("titles" , JSON.stringify(titlesObj))
    showNotes();
}



searchTxt = document.getElementById("searchTxt");

searchTxt.addEventListener("input" , function(){
    let searchVal = searchTxt.value;
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        notesValue = element.getElementsByTagName("p")[0].innerText;
        if(notesValue.includes(searchVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
    console.log("input event fired " + searchVal);
})


function addToImportant(index){
    let notess = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");
    if (notess == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notess);
    }    

    if (titles == null) {
        titlesObj = [];
      } else {
        titlesObj = JSON.parse(titles);
    }

    
    let impNotes = localStorage.getItem("impNotes");
    let impTitles = localStorage.getItem("impTitles");

    if (impNotes == null) {
        impNotesObj = [];
    } else {
        impNotesObj = JSON.parse(impTitles);
    }
    if (impTitles == null) {
        impTitlesObj = [];
    } else {
        impTitlesObj = JSON.parse(impTitles);
    }
    impNotesObj.push(notesObj[index])
    impTitlesObj.push(titlesObj[index])
    titlesObj.splice(index,1)
    notesObj.splice(index,1)
    localStorage.setItem("notes" , JSON.stringify(notesObj))
    localStorage.setItem("titles" , JSON.stringify(titlesObj))
    localStorage.setItem("impTitles", JSON.stringify(impTitlesObj))
    localStorage.setItem("impNotes"  ,JSON.stringify(impNotesObj))
    showImpNotes();
    // console.log("ATI is Clicked of " + index)
    // document.getElementById("impNotes").appendChild(document.getElementById(`card${index}`));
    // document.getElementById("notes").removeChild(document.getElementById(`card${index}`))
}



function showImpNotes() {
    let impNotes = localStorage.getItem("impNotes");
    let impTitles = localStorage.getItem("impTitles");
    if (impNotes == null) {
        impNotesObj = [];
    } else {
        impNotesObj = JSON.parse(impTitles);
    }
    if (impTitles == null) {
        impTitlesObj = [];
    } else {
        impTitlesObj = JSON.parse(impTitles);
    }
    let html = ``;
    impNotesObj.forEach(function (element, index) {
      html += `
          <div class="card noteCard my-2 mx-2" style="width: 18rem; background-color:gray" id="card${index}">
              <div class="card-body">
                  <h5 class="card-title">${impTitlesObj[index]}</h5>
                  <p class="card-text">${element}</p>
                  <a href="#" id="${index}" onClick="deleteNote(this.id)" class="btn btn-info  my-1">Delete Note</a>
              </div>
          </div>`;
    });
    if(impNotesObj.length !=0){
      document.getElementById("impNotes").innerHTML = html;
    }
    else{
        document.getElementById("notes").innerHTML = "Nothing to show, Use 'Add to Important' button to add Imp Notes "
    }
  }