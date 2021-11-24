//this file is for the client side 

import axios from 'axios';

const init = async() => {
    try {
        const characters = (await axios.get('/api/characters')).data;
        const descriptions = (await axios.get('/api/descriptions')).data;
        console.log(characters)
        console.log(descriptions)
    }
    catch(ex) {
        console.log(ex)
    }
}

init()