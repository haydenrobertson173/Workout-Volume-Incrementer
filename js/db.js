const DB_NAME =    "workout_app";
const DB_VERSION = 1;
const STORE_NAME = "progressions";

// Request to connect to database
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // If first time/new version
        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Create data stores
            if(!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { 
                    keyPath: "id",
                    autoIncrement: true,
                });
            };
        };

        request.onsuccess = () => resolve(request.result);
        
        request.onerror = () => reject(request.error);
    });

} //EOF

// Save progress to indexedDB
export async function saveProgression(exerciseName, workoutArr) {
    const db = await openDB();

    return new Promise((resolve, reject) => {

        // open tx and select store(table)
        const tx =    db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        

        // Record to be stored
        const record = {
            exerciseName,
            createdAt: Date.now(),
            workoutArr,
        };

        const req = store.add(record);

        let newID
        req.onsuccess = () => {
            newID = req.result;
        }

        req.onerror = () =>   reject(req.error);

        tx.oncomplete = () => resolve(newID);

        tx.onabort = () => reject(tx.error);

        tx.onerror = () => reject(tx.error);
    });

} //EOF

// Get all saved progressions/records
export async function getAllProgressions() {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx =    db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);

        const getReq = store.getAll();

        getReq.onsuccess = () => {
            console.log("success");
            resolve(getReq.result);
        };

        getReq.onerror = () =>  reject(getReq.error);
    });

} //EOF

// Get one progression/record by ID
export async function getProgressionById(recordId) {
    const db = await openDB();

    return new Promise(
        (resolve, reject) => {
            const tx =    db.transaction(STORE_NAME, "readonly");
            const store = tx.objectStore(STORE_NAME);

            const getReq = store.get(recordId);

            getReq.onsuccess = () => {
                console.log(getReq.result);                            
                resolve(getReq.result);
            }

            getReq.onerror = () => reject(getReq.error);
            
    });
    
} //EOF

export async function deleteProgression(recordId) {
    const db = await openDB();
    return new Promise((resolve, reject) => 
    {
        const tx =    db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);

        store.delete(recordId);

        tx.oncomplete = () => resolve(true);
        
        tx.onerror = () => reject(tx.error);

        tx.onabort = () => reject(tx.error);
    });
} //EOF