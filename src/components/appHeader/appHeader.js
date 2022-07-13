import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import "./appHeader.css"
import mjolnir from "../images/mjolnir.png";
import UseService from '../service/service';
import Spinner from '../spinner/Spinner';

const AppHeader = (props) => {
    
    let [char, setChar] = useState([]);
    let [loading, setloading] = useState(true);

    
    const {getApartChar} = UseService();

    useEffect(() => {
        getRandomChar();
    },[])
    
    const charLoading = () => {
        setloading(true);
    }

    const getRandomChar = () => {
        charLoading();
        let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getApartChar(id)
        .then(char => { 
            setChar(char);
            setloading(false);
        })
    }

    
    return (
        <header className="header">
            <nav className="nav">
                <div className="half_nav">
                    <Link to="/" className="nav_link"><span className='marvell_logo'>Marvel</span> information portal</Link>
                </div>
                <div className="half_nav">
                <NavLink end style={({isActive}) => ({color : isActive ? "#9f0013" : "inherit"})} to="/" className="nav_link">CHARACTERS/</NavLink> 
                <NavLink end style={({isActive}) => ({color : isActive ? "#9f0013" : "inherit"})} to="/comics" className="nav_link">COMICS</NavLink>
                </div>
            </nav>
            <div className="character_box">
                <div className="char_half">
                    {loading ? <Spinner /> : <FinalRandomChar char={char} />}
                </div>
                <div className="char_half">
                    <div className="title--mod">
                    Random character for today!
                    Do you want to get to know him better?
                    </div>
                    <div className="title--mod">
                    Or choose another one
                    </div>
                    <div className="button_char" onClick={getRandomChar}>
                    TRY IT
                    </div>
                    <img className='molot' src={mjolnir} alt="kuvalda" />
                </div>
            </div>
        </header>
    )
}


const FinalRandomChar = ({char}) => {
    let { name, description, thumbnail, homePage, wiki} = char;

    return (
        <>
            <div className="char_img_box">
                <img className='char_img' src={thumbnail} alt='jopa_lonya'></img>
            </div>
            <div className="about_char">
                <div className="title">
                    {name}
                </div>
                <div className="desc">
                    {description}
                </div>
                <div className="buttons_box">
                    <div className="button_char">
                        <a className='button_link' href={homePage}>HOMEPAGE</a>
                    </div>
                    <div className="button_char">
                        <a className='button_link' href={wiki}>WIKI</a>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AppHeader;