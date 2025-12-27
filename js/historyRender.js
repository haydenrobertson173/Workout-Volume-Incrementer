import * as db      from "./db.js";

const workoutHistoryCard = document.getElementById("workout-history-card");
const prevWorkoutCard =    document.getElementById("previous-workout-display-card");
const prevWorkoutHeader =   document.getElementById("previous-workout-header");
const workoutHistoryCont =  document.getElementById("workout-history-cont");
const prevWorkoutCont =     document.getElementById("previous-workout-cont");

// Function to display the names and dates of all previous workouts
export function displayWorkoutHistory(dataRecords) {
    workoutHistoryCard.innerHTML = "";

    dataRecords.forEach(record =>  {

        const { exerciseName, createdAt, id, workoutArr } = record;

        //create card to hold each previous workout in a row container
        const card =  document.createElement("div");
        
        card.classList.add("history-workout-preview", "flex", "items-center", "justify-between", "gap-4", "border", "border-slate-200", "rounded-xl", "p-4", "bg-white", "hover:bg-slate-50", "transition", "cursor-pointer");
        card.dataset.id = id;

        const title = document.createElement("h3");
        title.classList.add("font-medium", "text-slate-900");
        title.innerText = exerciseName;

        const createdDate = document.createElement("p");
        createdDate.classList.add("text-sm", "text-slate-500");
        createdDate.innerText = new Date(createdAt).toLocaleDateString();
        
        const holderDiv =   document.createElement("div");
        holderDiv.className = "flex flex-col";
        holderDiv.append(title, createdDate);

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "history-delete-btn h-8 px-3 rounded-lg text-sm font-medium text-red-700 border border-red-300 hover:bg-red-50 hover:border-red-400 transition";
        
        card.append(holderDiv, deleteBtn);
        workoutHistoryCard.append(card);
        }
    )

} //EOF

// Function to display one previous progression
export function displayPreviousWorkout(dataRecords) {
    
    const { exerciseName, createdAt, id, workoutArr } = dataRecords;
    const createdDate = new Date(createdAt).toLocaleDateString();

    //Create card header that says the exercise name and date
    prevWorkoutHeader.innerText = `${exerciseName} ${createdDate}`;

    const workoutHeaderCont = document.createElement("div");
    prevWorkoutCard.replaceChildren();
    workoutHeaderCont.classList.add("grid", "grid-cols-4", "gap-2", "bg-slate-50", "px-4", "py-3", "text-xs", "font-semibold", "uppercase", "tracking-wide", "text-slate-600", "border-b", "border-slate-200");

    workoutHeaderCont.append(createCell("Weight"), createCell("Sets"), createCell("Reps"), createCell("Volume"));
    prevWorkoutCard.append(workoutHeaderCont);

    // Create rows of cells to display each value in the selected progression list
    for (const e of workoutArr) {
        const rowCont =    document.createElement("div");
        const weightCell = createCell(e.weight);
        const setCell =    createCell(e.sets);
        const repCell =    createCell(e.reps);
        const volCell =    createCell(e.volume);
        
        rowCont.classList.add("grid", "grid-cols-4", "gap-2", "px-4", "py-3", "text-sm", "text-slate-900", "border-b", "border-slate-100", "hover:bg-slate-50", "transition");
        rowCont.append(weightCell, setCell, repCell, volCell);
        prevWorkoutCard.append(rowCont);
    }

} //EOF

// show prev workout card
export function showPrevWorkout() {
    prevWorkoutCont.classList.remove("hidden");
    workoutHistoryCont.classList.add("hidden");
} //EOF

//show all workouts card 
export function showAllWorkoutHistory() {
    prevWorkoutCont.classList.add("hidden");
    workoutHistoryCont.classList.remove("hidden");
} //EOF

// Helper function to create header
function createCell(text) {
    const cell = document.createElement("div");
    cell.textContent = text;
    return cell;
} //EOF

