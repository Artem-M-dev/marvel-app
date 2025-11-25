import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => { // Мы не прописали extends Component потому что этот класс будет написан на чистом JavaScript 
    // Нам нужно вытащить все самое нужное из useHttp
    const {loading, error, request, clearError} = useHttp()


    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const _baseOffset = 0;
    const _baseLimit = 9;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?offset=${offset}&limit=${_baseLimit}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char) => { // Мы будем получать какие то данные и уже возвращать трансформированный объект
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension, 
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    };

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?offset=${offset}&limit=8&${_apiKey}`)
        return res.data.results.map(_transformComic)
    };

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
        
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description ? `${comic.description.slice(0, 210)}...` : 'There is no description for this comic',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            prices: comic.prices[0].price,
            pageCount: comic.pageCount,
            textObjects: comic.textObjects.languages
        }
    }

    return {
            loading,
            error,
            clearError,
            getAllCharacters,
            getCharacter,
            getAllComics,
            getComics
        }
}

export default useMarvelService