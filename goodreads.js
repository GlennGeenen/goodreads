let readButton = null;
let lightBoxId = '';

function scanToRemoveLightBox() {
  const findLightBox = document.querySelector('div.reviewLightBox');
  if (findLightBox && findLightBox.id !== lightBoxId) {
    lightBoxId = findLightBox.id;
    const closeButtons = document.getElementsByClassName('js-closeModalIcon');
    for (let closeButton of closeButtons) {
      console.log(closeButton);
      closeButton.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      }));
      return;
    }
  }
  setTimeout(scanToRemoveLightBox, 100);
}

function addReadButton(containerElement) {
  // Get the first element which is the Want to Read button
  const wantToRead = containerElement.firstElementChild;
  // If we are already read we don't need to add Read button
  if (wantToRead.classList.contains('wtrStatusRead')) {
    console.log('wtrStatusRead');
    return;
  }

  // Second element is the dropdown
  const dropDown = containerElement.children.item(1).cloneNode(true);
  dropDown.classList.remove('wtrRight');
  dropDown.classList.add('wtrLeft');

  // Remove dropDownButton
  dropDown.removeChild(dropDown.querySelector('button.wtrShelfButton'));

  // Create new Button
  const readButton = document.createElement('button');
  readButton.classList.add('wtrExclusiveShelf');
  readButton.classList.add('wtrToRead');
  readButton.setAttribute('name', 'name');
  readButton.setAttribute('type', 'submit');
  readButton.setAttribute('value', 'read');
  readButton.textContent = 'Read';
  readButton.addEventListener('click', () => {
    setTimeout(() => {
      scanToRemoveLightBox();
      containerElement.removeChild(dropDown);
    }, 200);
  }, { passive: true });

  // Add to form
  dropDown.firstElementChild.appendChild(readButton);

  // Remove shelfMenu
  dropDown.removeChild(dropDown.lastChild);

  containerElement.insertBefore(dropDown, wantToRead);
}

console.log('GoodReads: Search wtrButtonContainer');
const containers = document.getElementsByClassName('wtrButtonContainer');
for (let container of containers) {
  addReadButton(container);
}
