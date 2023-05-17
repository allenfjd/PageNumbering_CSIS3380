// Import the users array from the data.mjs file
import { users } from './data.mjs';

//  *****THIS PIECE OF CODE IS TO CHECK IF THE IMPORT OF THE FILE HAS BEEN DONE SUCCESFULLY****
// Loop through each user object in the users array
// for (let user of users) {
//   // Display the user object in the console
//   console.log(user);
// console.log(users.length);
// }

// define the number of contacts per page
const contactsPerPage = 10;

function generateContactList(pageIndex) {
  // calculate the start and end index of the contacts to display on this page
  const startIndex = (pageIndex - 1) * contactsPerPage;
  const endIndex = pageIndex * contactsPerPage;

  // slice the array to get only the contacts for this page
  const contactsForPage = users.slice(startIndex, endIndex);

  // generate the HTML for the contact list
  let contactListHTML = '';
  for (const contact of contactsForPage) {
    contactListHTML += `
      <li class="contact-item cf">
        <div class="contact-details">
          <img class="avatar" src="${contact.image}">
          <h3>${contact.name}</h3>
          <span class="email">${contact.email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${contact.joined}</span>
        </div>
      </li>
    `;
  }

  // add the contact list to the container
  const contactListContainer = document.querySelector('.contact-list');
  contactListContainer.innerHTML = contactListHTML;
}

function generatePaginationLinks(totalContacts) {
  // calculate the total number of pages
  const totalPages = Math.ceil(totalContacts / contactsPerPage);

  // generate the pagination links
  let linksHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    linksHTML += `<a href="#" class="pagination-link" data-page="${i}">${i}</a>`;
  }

  // add the links to the container
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = linksHTML;

  // add event listeners to the links to change pages
  const paginationLinks = document.querySelectorAll('.pagination-link');
  for (const link of paginationLinks) {
    link.addEventListener('click', event => {
      event.preventDefault();
      //this next line of code is responsible for extracting the value of the data-page attribute from the clicked pagination link and converting it to an integer
      /*
      event refers to the click event object that is passed as an argument to the event listener callback function.
      event.target refers to the DOM element that triggered the event, in this case, the clicked pagination link.
      dataset is a property of DOM elements that provides access to custom data attributes. In this case, dataset.page refers to the data-page attribute value of the clicked link.
      parseInt() is a JavaScript function that parses a string argument and returns an integer. It converts the data-page attribute value, which is initially a string, into an integer value.
      Finally, the integer value is assigned to the pageIndex constant, which is then used to determine which page of contacts should be displayed.
      */
      const pageIndex = parseInt(event.target.dataset.page);
      generateContactList(pageIndex);
    });
  }
}

// get the total number of contacts and generate pagination links
const totalContacts = users.length;
const totalContactsContainer = document.querySelector('.total-contacts');
totalContactsContainer.innerHTML = totalContacts;
generatePaginationLinks(totalContacts);

// display the first page of contacts by default
generateContactList(1);
