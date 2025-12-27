
export function generateWorkout(userValues) {
    // deconstruct object / argument
    const {
        name, 
        start: {
            weight: strtWeight, sets: strtSets, reps: strtReps
        }, 
        variation: {
            weight: weightVar, sets: setVar, reps: repVar
        }
    } = userValues;
    
    const initVolume = strtWeight * strtReps * strtSets;
                                           
    // Create all possible combinations for weight
    const repArr =      arrayCreate(repVar, strtReps, 1, 1); 
    const setArr =      arrayCreate(setVar, strtSets, 1, 1);
    const weightArr =   arrayCreate(weightVar, strtWeight, 0, 5);

    // create all possible values for volume in an arr of objects
    let volumeArr = [];
    weightArr.forEach(w => {
        setArr.forEach(s => {
            repArr.forEach(r => {
                volumeArr.push({weight: w, sets: s, reps: r, volume: w * s * r});
            });
        });
    });
    // Filter array based on volumes that are larger than initial vol, and then sort in ascending order
    volumeArr = volumeArr.filter(obj => obj.volume > initVolume).sort((a, b) => a.volume - b.volume);

    // next -> erase duplicates and add to new array
    const dedupedVolArr = [];
    let tempVol = null;
    for(const e of volumeArr) {
        if(e.volume != tempVol) {
            dedupedVolArr.push(e);
            tempVol = e.volume;
        }
    }
    
    return dedupedVolArr;
    
} //EOF


// Create an array given the specified variance and increment 
// (ex: rep variance = 2, start reps = 3, increment = 1  -> [1,2,3,4,5])
function arrayCreate(variance, center, minAllowed, increment) {
    let returnArray = [];

    let min = center - variance;
    if(min < minAllowed) {
        min = minAllowed;
    }

    const max = center + variance;

    for(let i = min; i <= max; i += increment) {
        returnArray.push(i);
    }

    return returnArray;

} //EOF