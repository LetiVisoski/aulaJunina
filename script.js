document.addEventListener('DOMContentLoaded', () => {
  const advice = document.getElementById('advice');
  const videosContainer = document.getElementById('videos');
  const nasaImage = document.getElementById('nasaImage');
  const nasaDescription = document.getElementById('nasaDescription');
  const githubSearch = document.getElementById('githubSearch');

  // Página 1 - index.html
  if (advice) {
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => {
        advice.textContent = data.slip.advice;
      })
      .catch(() => {
        advice.textContent = 'Erro ao carregar conselho.';
      });

    if (videosContainer) {
      videosContainer.innerHTML = `
        <iframe width="100%" height="200" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
        <iframe width="100%" height="200" src="https://www.youtube.com/embed/tgbNymZ7vqY" frameborder="0" allowfullscreen></iframe>
      `;
    }
  }

  // Página 2 - page2.html
  if (nasaImage && nasaDescription) {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then(res => res.json())
      .then(data => {
        nasaImage.src = data.url;
        nasaDescription.textContent = data.explanation;
      })
      .catch(() => {
        nasaDescription.textContent = 'Erro ao carregar imagem da NASA.';
      });
  }

  if (githubSearch) {
    githubSearch.addEventListener('click', () => {
      const username = document.getElementById('githubUser').value.trim();
      if (!username) return;

      fetch(`https://api.github.com/users/${username}`)
        .then(res => {
          if (!res.ok) throw new Error('Usuário não encontrado');
          return res.json();
        })
        .then(data => {
          document.getElementById('avatar').src = data.avatar_url;
          document.getElementById('name').textContent = data.name || data.login;
          document.getElementById('bio').textContent = data.bio || 'Sem bio disponível.';
          document.getElementById('githubProfile').style.display = 'block';
        })
        .catch(() => {
          document.getElementById('githubProfile').style.display = 'none';
          alert('Erro ao buscar perfil do GitHub');
        });
    });
  }
});
