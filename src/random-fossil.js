import axios from "axios";

document.getElementById('get-random-fossil').addEventListener('click', async() => {
    const response = await axios.get('random-fossil.json')
    const fossil = response.data

    document.getElementById('random-fossil-image').innerHTML = `<img src="${fossil.img}" alt="${fossil.name}">`;
    document.getElementById('random-fossil-name').textContent = fossil.name;
})