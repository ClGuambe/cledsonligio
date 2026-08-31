// Pequenos comportamentos da página: nada de mais, só o essencial
// para o menu funcionar bem no telemóvel e o rodapé ficar sempre actualizado.

document.addEventListener('DOMContentLoaded', function () {

  // Menu hambúrguer — abre e fecha a navegação em ecrãs pequenos
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var aberto = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!aberto));
      mainNav.classList.toggle('is-open');
    });

    // Ao escolher uma opção do menu, fecha-o de novo (só faz sentido no mobile)
    mainNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Ano do rodapé, para não ter de andar a actualizar isto à mão todos os anos
  var anoAtual = document.getElementById('anoAtual');
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  // Clicar no email copia-o para a área de transferência, com uma mensagem breve a confirmar
  var botaoEmail = document.querySelector('.copy-email');
  var feedback = document.getElementById('copyFeedback');

  if (botaoEmail && feedback) {
    botaoEmail.addEventListener('click', function () {
      var email = botaoEmail.dataset.email;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(function () {
          mostrarFeedback('Email copiado: ' + email);
        }).catch(function () {
          mostrarFeedback('Não foi possível copiar. Email: ' + email);
        });
      } else {
        mostrarFeedback('Email: ' + email);
      }
    });
  }

  function mostrarFeedback(texto) {
    feedback.textContent = texto;
    window.clearTimeout(mostrarFeedback._timer);
    mostrarFeedback._timer = window.setTimeout(function () {
      feedback.textContent = '';
    }, 3000);
  }

});
