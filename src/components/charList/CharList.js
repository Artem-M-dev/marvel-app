import { Component } from 'react';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
    };

    marvelService = new MarvelService()

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    };

    onCharListLoaded = (chars) => {
        this.setState({
            chars,
            loading: false,
            error: false
        })
    };

    renderItems = (arr) => {
        const newArr = arr.map((item, index) => {
            let imgStyles = {objectFit: 'cover'};
            if(item.thumbnail === '') {
                imgStyles = {objectFit: 'unset'}
            }
            if(index <= 8) {
                return (
                    <li className="char__item">
                        <img src={item.thumbnail} alt={item.name} style={imgStyles}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                )     
            }
 
        })

        return (
            <ul className="char__grid">
                {newArr}
            </ul>
        )
    }

    render() {
        const {chars, loading, error} = this.state;

        const items = this.renderItems(chars);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(error | loading) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

export default CharList;