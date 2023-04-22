# Pomodoro App

## Goals
To build a vanilla JavaScript application that can be used to apply the [Pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique). The application's services should be:
    1. Listing one or multiple tasks to be done.
    2. Setting a timer of 25 minutes (*Pomodoro timer*).
    3. When the Pomodoro timer ends:
        a. A sound (*Pomodo sound*) should be played.
        b. Another timer of 5 minutes should start (*Pause timer*).
    4. When the Pause timer ends:
        a. A sound (*Break sound*) should be played.
        b. Another timer of 25 minutes should start (*Pomodo timer*).
    5. Every 4 Pomodoro timer shoud be followed by a longer Pause timer of 15 minutes.

    Concerning the tasks:
        a. Each task can be added using a button 'Add Task' (*Add button*).
        b. Clicking on that button open a menu where the user can name the task and precise how many Pomodoro timer it will require to be completed.
        c. Below the *name* and *pomodoro count* fields, two buttons (*Cancel* and *Save*) can be used to cancel or validate the task.
        d. Once a task is added, its field (*Task Container*) should take the place of the button used to create it and another Add button should appear below so that user can generate another new task.
        e. A Task container should display the name of the task and a little button (*Clear button*) to validate/unvalidate the task. Once a task is validate, it is crossed out (through CSS) and the time at which the task was finished is displayed.

## Links
- [Pomodoro Technique - Wikipedia](https://en.wikipedia.org/wiki/Pomodoro_Technique)
- [Pomofocus](https://pomofocus.io/)
- [Apple icon - Icons](https://icons8.com/icons/set/apple)
- [Cursor - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)
- [Palette - Coolors](https://coolors.co/palette/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529)

## To do

------------------ TO DO ------------------
- Changer le bouton Start en bouton Pause une fois qu'il a été pressé
- Modifier le style du bouton lorsqu'il est pressé (en Pause)
- Arrêter le compte à rebours lorsque la pause est active
- Reprendre le compte à rebours lorsque la pause est inactive
- Lors qu'une tâche est accomplie, inscrire dans son panneau dédié l'heure à laquelle elle a été terminé (*endTime* variable)


