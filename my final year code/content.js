// Fetch the bad words list from GitHub
fetch('https://raw.githubusercontent.com/AliAleid211/AliAleid211/main/bad%20words')
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to fetch bad words list');
      }
      return response.text();
  })
  .then(text => {
      console.log('Bad words list:', text); // Log the wordlist

      // Convert the text response to an array of bad words
      const badWordsList = text.split('\n').map(word => word.trim()).filter(word => word); // Filter out empty words

      // Check the document content for bad words when the DOM content is fully loaded
      const bodyText = document.body.innerText.toLowerCase(); // Convert to lowercase for comparison
      
      // Split the body text into individual words
      const words = bodyText.split(/\s+/);

      // Check if any word in the body text is a bad word
      const foundBadWord = words.some(word => badWordsList.includes(word.toLowerCase()));
      
      // If a bad word is found, send a message to the background script
      if (foundBadWord) {
          chrome.runtime.sendMessage({ type: "badWordDetected" });
      }
  })
  .catch(error => {
      console.error('Error fetching bad words list:', error);
  });
