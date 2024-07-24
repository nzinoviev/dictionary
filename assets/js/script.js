// TODO: Получить данные по API.
// TODO: Вставить слово в контейнер (results__word).
// TODO: Добавить функционал для воспроизведения звука.
// TODO: Вставить полученные данные в контейнер с результатами (results__list).

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const input = document.getElementById("word-input");
const form = document.querySelector(".form");
const containerWord = document.querySelector(".results__word");

let state = {
   word: "",
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

input.addEventListener("keyup", handleKeyup);
form.addEventListener("submit", handleSubmit);