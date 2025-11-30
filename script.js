const URL = "https://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion.json";
const IMG_URL = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";

const container = document.querySelector("#champions");
const searchInput = document.querySelector("#search");
const refreshBtn = document.querySelector("#refresh");

let campeoes = []; 


async function carregarCampeoes() {
  container.innerHTML = ""; 

  const req = await fetch(URL);
  const data = await req.json();
  campeoes = Object.values(data.data);

  exibirCampeoes(campeoes);
}

carregarCampeoes();

function exibirCampeoes(lista) {
  container.innerHTML = ""; 

  lista.forEach(champ => {
    container.innerHTML += `
      <div class="card" onclick="mostrarDetalhes('${champ.id}')">
        <img src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${champ.id}.png">
        <h3>${champ.name}</h3>
        <p>${champ.title}</p>
      </div>
    `;
  });
}

async function mostrarDetalhes(id) {
  const req = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion/${id}.json`);
  const data = await req.json();
  const champ = data.data[id];

  document.querySelector("#champName").innerText = champ.name;
  document.querySelector("#champTitle").innerText = champ.title;
  document.querySelector("#champLore").innerText = champ.lore;
  document.querySelector("#champTags").innerText = champ.tags.join(", ");
  document.querySelector("#champDifficulty").innerText = champ.info.difficulty;
  document.querySelector("#champImg").src = `${IMG_URL}${id}_0.jpg`;

  document.querySelector("#modal").classList.remove("hidden");
}

document.querySelector("#close").addEventListener("click", () => {
  document.querySelector("#modal").classList.add("hidden");
});

searchInput.addEventListener("input", () => {
  const texto = searchInput.value.toLowerCase();

  const filtrados = campeoes.filter(c =>
    c.name.toLowerCase().includes(texto)
  );

  exibirCampeoes(filtrados);
});

refreshBtn.addEventListener("click", () => {
  searchInput.value = ""; 
  carregarCampeoes();
});
