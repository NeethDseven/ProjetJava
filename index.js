document.addEventListener('DOMContentLoaded', () => {
  const totalQuestions = 10
  let currentQuestion = 1
  const correctAnswers = [
    'Pacifique',
    'Seconde',
    'Vinci',
    'Amazone',
    'Sterling',
    'Mercure',
    'Fleming',
    'Mandarin',
    'Azote',
    'Lune'
    ]

  let userAnswers = Array.from({ length: totalQuestions }, () => null)
  const progressBar = document.querySelector('.progress-bar')
  const nextButton = document.querySelector('#next-btn')
  const prevButton = document.querySelector('#previous-btn')

  function updateProgressBar() {
    const progress = ((currentQuestion - 1) / totalQuestions) * 100
    const barProgress = Math.ceil(progress / 10) * 10
    progressBar.style.width = `${barProgress}%`
    progressBar.textContent = `${barProgress}%`
  }

  function showTab(index) {
    const tabs = document.querySelectorAll('.nav-link')
    const tabContents = document.querySelectorAll('.tab-pane')

    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index - 1)
      tab.disabled = i !== index - 1
    });

    tabContents.forEach((content, i) => {
      if (i === index - 1) {
        content.classList.add('show', 'active')
      } else {
        content.classList.remove('show', 'active')
      }
    })

    updateProgressBar()

    if (index > totalQuestions) {
      displayResults()
    }
  }

  function validateCurrentQuestion() {
    const form = document.querySelector(`#form-question-${currentQuestion}`)
    const checkedInput = form.querySelector('input[type="radio"]:checked')
    if (checkedInput) {
      userAnswers[currentQuestion - 1] = checkedInput.value
      return true
    }
    return false
  }

  function displayResults() {
    const correctCount = userAnswers.filter((answer, index) => answer === correctAnswers[index]).length;
    const incorrectCount = totalQuestions - correctCount

    const ctx = document.querySelector('#my-chart').getContext('2d')
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Incorrect'],
        datasets: [{
          data: [correctCount, incorrectCount],
          backgroundColor: ['#36a2eb', '#ff6384'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Vos résultats'
          }
        }
      }
    })
  }

  nextButton.addEventListener('click', () => {
    if (validateCurrentQuestion()) {
      if (currentQuestion < totalQuestions + 1) {
        currentQuestion++
        showTab(currentQuestion)
      }
    } else {
      alert('Réponse obligatoire pour continuer le questionnaire')
    }
  });

  prevButton.addEventListener('click',() => {
    if (currentQuestion > 1) {
      currentQuestion--
      showTab(currentQuestion)
    }
  });

  showTab(currentQuestion)
})