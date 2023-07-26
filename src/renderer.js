const { ipcRenderer } = window.ipcRenderer;
const { env } = window;

document.getElementById('runCppCode').addEventListener('click', () => {
    // Example : sends a request to the C++ server using fetch
    fetch(`http://localhost:${env.PORT}/api/my-cpp-endpoint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'value' })
    })
    .then(response => response.json())
    .then(data => {
      // Receiving C++ server answer
      const resultElement = document.getElementById('result');
      resultElement.textContent = `Server answer : ${JSON.stringify(data)}`;
    })
    .catch(error => {
      // Handle errors here
      console.error('Error on AJAX request :', error);
    });
});

// Handling the other button (almost a copy of above script)
document.getElementById('Ping').addEventListener('click', () => {

  fetch(`http://localhost:${env.PORT}/api/my-cpp-endpoint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'ping' })
  })
  .then(response => response.json())
  .then(data => {

    const resultElement = document.getElementById('result');
    resultElement.textContent = `Server answer : ${JSON.stringify(data)}`;

    const bouton = document.getElementById('Ping');
    if (data && data.message === 'Pong !' && bouton.classList.contains('btn-secondary')) {
      bouton.classList.add('btn-primary');
      bouton.classList.remove('btn-secondary');
    } else {
      bouton.classList.add('btn-secondary');
      bouton.classList.remove('btn-primary');
    }

  })
  .catch(error => {
    console.error('Error on AJAX request :', error);
  });
});
