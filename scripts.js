/* JS Scripts for TechDegree Project 5 */

// ------------------------------------------
// GENERATE FORM INPUTS
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
//  FETCH FUNCTIONS
// ------------------------------------------

/*
 * Send a single request to the The Random User Generator API
 * Use the response data to display 12 users
 */
const randomUserURL = 'https://randomuser.me/api/';
const numUsers = 12;
const nationality = 'US';

fetch(`${randomUserURL}?results=${numUsers}&nat=${nationality}`)
    .then(res => res.json())
    .then(users => {
        generateGallery(users);
        generateModals(users);
    })
    .finally(() => {
        setListenerQueries();
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
        gallery.parentNode.insertBefore(modalContainer, gallery.nextSibling);
    });
};

// ------------------------------------------
//  Listener FUNCTIONS
// ------------------------------------------

const setListenerQueries = () => {
    let index;

    const cards = Array.from(document.querySelectorAll('.card'));
    const modals = Array.from(document.querySelectorAll('.modal'));
    const modalDiv = document.querySelector('.modal-container');

    // Open clicked card
    gallery.addEventListener('click', e => {
        if (e.target.className === 'card') {
            for (i = 0; i < cards.length; i++) {
                if (e.target === cards[i]) {
                    index = i;
                }
            }
            modalDiv.classList.remove('_hidden');
            modals[index].classList.remove('_hidden');
            showModal();
        }
    });

    const closeBtn = document.querySelectorAll('.modal-close-btn');
    const nextBtn = document.querySelectorAll('#modal-next');
    const prevBtn = document.querySelectorAll('#modal-prev');
    function showModal() {
        modals[index].classList.add('_top-modal');
    }
    function hideModal() {
        modals[index].classList.remove('_top-modal');
    }
    modalDiv.addEventListener('click', e => {
        // Close Button
        modals.forEach(modal => {
            if (e.target === modalDiv && e.target !== modal) {
                modalDiv.classList.add('_hidden');
                hideModal();
            }
        });
        closeBtn.forEach(button => {
            if (e.target === button) {
                modalDiv.classList.add('_hidden');
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
};
