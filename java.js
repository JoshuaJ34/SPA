// Elements from HTML
const mapView = document.getElementById("map-view");
const countryView = document.getElementById("country-view");

const flag = document.getElementById("flag");
const nameText = document.getElementById("name");
const info = document.getElementById("info");

const backBtn = document.getElementById("back-btn");
const quizBtn = document.getElementById("quiz");

// variables used throughout the program. current country is used to track what country is clicked so it shows the right country to the user. currentquestion is used to track what question the user is on. the score is used to track whatr score the user is on
let currentCountry = null; // this is very important for my website because it makes sure that the right information is shown for each country.
let currentQuestion = 0;
let score = 0;

// this holds the countries and the information each of them held. each country has unique information and uses their tags so that they can be called in the html by the sgv so that i can show the right country when a user clicks a country 
const countries = {
  US: {
    name: "United States",
    flag: "https://flagcdn.com/w320/us.png", // flag image taken from website. all of my flag images come from the same website. 
    info: "<p>The capital of the USA is Washington. There are many different types of tourist destinations in the USA like the Grand canyon, Yellowstone National Park, Great Smoky Mountains National Park, Niagara Falls. There are many different types of foods and common dishes in the USA like cheeseburgers and hamburgers, BBQ, fried chicken, meatloaf, macaroni and cheese, apple pie.</p>",
    quiz: [
      {
        question: "What is the capital of the USA?",
        options: ["New York", "Washington D.C.", "Los Angeles"],
        answer: 1
      },
      {
        question: "What is the average amount of burgers eaten daily in America",
        options: ["140 million", "500 million", "40 million"],
        answer: 1
      },
      {
        question: "How many states are there in america",
        options: ["38", "50", "48"],
        answer: 1
      }
    ]
  },

  FR: {
    name: "France",
    flag: "https://flagcdn.com/w320/fr.png",
    info: "<p>The capital of France is Paris. There are many different types of tourist destinations in France like the Eiffel Tower, the Louvre Museum, the Palace of Versailles, Mont Saint-Michel, and the French Riviera. There are many different types of foods and common dishes in France like baguettes and croissants, cheese, escargot, coq au vin, ratatouille, and crème brûlée.</p>",
    quiz: [
      {
        question: "What is the capital of France?",
        options: ["Paris", "Rome", "Berlin"],
        answer: 0
      },
      {
        question: "Which landmark is in France?",
        options: ["Big Ben", "Eiffel Tower", "Statue of Liberty"],
        answer: 1
      },
      {
        question: "What is the most commonly produced thing in france",
        options: ["Wine", "Aircrafts", "Cheese"],
        answer: 1
      }
    ]
  },

  JP: {
    name: "Japan",
    flag: "https://flagcdn.com/w320/jp.png",
    info: "<p>The capital of Japan is Tokyo. There are many different types of tourist destinations in Japan like Mount Fuji, Kyoto’s temples and shrines, Tokyo Tower, Hiroshima Peace Memorial Park, and Osaka Castle. There are many different types of foods and common dishes in Japan like sushi, ramen, tempura, udon, yakitori, and mochi.</p>",
    quiz: [
      {
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Seoul", "Beijing"],
        answer: 0
      },
      {
        question: "What is the average hight of an adult male in japan?",
        options: ["5'7", "6'7", "5'5"],
        answer: 0
      },
      {
        question: "How many cities are there in Japan",
        options: ["658", "792", "236"],
        answer: 1
      }
    ]
  },

  UK: {
    name: "United Kingdom",
    flag: "https://flagcdn.com/w320/gb.png",
    info: "<p>The capital of the United Kingdom is London. There are many different types of tourist destinations in the United Kingdom like the Tower of London, Stonehenge, Buckingham Palace, Edinburgh Castle, and the Lake District. There are many different types of foods and common dishes in the United Kingdom like fish and chips, roast beef and Yorkshire pudding, shepherd’s pie, full English breakfast, bangers and mash, and scones with jam and cream.</p>",
    quiz: [
      {
        question: "What is the capital of the UK?",
        options: ["London", "Manchester", "Liverpool"],
        answer: 0
      },
      {
        question: "How many cups of tea is drinken in the UK every day?",
        options: ["10 million", "50 million", "Over 100 million"],
        answer: 2
      },
      {
        question: "Which food is British?",
        options: ["Fish and chips", "Sushi", "Pasta"],
        answer: 0
      }
    ]
  },

  GR: {
    name: "Germany",
    flag: "https://flagcdn.com/w320/de.png",
    info: "<p>The capital of Germany is Berlin. There are many different types of tourist destinations in Germany like the Brandenburg Gate, Neuschwanstein Castle, Cologne Cathedral, the Black Forest, and the Berlin Wall Memorial. There are many different types of foods and common dishes in Germany like bratwurst, schnitzel, sauerkraut, pretzels, currywurst, and apple strudel.</p>",
    quiz: [
      {
        question: "What is the capital of Germany?",
        options: ["Frankfurt", "Munich", "Berlin"],
        answer: 2
      },
      {
        question: "Which castle is in Germany?",
        options: ["Neuschwanstein", "Versailles", "Windsor"],
        answer: 0
      },
      {
        question: "Which food is German?",
        options: ["Bratwurst", "Tacos", "Ramen"],
        answer: 0
      }
    ]
  },

  IT: {
    name: "Italy",
    flag: "https://flagcdn.com/w320/it.png",
    info: "<p>The capital of Italy is Rome. There are many different types of tourist destinations in Italy like the Colosseum, the Leaning Tower of Pisa, Venice canals, the Amalfi Coast, and the Vatican City. There are many different types of foods and common dishes in Italy like pizza, pasta, lasagna, risotto, gelato, and tiramisu.</p>",
    quiz: [
      {
        question: "What is the capital of Italy?",
        options: ["Rome", "Milan", "Naples"],
        answer: 0
      },
      {
        question: "Which landmark is in Italy?",
        options: ["Colosseum", "Big Ben", "Statue of Liberty"],
        answer: 0
      },
      {
        question: "Which food is Italian?",
        options: ["Pizza", "Sushi", "Curry"],
        answer: 0
      }
    ]
  }
};

// this function is used in the html and sgv so that when a certain country is clicked, the tag on it will then allow it to shows the current country. For example on sgv japan has the id/tag as JP so when it gets clicked by the user the java script knows to show the information that japan has.
window.showCountry = function (key) {
  const c = countries[key];
  if (!c) return;

  currentCountry = key;

  flag.src = c.flag;
  nameText.textContent = c.name;
  info.innerHTML = c.info;

  mapView.style.display = "none";
  countryView.classList.remove("hidden");
};

// this starts the quiz and resets the variable and shows the first question 
quizBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  showQuestion();
};

// shows the question for the country that the user was on 
function showQuestion() {
  const quiz = countries[currentCountry].quiz;

  if (currentQuestion >= quiz.length) { // makes sure that the quiz ends when all of the questions have been shown and will show score and back button
    info.innerHTML = `
      <h3>Quiz Finished</h3>
      <p>Your score: ${score} / ${quiz.length}</p>
      <button onclick="showCountry('${currentCountry}')">Back</button>
    `;
    return;
  }

  const q = quiz[currentQuestion];

  info.innerHTML = `
    <h3>Question ${currentQuestion + 1}</h3>
    <p>${q.question}</p>
    ${q.options.map((opt, i) =>
      `<button onclick="answer(${i})">${opt}</button>`
    ).join("")}
  `;
}

// logic for the answer of the question and if they get it right add 1 to their score  and show the next question
window.answer = function (i) {
  const quiz = countries[currentCountry].quiz;

  if (i === quiz[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  showQuestion();
};

// when the user is finished they can click the button to go back to the country page 
backBtn.onclick = () => {
  countryView.classList.add("hidden");
  mapView.style.display = "block";
};