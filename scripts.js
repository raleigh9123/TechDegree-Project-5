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

const gallery = document.querySelector('.gallery');

const generateGallery = users => {
    users.results.map(person => {
        const cardHTML = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${person.picture.large}" alt="${person.name.first} ${person.name.last}">
            </div>
            <div class="card-info-container">
                <h3 id="${person.name.first}-${person.name.last}" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
        </div>
        `;

        gallery.innerHTML += cardHTML;
    });
};

const generateModals = users => {
    let modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    // modalContainer.style = 'display:none;';

    users.results.map(person => {
        console.log(person);

        const date = person.dob.date.toString();
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const monthDigit = parseInt(date.slice(5, 7));
        const month = months[monthDigit - 1];
        const day = date.slice(8, 10);
        const year = date.slice(0, 4);

        modalContainer.innerHTML += `
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${person.picture.large}" alt="${person.name.first} ${person.name.last}">
                        <h3 id="${person.name.first}-${person.name.last}" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="modal-text">${person.email}</p>
                        <p class="modal-text cap">${person.location.city}</p>
                        <hr>
                        <p class="modal-text">${person.phone}</p>
                        <p class="modal-text">${person.location.street.number} ${person.location.street.name}<br>${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                        <p class="modal-text">Birthday: ${month} ${day}, ${year}</p>
                    </div>
                </div>
            `;
        gallery.parentNode.insertBefore(modalContainer, gallery.nextElementSibling);
    });
};
