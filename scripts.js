/* JS Scripts for TechDegree Project 5 */

// ------------------------------------------
// GENERATE FORM INPUT
// ------------------------------------------

// Add Search Inputs to HTML
(() => {
    const search = document.querySelector('.search-container');

    const form = document.createElement('form');
    form.setAttribute('action', '#');
    form.setAttribute('method', 'GET');

    function createInput(type, CSS) {
        let el = document.createElement('input');
        el.setAttribute('type', type);
        el.setAttribute('id', CSS);
        el.className = CSS;
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
//  FETCH FUNCTION
// ------------------------------------------

/*
 * Send a single request to the The Random User Generator API and chain methods:
 * 1. Resolve JSON Data
 * 2. Provide Error Logging
 * 3. Generate HTML from JSON Data
 * 4. Add Event Listeners/Enable User Interaction
 *
 */
const randomUserURL = 'https://randomuser.me/api/';
const numUsers = 12;
const nationality = 'US';

fetch(`${randomUserURL}?results=${numUsers}&nat=${nationality}`)
    .then(res => res.json())
    .catch(error => {
        document.querySelector('.gallery').innerHTML =
            '<h3>There was an error processing your request. Please refresh the page.</h3>';
        console.log(error);
    })
    .then(users => {
        generateGallery(users);
        generateModals(users);
    })
    .finally(() => {
        createEventListeners();
    });

// ------------------------------------------
//  HELPER FUNCTIONS - GENERATE HTML
// ------------------------------------------

const gallery = document.querySelector('.gallery');

// Generate a user card in HTML for each user provided by API
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

// Generate Modal popup for each user card using same Random User API data
const generateModals = users => {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container', '_hidden');

    users.results.map(person => {
        const formatDate = userBirthday => {
            const date = userBirthday.toString();
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
            return `${month} ${day}, ${year}`;
        };
        const formattedDate = formatDate(person.dob.date);

        modalContainer.innerHTML += `
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${person.picture.large}" alt="${person.name.first} ${person.name.last}">
                        <h3 id="${person.name.first}-${person.name.last}-modal" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="modal-text">${person.email}</p>
                        <p class="modal-text cap">${person.location.city}</p>
                        <hr>
                        <p class="modal-text">${person.phone}</p>
                        <p class="modal-text">${person.location.street.number} ${person.location.street.name}<br>${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                        <p class="modal-text">Birthday: ${formattedDate}</p>
                    </div>
                    <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
                </div>
            `;
    });
    gallery.parentNode.insertBefore(modalContainer, gallery.nextSibling);
};

// ------------------------------------------
//  HELPER FUNCTIONS - EVENT LISTENERS
// ------------------------------------------

//
const createEventListeners = () => {
    let index;

    // Modal Popup Selectors
    const cards = document.querySelectorAll('.card');
    const modals = document.querySelectorAll('.modal');
    const modalContainer = document.querySelector('.modal-container');

    // Modal button Selectors
    const closeBtn = document.querySelectorAll('.modal-close-btn');
    const nextBtn = document.querySelectorAll('#modal-next');
    const prevBtn = document.querySelectorAll('#modal-prev');

    // Helper Functions
    function showModal() {
        modals[index].classList.add('_top-modal');
    }
    function hideModal() {
        modals[index].classList.remove('_top-modal');
    }

    // Open clicked card
    gallery.addEventListener('click', e => {
        if (e.target.classList.contains('card')) {
            for (i = 0; i < cards.length; i++) {
                if (e.target === cards[i]) {
                    index = i;
                }
            }
            modalContainer.classList.remove('_hidden');
            modals[index].classList.remove('_hidden');
            showModal();
        }
    });
    // Next, Previous, and Close Btn's
    modalContainer.addEventListener('click', e => {
        // Close Button
        modals.forEach(modal => {
            if (e.target === modalContainer && e.target !== modal) {
                modalContainer.classList.add('_hidden');
                hideModal();
            }
        });
        closeBtn.forEach(button => {
            if (e.target === button) {
                modalContainer.classList.add('_hidden');
                hideModal();
            }
        });
        // Forward button
        nextBtn.forEach(button => {
            if (e.target === button) {
                hideModal();
                if (index === modals.length - 1) {
                    index = 0;
                } else {
                    index++;
                }
                showModal();
            }
        });

        // Backward button
        prevBtn.forEach(button => {
            if (e.target === button) {
                hideModal();
                if (index === 0) {
                    index = modals.length - 1;
                } else {
                    index--;
                }
                showModal();
            }
        });
    });

    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');

    // Add "Search" to filter results on screen
    searchSubmit.addEventListener('click', () => {
        const userInput = searchInput.value;

        for (i = 0; i < modals.length; i++) {
            cards[i].className = 'card';
        }

        for (i = 0; i < modals.length; i++) {
            const name = document.querySelectorAll('.card h3')[i].textContent.toLowerCase();

            if (searchInput.value !== '') {
                if (!name.includes(userInput)) {
                    cards[i].classList.add('darken');
                } else {
                    cards[i].classList.add('highlight');
                }
            }
        }

        searchInput.value = '';
    });
};
