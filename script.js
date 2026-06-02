const saveBtn = document.getElementById("saveBtn");
const journalInput = document.getElementById("journalInput");
const entriesDiv = document.getElementById("entries");

let entries =
JSON.parse(localStorage.getItem("journalEntries")) || [];

function saveToLocalStorage(){

    localStorage.setItem(
        "journalEntries",
        JSON.stringify(entries)
    );

}

function displayEntries(){

    entriesDiv.innerHTML = "";

    entries.slice().reverse().forEach((entry,index)=>{

        const entryDiv =
        document.createElement("div");

        entryDiv.classList.add("entry");

        entryDiv.innerHTML = `
            <div class="entry-time">
                ${entry.date}
            </div>

            <p>${entry.text}</p>

            <button
            class="delete-btn"
            onclick="deleteEntry(${entries.length-1-index})">
            Delete
            </button>
        `;

        entriesDiv.appendChild(entryDiv);

    });

}

saveBtn.addEventListener("click",()=>{

    const text =
    journalInput.value.trim();

    if(!text){
        alert("Please write something!");
        return;
    }

    const newEntry = {

        text:text,

        date:new Date()
        .toLocaleString()

    };

    entries.push(newEntry);

    saveToLocalStorage();

    displayEntries();

    journalInput.value="";

});

function deleteEntry(index){

    entries.splice(index,1);

    saveToLocalStorage();

    displayEntries();

}

displayEntries();
