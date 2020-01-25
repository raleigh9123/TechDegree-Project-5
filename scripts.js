/* JS Scripts for TechDegree Project 5 */

// ------------------------------------------
//  SETUP FUNCTIONS
// ------------------------------------------

// Add Search Inputs to HTML
(() => {
    const search = document.querySelector('.search-container');

    const form = document.createElement('form');
    form.setAttribute('action', '#');
    form.setAttribute('method', 'GET');

    function createInput(type, IDCSS) {
        let el = document.createElement('input');
        el.setAttribute('type', type);
        el.setAttribute('id', IDCSS);
        el.className = IDCSS;
        return el;
    }

    const searchInput = createInput('search', 'search-input');
    searchInput.setAttribute('placeholder', 'Search...');
    const submitInput = createInput('submit', 'search-submit');
    submitInput.setAttribute('value', 'Submit');

    form.appendChild(searchInput);
    form.appendChild(submitInput);

    search.appendChild(form);
})();

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

/*
 * Send a single request to the The Random User Generator API
 * Use the response data to display 12 users
 */
const randomUserURL = 'https://randomuser.me/api/';
const numUsers = 12;

fetch(`${randomUserURL}?results=${numUsers}`)
    .then(res => res.json())
    .then(users => {
        generateGallery(users);
        generateModals(users);
    });

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
