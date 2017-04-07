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

  makeTableOfContentsClickable();
}

/**
 * Add the link and the hashtag to the h2 tags
 * @param {node} header 
 * @param {string} text 
 * @param {string} slug 
 */
function addLinkToHeader(header, text, slug) {
  header.id = `toc-${slug}`;
  header.innerHTML = `
    <a href="#toc-${slug}">
      <span class="icon">#</span>
      ${text}
    </a> 
  `;
}

/**
 * Add the link to the table of contents section
 * @param {string} text 
 * @param {string} slug 
 */
function addLinkToTableOfContents(text, slug) {
  const linkItem = document.createElement('li');

  linkItem.innerHTML = `
    <a href="#toc-${slug}">
      ${text}
    </a>
  `;

  tableOfContents.appendChild(linkItem);
}

/**
 * Make the table of contents clickable.
 * Scroll to the proper h2 when clicked. Offset so its not hidden by the header
 * scrollIntoView "smooth" option only supported in Firefox
 */
function makeTableOfContentsClickable() {
  const tableOfContents = document.querySelector('.table-of-contents');
  const headerHeight    = document.getElementById('site__header').clientHeight;
  console.log(headerHeight);

  tableOfContents.addEventListener('click', (e) => {
    if (!e.target || e.target.nodeName !== 'A') return;

    const targetLink = (e.target.getAttribute('href')).substring(1);
    document.getElementById(targetLink).scrollIntoView({ behavior: 'smooth' });
    window.scrollBy(0, -100);
  });
}