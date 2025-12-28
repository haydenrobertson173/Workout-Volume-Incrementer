# Workout Volume Incrementer

A web-based app that generates a simple exercise progression based on the principle of progressive overload of total volume (reps * sets * weight).  The user inputs the initial weight, reps, sets, as well as the tolerated variability and cycle duration.  The app generates a workout that makes the smallest possible increments in volume week-to-week.  The user can then store their progression and view past progressions.

## Features

- Generate workouts based on selected parameters
- Save workouts
- View previously saved workouts

## Dependencies

This app uses minimal dependencies and does not require package installation.

### Styling
- Tailwind CSS (via CDN)

### Runtime
- Modern web browser (Chrome, Firefox, etc.)
- IndexedDB (browser-based local data storage)

## How to Run

Because this project uses ES modules, it requires a local server.

### Option 1: VS Code Live Server
- Download the **live Server** extension in VS Code. 
- Open index.html and select Go Live.

### Option 2: Python Local Server
- From within the project directory, run:

```bash 
python3 -m http.server 8000 
```
Then open http://localhost:8000 in your browser.

## TODO
- fix resizing issues for small screens
