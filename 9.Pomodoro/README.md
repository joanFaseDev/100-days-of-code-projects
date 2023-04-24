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

## To do
- Implement the feature to instantly change the application state from 'Pomodoro' to 'Short Break' throught a new div of three buttons located at the top of the countdown.
- Pressing one of these buttons do the following:
    - Change the visual of the web page depending of the state selected ('Pomodoro', 'Short Break', 'Long Break').
    - Change the countdown's time to match the state selected ('Pomodoro' = 25 minutes, 'Short Break' = 5 minutes, 'Long Break' = 15 minutes).
    - Change the footer's message (located below the pomodoro count) to match the state selected ('Pomodoro' or 'Break'). 

- Implement the tasks feature
- Change the favicon's color depending of the application's actual state ('Pomodoro', 'Short Break' or 'Long Break').

## Links
- [Pomodoro Technique - Wikipedia](https://en.wikipedia.org/wiki/Pomodoro_Technique)
- [Pomofocus](https://pomofocus.io/)
- [Apple icon - Icons](https://icons8.com/icons/set/apple)
- [Cursor - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)
- [Palette - Coolors](https://coolors.co/palette/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529)




