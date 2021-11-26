//this file is for the client side 
import axios from 'axios';

const characterList = document.querySelector('#chars');
const descriptionList = document.querySelector('#bios');

let chars, bios;

const renderCharacters = () => {
    const html = chars.map(char => `
        <li class=''>
            <a href='#${char.id}'>
            ${char.name}
            </a>
        </li>
    `).join('');
    characterList.innerHTML = html;
}

const renderDescriptions = () => {
    const html = bios.map(bio => `
        <div>
            <img src="lotr_${bio.photoId}.jpeg"/>
        </div>
        <li>
            ${bio.bio}
        </li>
    `).join('');
    descriptionList.innerHTML = html;
}

const fetchDescriptions = async() => {
    const characterId = window.location.hash.slice(1)
    bios = (await axios.get(`/api/characters/${characterId}/description`)).data
    renderDescriptions()
}

window.addEventListener('hashchange', async() => {
    renderCharacters()
    fetchDescriptions()
});

const init = async() => {
    chars = (await axios.get('/api/characters')).data;
    renderCharacters();
};

init()