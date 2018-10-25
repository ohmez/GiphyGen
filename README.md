# GiphyGen
![Welcome to Giphy Gen](assets/images/background.jpg "Welcome to Giphy Gen")
## Store your favorite Gifs from Giphy
## Store your favorite Gif searches.

### Problem
Challenge was to paginate the Gifs from the Giphy API and allow user input to generate API requests. 
We were challenged to paginate the first row with 3 Gifs then the second row with 4 Gifs and 3rd row with 3 Gifs equaling 10. 

### Approach
My approach is always to limit waste.
So I created global variables with empty arrays to push the content too from the API return and also for the favorites population. 
Every button has a variable assigned to it with the key to search in the API to generate the giphs, this way only one function is needed for all the buttons. 
I try to limit repeating code, I found the pagination was easier to copy paste the code instead of writing a more complex formula to paginate.

### Future Plans
I would like to dive more into my pagination on this and try to create one function that paginates much better.
I believe if I used viewer width as the controlling factor for the Gif sizes I could simplify the pagination.

