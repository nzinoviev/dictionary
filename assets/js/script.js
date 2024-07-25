// TODO: Вставить полученные данные в контейнер с результатами (results__list).

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const input = document.getElementById("word-input");
const form = document.querySelector(".form");
const containerWord = document.querySelector(".results__word");
const soundButton = document.querySelector(".results__sound");
const resultsList = document.querySelector(".results__list");
const results = document.querySelector(".results");

let state = {
   word: "",
   meanings: [],
   phonetics: []
};

const renderItem = (item) => {
   const itemDefinition = item.definitions[0];
   return ` <div class="result__item">
               <div class="result__item-part-of-speach">
                  ${item.partOfSpeech}
               </div>

               <div class="result__item-definitions">
                  <div class="result__item-definition">
                     <p>${itemDefinition.definition}</p>
                     <div class="results__item-example">
                        <p>${itemDefinition.example}</p>
                     </div>
                  </div>
               </div>
            </div>`;
}

const showResults = () => {
   results.style.display = "block";
   resultsList.innerHTML = "";
   state.meanings.forEach((item) =>
      (resultsList.innerHTML += renderItem(item)));
}

const insertWord = () => {
   containerWord.innerText = state.word;
}

const handleSubmit = async (e) => {
   // Убирает перезагрузку страницы. TODO: Почитать зачем она нужна!
   e.preventDefault();

   if (!state.word.trim()) { return; }

   try {
      const response = await fetch(`${url}${state.word}`);
      const data = await response.json();
      console.log(data);

      if (response.ok && data.length) {
         const item = data[0]; // TODO: Добавить обработку всех элементов.

         state = {
            ...state,
            meanings: item.meanings,
            phonetics: item.phonetics
         }
         insertWord();
         showResults();
      }
   } catch (error) {
      console.log("Error: ", error);
   }
}

const handleKeyup = (e) => {
   const value = e.target.value;
   state.word = value;
}

const handleSound = (e) => {
   // TODO: Обработать ситуацию, когда озвучки нет.
   // TODO: Обработать ситуацию, когда озвучки две (американская и английская).
   if (state.phonetics.length) {
      const sound = state.phonetics[0];

      if (sound.audio) {
         new Audio(sound.audio).play();
      }
   }
}

input.addEventListener("keyup", handleKeyup);
form.addEventListener("submit", handleSubmit);
soundButton.addEventListener("click", handleSound);