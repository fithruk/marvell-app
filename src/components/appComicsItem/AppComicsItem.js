import { Component, useState } from "react";
import "../appComicsItem/appComicsItem.css";

const AppComicsItem = (props) => {

    let {name, resourceURI} = props;
    return (
        <li className="comics_item">
            <a className="comics_link" href={resourceURI}>{name}</a>
        </li>
    );
}

export default AppComicsItem;