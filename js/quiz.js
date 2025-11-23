const QUESTIONS = [
      {
        q: "What recurring event poses a major threat to woodland habitats within Hong Kong, destroying vegetation and leading to soil erosion?",
        options: [
          { text: "Uncontrolled development of hiking trails", correct: false },
          { text: "Over-grazing by feral cattle", correct: false },
          { text: "Hill fires", correct: true },
          { text: "Over-grazing by feral cats", correct: false },
        ],
        explanation: "Hill fires, particularly during autumn and winter, are a major and recurring threat. Many are accidentally started by grave-sweeping activities or careless hikers.",
      },
      {
        q: "Hong Kong's geographical location is a key reason for its high biodiversity. It sits at the convergence of which two major biogeographic regions?",
        options: [
          { text: "Tropical and Temperate", correct: true },
          { text: "Alpine and Boreal", correct: false },
          { text: "Nether and End", correct: false },
          { text: "Desert and Grassland", correct: false },
        ],
        explanation: "Hong Kong is in the subtropics, on the edge of the temperate region of mainland China and the tropical region of Southeast Asia, allowing species from both zones to coexist here.",
      },
      {
        q: "The Leopard Cat is one of Hong Kong's few remaining native wild cats. What is the most significant threat to its population in the territory?",
        options: [
          { text: "Competition with stray dogs for food", correct: false },
          { text: "Illegal poaching for pet trade", correct: true },
          { text: "Predation from large birds", correct: false },
          { text: "Diseases spread by rodents", correct: false },
        ],
        explanation: "The Leopard Cat is a popular target of illegal trading as a pet or for its fur. To possess a Leopard Cat, you need a permit issued by the Agriculture, Fisheries and Conservation Department.",
      },
      {
        q: "Which of these animals used to inhabit Hong Kong?",
        options: [
          { text: "Gorilla", correct: false },
          { text: "Lion", correct: false },
          { text: "Tiger", correct: true },
          { text: "Hyena", correct: false },
        ],
        explanation: "The South China tiger used to inhabit Hong Kong, with sightings occurring until the 1950s. However, the South China Tiger has become extinct in Hong Kong and possibly in the wild. There are around 250 individuals in zoos and breeding centres in China.",
      },
      {
        q: "Which bird has a yellow patch of bare skin around the eyes?",
        options: [
          { text: "Eurasian tree sparrow", correct: false },
          { text: "Black-collared starling", correct: true },
          { text: "Red-whiskered bulbul", correct: false },
          { text: "Spotted dove", correct: false },
        ],
        explanation: "The black-collared starling has a white head and belly, a black collar around the neck, and a distinctive yellow patch of bare skin around the eye.",
      },
      {
        q: "What is a recommended way to support native birds in Hong Kong?",
        options: [
          { text: "Leaving out slices of bread for them", correct: false },
          { text: "Setting up bright lights to help them see at night", correct: false },
          { text: "Planting native flora like hibiscus and gardenias", correct: true },
          { text: "Playing instagram reels and youtube shorts to entertain them", correct: false },
        ],
        explanation: "Native plants can provide nectar and attract insects that birds eat",
      },
      {
        q: "The Red Cotton Stainer is considered a pest of cotton crops because it",
        options: [
          { text: "eats the leaves of the cotton plant", correct: false },
          { text: "tunnels through tree trunks", correct: false },
          { text: "feeds on sap from the seeds and transmits fungi", correct: true },
          { text: "attracts rodents that also damage the crops", correct: false },
        ],
        explanation: "Red cotton stainers are pests because they damage cotton by feeding on developing bolls and seeds, and transmitting fungi that stain the cotton.",
      },
      {
        q: "What is a recommended way to support native mammals in Hong Kong?",
        options: [
          { text: "Leaving food out in parks and wooded areas", correct: false },
          { text: "Releasing pet cats into the wild to control pests", correct: false },
          { text: "Capturing them and keeping them as pets", correct: false },
          { text: "Driving slowly near parks to avoid collisions", correct: true },
        ],
        explanation: "Many animals are most active during sunrise and sunset. These low-light conditions make animals harder to spot, so driving slower is highly recommended at these times.",
      },
    ];

    const SHUFFLE_QUESTIONS = true;
    const SHUFFLE_OPTIONS = true;

    // ====== State ======
    let index = 0;
    let score = 0;
    const selections = [];
    let quiz = [];

    // ====== Elements ======
    const elQuiz = document.getElementById("quiz");
    const elSplash = document.getElementById("splash");
    const elStartBtn = document.getElementById("btnStart");
    const elBar = document.getElementById("bar");
    const elProgress = document.getElementById("progress");
    const elScore = document.getElementById("score");
    const elControls = document.getElementById("controls");
    const elBack = document.getElementById("btnBack");
    const elNext = document.getElementById("btnNext");
    const elFinish = document.getElementById("btnFinish");
    const elResults = document.getElementById("results");

    // ====== Utils ======
    const shuffle = arr => arr.map(v => [Math.random(), v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]);

    function prepareQuiz(){
      quiz = QUESTIONS.map(q => ({
        ...q,
        options: SHUFFLE_OPTIONS ? shuffle(q.options) : q.options.slice()
      }));
      if (SHUFFLE_QUESTIONS) quiz = shuffle(quiz);
      index = 0; score = 0;
      selections.length = 0;
      updateHud();
    }

    function updateHud(){
      elProgress.textContent = `${Math.min(index+1, quiz.length)}/${quiz.length}`;
      const pct = quiz.length ? (index/quiz.length)*100 : 0;
      elBar.style.width = `${pct}%`;
      elScore.textContent = `Score: ${score}`;
    }

    // ====== Rendering ======
    function renderQuestion(){
      const q = quiz[index];
      if (!q) return;

      elQuiz.innerHTML = "";

      const fieldset = document.createElement("fieldset");
      fieldset.className = "quiz-fieldset";

      const legend = document.createElement("legend");
      legend.className = "quiz-legend";
      legend.textContent = q.q;
      fieldset.appendChild(legend);

      const options = document.createElement("div");
      options.className = "quiz-options";

      q.options.forEach((opt, i) => {
        const id = `q${index}-opt${i}`;

        const label = document.createElement("label");
        label.setAttribute("for", id);
        label.className = "quiz-option";
        label.innerHTML = `
          <input type="radio" id="${id}" name="q${index}">
          <span class="quiz-bullet" aria-hidden="true">•</span>
          <span>${opt.text}</span>
        `;

        // Handle pointer
        label.addEventListener("click", () => {
          if (label.classList.contains("correct") || label.classList.contains("wrong")) return;
          handleAnswer(i, options, q);
        });

        // Handle keyboard (change on input)
        label.querySelector("input").addEventListener("change", () => {
          if (typeof selections[index] === "number") return;
          handleAnswer(i, options, q);
        });

        options.appendChild(label);
      });

      fieldset.appendChild(options);

      const explain = document.createElement("div");
      explain.className = "quiz-explain";
      explain.id = "explain";
      fieldset.appendChild(explain);

      elQuiz.appendChild(fieldset);

      // Restore previous selection if navigating back
      if (typeof selections[index] === "number") {
        markAnswered(selections[index], q);
      }

      elQuiz.classList.remove("hide");
      elSplash.classList.add("hide");
      elControls.classList.remove("hide");

      elBack.disabled = index === 0;
      elNext.disabled = typeof selections[index] !== "number";
      elFinish.classList.toggle("hide", index !== quiz.length - 1);
      elNext.classList.toggle("hide", index === quiz.length - 1);

      updateHud();
    }

    function handleAnswer(chosenIndex, container, q){
      selections[index] = chosenIndex;

      [...container.children].forEach((el, i) => {
        const correct = q.options[i].correct;
        if (i === chosenIndex) {
          el.classList.add(correct ? "correct" : "wrong", "selected");
        } else if (correct) {
          el.classList.add("correct");
        }
        el.style.pointerEvents = "none";
      });

      if (q.options[chosenIndex].correct) score++;

      const explain = document.getElementById("explain");
      if (q.explanation) {
        explain.textContent = q.explanation;
        explain.style.display = "block";
      } else {
        explain.style.display = "none";
      }

      elNext.disabled = false;
      elBack.disabled = index === 0 ? false : false;
      updateHud();
    }

    function markAnswered(chosenIndex, q){
      const container = elQuiz.querySelector(".quiz-options");
      if (!container) return;
      [...container.children].forEach((el, i) => {
        const correct = q.options[i].correct;
        if (i === chosenIndex) {
          el.classList.add(correct ? "correct" : "wrong", "selected");
        } else if (correct) {
          el.classList.add("correct");
        }
        el.style.pointerEvents = "none";
      });
      const explain = document.getElementById("explain");
      if (q.explanation) {
        explain.textContent = q.explanation;
        explain.style.display = "block";
      }
      elNext.disabled = false;
    }

    // ====== Navigation ======
    elStartBtn.addEventListener("click", () => {
      prepareQuiz();
      renderQuestion();
    });

    elNext.addEventListener("click", () => {
      if (index < quiz.length - 1) {
        index++;
        renderQuestion();
      }
    });

    elBack.addEventListener("click", () => {
      if (index > 0) {
        index--;
        renderQuestion();
      }
    });

    elFinish.addEventListener("click", () => {
      showResults();
    });

    function showResults(){
      elQuiz.classList.add("hide");
      elControls.classList.add("hide");
      elResults.classList.remove("hide");
      elBar.style.width = "100%";
      elProgress.textContent = `${quiz.length}/${quiz.length}`;

      const pct = Math.round((score / quiz.length) * 100);
      const message = "Summary";

      elResults.innerHTML = `
        <div class="quiz-center">
          <h2>${message}</h2>
          <p class="quiz-muted">You scored ${score} out of ${quiz.length} (${pct}%).</p>
          <div class="quiz-nav quiz-center">
            <button id="retake" class="quiz-btn">Retake</button>
          </div>
        </div>
        <hr class="quiz-hr">
        <h3>Review</h3>
      `;

      // Review list
      quiz.forEach((q, qi) => {
        const chosenIndex = selections[qi];
        const chosen = q.options[chosenIndex];
        const correctIndex = q.options.findIndex(o => o.correct);
        const correct = q.options[correctIndex];
        const ok = chosen && chosen.correct;

        const resultEl = document.createElement("div");
        resultEl.className = "quiz-result";
        resultEl.innerHTML = `
          <h4>${qi+1}. ${q.q}
            <span class="quiz-tag ${ok ? "ok" : "bad"}">${ok ? "Correct" : "Incorrect"}</span>
          </h4>
          <p>Your answer: ${chosen ? chosen.text : "<em>None</em>"}</p>
          <p>Correct answer: ${correct.text}</p>
          ${q.explanation ? `<p class="quiz-muted">${q.explanation}</p>` : ""}
        `;
        elResults.appendChild(resultEl);
      });

      document.getElementById("retake").addEventListener("click", () => {
        elResults.classList.add("hide");
        elSplash.classList.remove("hide");
        elBar.style.width = "0%";
        elProgress.textContent = `0/0`;
        elScore.textContent = `Score: 0`;
      });
    }