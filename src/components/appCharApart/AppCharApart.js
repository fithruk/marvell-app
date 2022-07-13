import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UseService from "../service/service";
import AppBanner from "../appBanner/AppBanner";

const AppCharApart = () => {

    const {charName} = useParams();
    const [char, setChar] = useState({});

    const {getCharByName} = UseService();

    useEffect(()=> {
        if (!charName) {
            return
        }

        getCharByName(charName)
        .then(char => {
            setChar(char);
        })

    }, [charName])

    return (
        <>
            <AppBanner />
            <div className="apart_wrapper">
                    <div className="apart_img_box">
                        <img className="apart_img" src={char.thumbnail} alt={char.name}/>
                    </div>
                    <div className="apart_content_box">
                        <div className="apart_title">
                            <span className="title_content">
                            {char.name}
                            </span>
                            <Link className="apart_link" to={"/"}>Back to all</Link>
                        </div>
                        <div className="apart_description">
                            {char.description === null ? char.description = "There is not descriotion of that" : char.description}
                        </div>
                    </div>
                </div>
        </>
    );
}

export default AppCharApart;