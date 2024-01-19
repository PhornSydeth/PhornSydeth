const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpword = document.getElementById("input-word").value;
    fetch(`${url}${inpword}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            result.innerHTML = `<div class="word">
                <h3>${inpword}</h3>
                <button id="play-sound-btn"><i class="fas fa-volume-up"></i></button>
            </div>
            <div class="detail">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
            console.log(sound);

            // Attach event listener dynamically
            const playSoundBtn = document.getElementById("play-sound-btn");
            playSoundBtn.addEventListener("click", playSound);
        })
        .catch(() => {
            result.innerHTML = `<h3 id="text1">Couldn't find the word!!</h3>`;
        });
});

function playSound() {
        sound.play();
}
