import "../appComics/appComics.css";
import Loader from "../loaderButton/Loaderbutton";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UseService from "../service/service";
import Spinner from "../spinner/Spinner";

const AppComics = (props) => {

    const [loadindData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(3000);
    const [loading, setLoading] = useState(true);
    const {getComicsCollection} = UseService(); 
    

    useEffect(() =>{
        getComicsCollection(offset)
        .then(dataNew => {setData([...data, ...dataNew])})
        .then(() => {
            setLoading(false);
            setLoadingData(false);
        })
        
    },[offset])

    const onLoadNewComics = () => {
        setLoading(true);
        setOffset(offset => offset + 8);
        
    }

    let viewData = data.map(({ id, prices, thumbnail, title }) => {
        return (
            <div className="comics_item_wrapper" key={id}>
                <Link className="comics_item_wrapper_link" to={`/comics/${id}`}>
                    <div className="item_img_box">
                        <img className="item_background" src={thumbnail} alt={title} />
                    </div>
                    <div className="item_title">
                        {title}
                    </div>
                    <div className="item_price">
                        {prices} $
                    </div>
                </Link>
            </div>
        )
    })

    return (
        <>
            <div className="comics_wrapper">
                {loadindData ? <Spinner /> : viewData}
            </div>
            <div className="loadNewComics" onClick={() => { onLoadNewComics() }}>
                {loading ? <Loader /> : "load more"}
            </div>
        </>

    );
}

export default AppComics;