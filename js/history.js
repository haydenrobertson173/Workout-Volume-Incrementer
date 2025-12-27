import * as db      from "./db.js";
import * as historyRender from "./historyRender.js";

const backToHomeBtn =      document.getElementById("history-to-home-btn");
const workoutHistoryCont = document.getElementById("workout-history-card");
const backToHistoryBtn =   document.getElementById("previous-to-history-btn");

// Get all saved progressions from db and display
const workoutHistory = await db.getAllProgressions();
console.log(workoutHistory);
historyRender.displayWorkoutHistory(workoutHistory);

// Back to home button
backToHomeBtn.addEventListener("click", 
    () => {
        window.location.href = "index.html";
    }

) //EOListener

// Allow user to select a previous workout and display it or delete it
workoutHistoryCont.addEventListener("click", 
    async (event) => {
        const deleteBtn = event.target.closest(".history-delete-btn");
        if (deleteBtn) {
            const card = deleteBtn.closest(".history-workout-preview");
            if (!card) return;
            const recordId = Number(card.dataset.id);
            await db.deleteProgression(recordId);

            const records = await db.getAllProgressions();
            historyRender.displayWorkoutHistory(records);
            return;
        }
        
        const selCard = event.target.closest(".history-workout-preview");
        if(!selCard) return;
        const recordId = Number(selCard.dataset.id);
        console.log(typeof recordId);                                              
        const record =  await db.getProgressionById(recordId);

        historyRender.displayPreviousWorkout(record);
        historyRender.showPrevWorkout();
    }

) //EOListener

// singular previous workout display -> to all previous progressions
backToHistoryBtn.addEventListener("click", 
    () => {
        historyRender.showAllWorkoutHistory();
    }

) //EOListener