// TODO: Вставить полученные данные в контейнер с результатами (results__list).

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const input = document.getElementById("word-input");
const form = document.querySelector(".form");
const containerWord = document.querySelector(".results__word");
const soundButton = document.querySelector(".results__sound");

let state = {
   word: "",
   meanings: [],
   phonetics: []
};

const insertWord = () => {
   containerWord.innerText = state.word;
}

const handleSubmit = async (e) => {
   e.preventDefault(); // Убирает перезагрузку страницы. Почитать зачем она нужна!

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