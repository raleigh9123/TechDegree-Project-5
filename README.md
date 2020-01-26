# TechDegree-Project-5
 Project 5 - Object Oriented Programming: Game Show App

--Description
This project builds a randomly generated user directory that might be used to provide information about employees internally on a company website. The web page displays 12 randomly generated people on their own cards with some identifying details (each person is known within the random user API as 'users'). Users are then able to click on a person to open a modal popup. This popup includes more information about the person as well as buttons to cycle forward or backward from the page's list of persons. Lastly, the page includes a search function that filters cards listed on the page by name. This filter highlights any positive results.

--Skills and Process
Skills: HTTP Requests, Fetch API, JSON manipulation, DOM manipulation, Event Handlers, CSS (including transitions)
-Besides a few container div's, the web page is generated entirely via JS.
-Page makes a request to the https://randomuser.me/ API, formats data into JSON, then takes formatted data and renders the card gallery and modal popups (initially hidden)
-Fetch API specifies a 'GET' request to specify a couple parameters (number of users and nationality) for random user generator received.
-Error handling provides users with on-page feedback in case fetch error fails, then logs error to dev console.
-Helper functions generate: 
    1. gallery cards with each user's image, name, email, and location 
    2: modal popups with above user information as well as phone number, address, and birthdate. Modal popups include navigation buttons to cycle through users on page.
-Event Listeners provide functionality to: 
    1. open modal popups using css display, opacity, and transition properties 
    2. allow next/prev user navigation by compiling all users on-screen into arrays and using an index to cycle through users. 3. filter on-screen users by name via user search input. Since only 12 users exist on the page, input simply highlights positive results and dims negative matches, rather than removing or hiding card(s) from page. 
-Change CSS to allow JS to utilize classes to show and hide modal popups, or to highlight/darken positive/negative filtered search matches

--Project Attempt
Exceeds Expectations
-Search: filters directory by name. Since all modals are generated per page load, and only 12 results exist on page, search uses CSS to highlight positive results rather than remove results from page.

-Modal Toggle: provides navigation buttons on each modal to cycle through existing modal popups. This functions by gathering all modals and all cards into separate arrays. Since both modals and popups are generated using the same request of the Random User API, they will always have the same number of items and be generated in the correct order. This made cycling through modals easy by assigning an index to the selected card and using that index to cycle through the next or previous popup by changing the index. Looping at the end or beginning of the list is easy by resetting the index when it is 0 or total number of cards, ensuring functionality does not break at the beginning or end of the list.
-CSS additions seem minor, but are significant. CSS includes darker background to provide better page contrast for cards. CSS from project initialization was altered for modal popups, and particularly navigation buttons, to improve readability and positioning. Since JS uses CSS classes to hide or show modal popups, position properties were changed to allow use of z-index, and improve page layout of nav buttons. Lastly, since the search function on page is a simple filter, css highlights positive matches, and dims negative results