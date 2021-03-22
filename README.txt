What does this site do?
My site is an API for managing tasks; it is meant to help me deal with the complexities of taking asynchronous courses. Tasks can be added to the list using the top-left form, and the task list can be updated with the top-middle form. Checking off a list item will make a POST to the server to mark it as completed, and the state will be preserved through page refreshes.

What part of the app does the API handle?
The API handles adding tasks to the JSON task list stored in the server, updating the task list by checking or unchecking it, and getting the current list of tasks.

What went right?
Creating the data structure for the task list was very straightforward, and relatively easy to work with. Once I got Bootstrap up and running, making CSS adjustments using bootstrap helper classes was easier than writing all of the CSS myself.

What went wrong?
I was not able to meet all of the project requirements, and I had to cut corners in my code quality and documentation. I will admit, my project is not what I would like it to be, but I must be careful to balance my time between classes, and my other group projects were much more demanding than expected.

If you were to continue, what would you do to improve your app?
If I were to continue with my application, I would add a more persistent database that would keep the tasks even upon server rebooting. Additionally, I would adjust the list itself to allow editing the values for the various task attributes as well (excluding the ID). I would also improve the code quality.

How did you go above and beyond?
I added Bootstrap to the project, and locally hosted all my files for Bootstrap, Ajax, Babel, and jQuery. Additionally, I added a simple toast notification system in the top-right corner that notifies the user whenever a response arrives.