const isSingleContentPage = document.querySelector('.single .content');
let tableOfContents       = document.querySelector('.table-of-contents ul');

if (isSingleContentPage && tableOfContents) {
  tableOfContents.innerHTML = '';
  createTableOfContents();
}

/**
 * Loop over the content H2 tags to create the table of contents
 * @param {string} selector  
 */
function createTableOfContents() {
  const headers = document.querySelectorAll('.content h2');

  if (!headers) return;

  // add links to each header
  // add each header to the table of contents
  headers.forEach(header => {
    const headerText = header.textContent;
    const slug       = slugify(headerText);
    
    addLinkToHeader(header, headerText, slug);
    addLinkToTableOfContents(headerText, slug);
  });
}

function addLinkToHeader(header, text, slug) {
  header.innerHTML = `
    <a href="#${slug}">
      <span class="icon">#</span>
      ${text}
    </a> 
  `;
}

function addLinkToTableOfContents(text, slug) {
  const linkItem = document.createElement('li');

  linkItem.innerHTML = `
    <a href="#${slug}">
      ${text}
    </a>
  `;

  tableOfContents.appendChild(linkItem);
}