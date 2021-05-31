I spent an unfortunate amount of time trying to get the cards draggable within their lists (I admit I enjoyed it, though). The method I was using was a useRef() for the draggable card so that I could keep track of its current location, and then reordering the list based on index.

One problem I encountered is that the way I’m rendering the lists/cards is by sorting each card by its status (list). But for the above functionality to work, I need a separate array for each status so that I can sort them by index. I did at one point create separate lists and I saved them in a state object of arrays (filter the list of all cards by “status”), but this was a code smell that I would probably rethink the architecture in order to make it work.

(I actually did get it working, but couldn’t get it working in conjunction with the separate function that was dealing with the drag and drop between columns. I would need more time to figure out a way to merge the two.)
