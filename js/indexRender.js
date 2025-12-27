

// WorkoutArr schema = [ {weight: a, sets: b, reps: c, volume: n}, ... ]
const workoutDisplayCard = document.getElementById("workout-display-card");
const mainDisplayCard =    document.getElementById("main-card");
const workoutDisplayCont = document.getElementById("workout-cont");


// Display generated Workout
export function displayWorkout(workoutArr) {

    const workoutHeaderCont = document.createElement("div");
    workoutDisplayCont.replaceChildren();
    workoutHeaderCont.classList.add("grid", "grid-cols-4", "gap-2", "bg-slate-50", "px-4", "py-3", "text-xs", "font-semibold", "uppercase", "tracking-wide", "text-slate-600", "border-b", "border-slate-200");

    // Create header for displaying generated workout
    workoutHeaderCont.append(createCell("Weight"), createCell("Sets"), createCell("Reps"), createCell("Volume"));
    workoutDisplayCont.append(workoutHeaderCont);

    // Create row of cells for each value in workout progression object and list
    for(const e of workoutArr) {
        const rowCont =    document.createElement("div");
        const weightCell = createCell(e.weight);
        const setCell =    createCell(e.sets);
        const repCell =    createCell(e.reps);
        const volCell =    createCell(e.volume);
        
        rowCont.classList.add("grid", "grid-cols-4", "gap-2", "px-4", "py-3", "text-sm", "text-slate-900", "border-b", "border-slate-100", "hover:bg-slate-50", "transition")
        rowCont.append(weightCell, setCell, repCell, volCell);
        workoutDisplayCont.append(rowCont);
    }

} //EOF

// Display workout card
export function showWorkoutCard() {
    workoutDisplayCard.classList.remove("hidden");
    mainDisplayCard.classList.add("hidden");
} //EOF

// show main input card
export function showMainCard() {
    workoutDisplayCard.classList.add("hidden");
    mainDisplayCard.classList.remove("hidden");
} //EOF

// Helper function
function createCell(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div;
} //EOF
