let originalContent = {};
console.log("Content script loaded");
function saveOriginalContent() {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach((paragraph, index) => {
      originalContent[index] = paragraph.innerHTML;
    });
  }
  
  function restoreOriginalContent() {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach((paragraph, index) => {
      if (originalContent[index]) {
        paragraph.innerHTML = originalContent[index];
      }
    });
  }
const style = document.createElement('style');
style.innerHTML = `
  .ultra-bold {
    font-weight: 600;
  }
`;

document.head.appendChild(style);

function applyTextModifications(isActive) {
  console.log("Applying text modifications");
  const paragraphs = document.querySelectorAll('p');
  if (isActive) {
    saveOriginalContent();
    paragraphs.forEach(paragraph => {
        const words = paragraph.textContent.split(' ');
        const modifiedWords = words.map(word => {
        const length = word.length;
        if (length <= 3) {
            return `<span class="ultra-bold">${word.charAt(0)}</span>${word.slice(1)}`;
        } else if (length <= 5) {
            return `<span class="ultra-bold">${word.slice(0, 2)}</span>${word.slice(2)}`;
        } else {
            return `<span class="ultra-bold">${word.slice(0, 3)}</span>${word.slice(3)}`;
        }
        });
        paragraph.innerHTML = modifiedWords.join(' ');
    });
  } else {
        restoreOriginalContent();
        paragraphs.forEach((paragraph, index) => {
            if(originalContent[index]) {
               paragraph.innerHTML = originalContent[index];
            }
        });
    }
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'toggleBold') {
      applyTextModifications(request.isActive);
    }
  });
