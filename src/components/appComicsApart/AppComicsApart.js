import "../appComicsApart/appComicsApart.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UseService from "../service/service";

const AppComicsApart = (props) => {

    const {comicsId} = useParams();
    const {getApartComics} = UseService();
    const [comics, setComics] = useState({});
    console.log(comicsId);
    useEffect(()=>{
        if (!comicsId) {
            return
        }
        getApartComics(comicsId)
        .then(data => {
            setComics(data[0]);
        })
    }, [comicsId]);

    
    return (
        <>
            <div className="apart_wrapper">
                <div className="apart_img_box">
                    <img className="apart_img" src={comics.thumbnail} alt={comics.title}/>
                </div>
                <div className="apart_content_box">
                    <div className="apart_title">
                        <span className="title_content">
                        {comics.title}
                        </span>
                        <Link className="apart_link" to={"/comics"}>Back to all</Link>
                    </div>
                    <div className="apart_description">
                        {comics.description === null ? comics.description = "There is not description of that" : comics.description}
                    </div>
                    <div className="apart_pages">
                        Page count {comics.pageCount}
                    </div>
                    <div className="apart_price">
                    Price: <br/>    
                    {comics.prices}$
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppComicsApart;