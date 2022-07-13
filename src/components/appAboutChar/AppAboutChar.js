import { Component, useState, useEffect } from 'react';
import "../appAboutChar/appAboutChar.css";
import AppComicsItem from '../appComicsItem/AppComicsItem';
import useService from '../service/service';
import Spinner from "../spinner/Spinner";
import AppForm from '../appForm/AppForm';

const AppAboutChar = (props) => {
    
    let [id, setId] = useState(null);
    let [char, setChar] = useState(null);
    let [loading, setLoading] = useState(false);

    const {getApartChar} = useService();
    
    const showSpinner = () => {
        setLoading(true)
    }
    

    let getInfoAboutChar = () => {
        let {id} = props;
        
        if ( !id ) {
            return
        }
        showSpinner();
        getApartChar(id.id)
        .then(char => {
            setChar(char);
            setLoading(false);
        })
    }

    const scrollTo = () => {
        const top = document.querySelector('.about_char_wrapper');

        top.scrollIntoView({
            behavior : "smooth",
        });
    }

    useEffect(() => {
        getInfoAboutChar();
    }, []);

    useEffect(() => {
        setId(props.id);
        if (id !== props.id) {
            getInfoAboutChar();
            scrollTo();
        }
        
    }, [props.id]);
    
        let onLoading = loading ? (char = null, <Spinner />) : null;
        let content = char ? <View char={char} /> : null;

        return (
            <>
            <div className="about_char_wrapper">
                {onLoading}
                {content}
            </div>
            <AppForm />
            </>
        );
}


const View = ({ char }) => {
    let { name, description, thumbnail, homePage, wiki, comics } = char;


    let comicsItem = comics.map(({ name, resourceURI }) => {
        return <AppComicsItem key={name} name={name} resourceURI={resourceURI} />
    })
    return (
        <>
            <div className="above_desc">
                <div className="main_img_box">
                    <img className='main_img' src={thumbnail} alt='ebalo' />
                </div>
                <div className="buttons_box_about">
                    <div className="title_about">
                        {name}
                    </div>
                    <div className="button_about">
                        <a className='button_link' href={homePage}>HOMEPAGE</a>
                    </div>
                    <div className="button_about">
                        <a className='button_link' href={wiki}>WIKI</a>
                    </div>
                </div>
            </div>
            <div className="desc_about">
                {description}
            </div>
            <ul className="marvel_list">
                {comicsItem}
            </ul>
        </>
    );
}


export default AppAboutChar;