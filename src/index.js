//this file is for the client side 
import axios from 'axios';

const characterList = document.querySelector('#char-list');
const descriptionList = document.querySelector('#desc-list');

const renderCharacters = (characters) => {
    const html = characters.map(char => `
        <li>
            <a href='#${char.id}'>
            ${char.name}
            </a>
        </li>
    `).join('');
    characterList.innerHTML = html;
}

const renderDescriptions = (descriptions) => {
    const html = descriptions.map(desc => `
        <li>
            ${desc.name}
        </li>
    `).join('');
    descriptionList.innerHTML = html;
}

const init = async() => {
    try {
        const characters = (await axios.get('/api/characters')).data;
        const descriptions = (await axios.get('/api/descriptions')).data;
        renderCharacters(characters);
        // renderDescriptions(descriptions);
    }
    catch(ex) {
        console.log(ex)
    }
}

window.addEventListener('hashchange', async() => {
    const characterId = window.location.hash.slice(1)
    const url = `/api/characters/${characterId}/bio`;
    const bios = (await axios(url)).data

    // NEED TO SET UP DESCRIPTIONS LIKE SALES IN VIDEO!
    console.log(bios)
});

init()