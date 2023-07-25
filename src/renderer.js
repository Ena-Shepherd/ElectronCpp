const { ipcRenderer } = window.ipcRenderer;
const { env } = window;

document.getElementById('runCppCode').addEventListener('click', () => {
    // Exemple : envoie une requête à votre serveur C++ en utilisant fetch
    fetch(`http://localhost:${env.PORT}/api/my-cpp-endpoint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'value' })
    })
    .then(response => response.json())
    .then(data => {
      // Réception de la réponse du serveur C++
      const resultElement = document.getElementById('result');
      resultElement.textContent = `Réponse du serveur : ${JSON.stringify(data)}`;
    })
    .catch(error => {
      // Gérer les erreurs ici
      console.error('Erreur lors de la requête AJAX :', error);
    });
});

//handling the other button
document.getElementById('Ping').addEventListener('click', () => {
  // Exemple : envoie une requête à votre serveur C++
  fetch(`http://localhost:${env.PORT}/api/my-cpp-endpoint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'ping' })
  })
  .then(response => response.json())
  .then(data => {
    // Réception de la réponse du serveur C++
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Réponse du serveur : ${JSON.stringify(data)}`;

    const bouton = document.getElementById('Ping');
    if (data && data.message === 'Pong !' && bouton.classList.contains('btn-secondary')) { // Supposons que la réponse JSON contient un champ "success"
      bouton.classList.add('btn-primary');
      bouton.classList.remove('btn-secondary');
    } else {
      bouton.classList.add('btn-secondary');
      bouton.classList.remove('btn-primary');
    }

  })
  .catch(error => {
    // Gérer les erreurs ici
    console.error('Erreur lors de la requête AJAX :', error);
  });
});
