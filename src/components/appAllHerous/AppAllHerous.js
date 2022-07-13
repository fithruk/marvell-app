import {Component ,useState, useEffect} from "react";
import "../appAllHerous/appAllHerous.css";
import AppHeroItem from "../appHeroItem/AppHeroItem";
import Spinner from "../spinner/Spinner";
import UseService from "../service/service";
import Loader from "../loaderButton/Loaderbutton";

const AppAllHerous = (props) => {
    
    let [data, setdata] = useState([]);
    let [loading, setloading] = useState(true);
    let [offset, setoffset] = useState(211);
    let [loadNew, setloadNew] = useState(false);
    

    const {getApartChar, getAllCharacters, request} =  UseService();

    const loadAllChar = (offset = props.offset) => {
        loadNewCharacters(offset);
    }

    const loadNewCharacters = (offset) => {
        showloadNew();
        getAllCharacters(offset)
        .then(dataNew => {

            setdata([...data, ...dataNew]);
            setloading(false);
            setoffset((offset) => offset + 9);
            setloadNew(false)
        })
    }

    const showLoading = () => {
        setloading(false);
    }

    const showloadNew = () => {
        setloadNew(true);
    }

    useEffect(() => {
        loadAllChar();
    }, []);

    

    let { getId } = props;
    let onLoading = loading ? <Spinner /> : null;
    let onLoadnew = loadNew ? <Loader /> : "Show more";
    let readyData = data.map(({ thumbnail, name, id }) => {
        return <AppHeroItem key={id} thumbnail={thumbnail} name={name} getId={getId} id={id} />
    })
    return (
        <>
            <div className="all_box">
                {onLoading}
                {readyData}
            </div>
            <div className="button_load" onClick={() => {loadNewCharacters(offset)}}>
                {onLoadnew}
            </div>
        </>
    )
}



export default AppAllHerous;