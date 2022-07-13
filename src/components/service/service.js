import useHttp from "../../hooks/http.hook";

const apikey = "apikey=ab4e993aaf3acd642cb183204cf17142";

const UseService = () => {

    const request = useHttp();

    const getAllCharacters = async (offset = 211) => {
        let data = await request(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&${apikey}`)
        .then(data => {return data.data.results});
        return data.map(({id, name, thumbnail}) => {
            return {
                id,
                name,
                thumbnail : thumbnail.path + "." + thumbnail.extension,
            }
        })
    }

    const getApartChar = async (id) => {
        let char = await request(`https://gateway.marvel.com:443/v1/public/characters/${id}?${apikey}`);
        return transformData(char);
    }

    const getCharByName = async (name) => {
        let char = await request(`https://gateway.marvel.com:443/v1/public/characters?name=${name}&orderBy=name&${apikey}`);
        return transformData(char);
    }

    const getComicsCollection = async (offset = 3000) => {
        let data = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}}&${apikey}`)
        .then(data => {
            return data.data.results
        });
        let dataMod = data.map(({id, prices, thumbnail, title, }) => {
            return {
                id,
                title,
                prices : prices[0].price,
                thumbnail : thumbnail.path + '.' + thumbnail.extension,
            }
        })
        return dataMod;
    }

    const getApartComics = async (comicsId) => {
        let apartComicsData = await request(`https://gateway.marvel.com:443/v1/public/comics/${comicsId}?${apikey}`)
        .then(data => {
            return data.data.results
        });
        let apartComicsDataMod = apartComicsData.map(({title, description, pageCount, prices, thumbnail}) => {
            return {
                title,
                description,
                pageCount,
                prices : prices[0].price,
                thumbnail : thumbnail.path + '.' + thumbnail.extension,
            }
        })
        return apartComicsDataMod;
    }

    const transformData = (char) => {
        char = char.data.results[0];
        if (char.description === ""){
            char.description = "We do not have information about that Hero"
        }
        return char = {
            name: char.name,
            id: char.id,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homePage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics : char.comics.items,
        }
    }
        
    return {getApartChar, getAllCharacters, getComicsCollection, getApartComics, getCharByName};
}

export default UseService;