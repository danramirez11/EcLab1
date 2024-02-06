const btn = document.querySelector(".btn");
btn.addEventListener(('click'), () => clickbtn());
const favdiv = document.querySelector('.fav');
const fulldatadiv = document.querySelector('.fulldata');

const fetchData = async () => {
    var array = [];
    for (i = 0 ; i < 10 ; i++){
        const URL = `https://dog.ceo/api/breeds/image/random`;
        const query = await fetch(URL);
        const data = await query.json();
        array.push(data.message);
    }
return array;
};

const delFav = async (url) => {
    const fav = localStorage.getItem("favs");
    const favsjson = JSON.parse(fav);
    const updatedFavs = favsjson.filter(favorite => favorite !== url);
    const favstring = JSON.stringify(updatedFavs);
    localStorage.setItem("favs", favstring);
    getFavs();
}

const getFavs = async () => {
    let favsjson = [];
    const fav = localStorage.getItem("favs");
    if (fav) {
        favsjson = JSON.parse(fav);
    } else {
        localStorage.setItem("favs", JSON.stringify(favsjson));
    }
    favdiv.innerHTML = " ";
    favsjson.forEach(url => {
        const img = document.createElement("img");
        img.setAttribute("src", url);
        favdiv.appendChild(img);
        img.addEventListener(('click'), () => delFav(url));
    });
}

const addFav = async (url) => {
    const fav = localStorage.getItem("favs");
    const favsjson = JSON.parse(fav);
    favsjson.push(url);
    const favstring = JSON.stringify(favsjson);
    localStorage.setItem("favs", favstring);
    getFavs();
}

const clickbtn = async () => {
    fulldata = await fetchData();
    fulldatadiv.innerHTML = " "
    
    fulldata.forEach(url => {
        const img = document.createElement("img");
        img.setAttribute("src", url);
        fulldatadiv.appendChild(img);
        img.addEventListener(('click'), () => addFav(url));
    });

}

getFavs();