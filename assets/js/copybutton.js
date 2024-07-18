function addCopyButtonToCodeBlocks() {

    // Function to determine if the background color is light or dark
  
    function isColorDark(color) {
      const rgb = color.match(/\d+/g);
      const r = parseInt(rgb[0], 10);
      const g = parseInt(rgb[1], 10);
      const b = parseInt(rgb[2], 10);
  
      // Calculate luminance
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
  
    }
  
  
    // Function to adjust color brightness significantly
  
    function adjustColorBrightness(color, amount) {
      const rgb = color.match(/\d+/g);
      const r = Math.min(255, Math.max(0, parseInt(rgb[0], 10) + amount));
      const g = Math.min(255, Math.max(0, parseInt(rgb[1], 10) + amount));
      const b = Math.min(255, Math.max(0, parseInt(rgb[2], 10) + amount));
      return `rgb(${r}, ${g}, ${b})`;
  
    }
  
  
    // Get all code blocks with a class of "language-*"
  
    const codeBlocks = document.querySelectorAll(
      'pre > code[class^="language-"]'
    );
    const copyIcon = '<i class="fas fa-copy"></i> copy code';
    const copiedIcon = '<i class="fas fa-check"></i> copied!';
  
  
    // For each code block, add a copy button inside a header
    codeBlocks.forEach((codeBlock) => {
  
      // Get the background color of the code block
      const computedStyle = window.getComputedStyle(codeBlock);
      const backgroundColor = computedStyle.backgroundColor;
  
  
      // Adjust the header color to be significantly lighter or darker than the background color
  
      const headerColor = isColorDark(backgroundColor)
        ? adjustColorBrightness(backgroundColor, 65)
        : adjustColorBrightness(backgroundColor, -65);  
      const textColor = isColorDark(backgroundColor) ? "#d1d1d1" : "#606060";
  
  
      // Create the header div
  
      const header = document.createElement("div");
  
      header.style.backgroundColor = headerColor;
  
      header.style.display = "flex";
  
      header.style.justifyContent = "space-between";
  
      header.style.alignItems = "center";
      header.style.paddingRight = "0.5rem";
      header.style.paddingLeft = "0.5rem";
      header.style.borderTopLeftRadius = "5px";
      header.style.borderTopRightRadius = "5px";
  
      header.style.color = textColor;
  
      header.style.borderBottom = `1px solid ${headerColor}`;
  
      header.classList.add("small");
  
  
      // Create the copy button
  
      const copyButton = document.createElement("button");
  
      copyButton.classList.add("btn", "copy-code-button");
  
      copyButton.style.background = "none";
  
      copyButton.style.border = "none";
  
      copyButton.style.color = textColor;
  
      copyButton.style.fontSize = "100%"; // Override the font size
  
      copyButton.style.cursor = "pointer";
  
      copyButton.innerHTML = copyIcon;
  
      copyButton.style.marginLeft = "auto";
  
  
      // Add a click event listener to the copy button
  
      copyButton.addEventListener("click", () => {
  
        // Copy the code inside the code block to the clipboard
  
        const codeToCopy = codeBlock.innerText;
  
        navigator.clipboard.writeText(codeToCopy);
  
  
        // Update the copy button text to indicate that the code has been copied
  
        copyButton.innerHTML = copiedIcon;
  
        setTimeout(() => {
  
          copyButton.innerHTML = copyIcon;
  
        }, 1500);
  
      });
  
  
      // Get the language from the class
  
      const classList = Array.from(codeBlock.classList);
  
      const languageClass = classList.find((cls) => cls.startsWith("language-"));
  
      const language = languageClass
  
        ? languageClass.replace("language-", "")
  
        : "";
  
  
      // Create the language label
  
      const languageLabel = document.createElement("span");
  
      languageLabel.textContent = language ? language.toLowerCase() : "";
  
      languageLabel.style.marginRight = "10px";
  
  
      // Append the language label and copy button to the header
  
      header.appendChild(languageLabel);
  
      header.appendChild(copyButton);
  
  
      // Find the parent element with the "highlight" class and insert the header before it
  
      const highlightParent = codeBlock.closest(".highlight");
  
      if (highlightParent) {
  
        highlightParent.parentNode.insertBefore(header, highlightParent);
  
      }
  
    });
  
  }
  
  
  // Call the function to add copy buttons to code blocks
  document.addEventListener("DOMContentLoaded", addCopyButtonToCodeBlocks);

//   function addCopyButtons(clipboard) {
//     document.querySelectorAll('pre > code').forEach(function (codeBlock) {
//         var button = document.createElement('button');
//         button.className = 'copy-code-button';
//         button.type = 'button';
//         button.innerText = 'Copy';

//         button.addEventListener('click', function () {
//             clipboard.writeText(codeBlock.innerText).then(function () {
//                 /* Chrome doesn't seem to blur automatically,
//                    leaving the button in a focused state. */
//                 button.blur();

//                 button.innerText = 'Copied!';

//                 setTimeout(function () {
//                     button.innerText = 'Copy';
//                 }, 2000);
//             }, function (error) {
//                 button.innerText = 'Error';
//             });
//         });

//         var pre = codeBlock.parentNode;
//         if (pre.parentNode.classList.contains('highlight')) {
//             var highlight = pre.parentNode;
//             highlight.parentNode.insertBefore(button, highlight);
//         } else {
//             pre.parentNode.insertBefore(button, pre);
//         }
//     });
// }

