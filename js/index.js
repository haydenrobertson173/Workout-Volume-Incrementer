import { generateWorkout } from "./generator.js";
import * as render  from "./indexRender.js";
import * as db      from "./db.js";


// create array to hold new workout
let newWorkoutArr = [];
// get static elements
const generateWorkBtn =   document.getElementById("generate-workout-btn");
const backToMainBtn =     document.getElementById("back-to-main-btn");
const saveWorkoutBtn =    document.getElementById("save-workout-btn");
const mainToPreviousBtn = document.getElementById("home-to-history-btn");

// grab values and create an object to pass to generator
function getUserVals() {
    const exerciseName =             document.getElementById("exercise-name").value;
    const startingWeight =  parseInt(document.getElementById("starting-weight").value, 10);
    const startingSets =    parseInt(document.getElementById("starting-sets").value, 10);
    const startingReps =    parseInt(document.getElementById("starting-reps").value, 10);
    const weightVariation = parseInt(document.getElementById("weight-variation").value, 10);
    const setVariation =    parseInt(document.getElementById("set-variation").value, 10);
    const repVariation =    parseInt(document.getElementById("rep-variation").value, 10);

    const userValues = {
        name: exerciseName,
        start: {
            weight: startingWeight, sets: startingSets, reps: startingReps
        },
        variation: {
            weight: weightVariation, sets: setVariation, reps: repVariation
        }
    }

    return userValues;

} //EOF

// Create workout button that gets values and calles generator.js to create progression
generateWorkBtn.addEventListener("click", 
    () => {
        const userValues =  getUserVals();
        const cycleLength = parseInt(document.getElementById("cycle-length").value, 10);

        newWorkoutArr = generateWorkout(userValues).slice(0, cycleLength);

        render.showWorkoutCard();
        render.displayWorkout(newWorkoutArr); 
    }

); //EOListener

// Back to main screen button
backToMainBtn.addEventListener("click", 
    () => {
        render.showMainCard();
    }
); //EOListener

// Save workout button
saveWorkoutBtn.addEventListener("click",
    async () => {
        try {
            const exerciseName = document.getElementById("exercise-name").value;
            const id = await db.saveProgression(exerciseName, newWorkoutArr);
            console.log("workout saved with id:", id);
        } catch(err) {
            console.log("Error saving workout");
        }

        window.location.href = "history.html";
    }
); //EOListener

mainToPreviousBtn.addEventListener("click", 
    () => {
        window.location.href = "history.html";
    }
); //EOListener
