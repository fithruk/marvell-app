import React, { useState, useEffect} from "react";
import { Transition } from 'react-transition-group';
import "../appHeroItem/appHeroItem.css";

const AppHeroItem = (props) => {

    const [checked, setChecked] = useState(false);
    const [inProp, setInprop] = useState(false);

    const setClassName = React.createRef();

    useEffect(() => {
        setInprop(true);
    },[])

    function checkChar() {
        setChecked(({ checked }) => (!checked));
    }

    const duration = 300;

    const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    }

    const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
    };

    let { thumbnail, name, getId, id } = props;
    let classNames = checked ? "item_wrapper current" : "item_wrapper";
    return ( 
        <Transition in={inProp} timeout={duration} mountOnEnter={inProp}>
            {
                state => (
                    <div style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }} className={classNames} ref={setClassName} onClick={() => {
                        getId(id);
                        checkChar();
                    }} >
                        <div className="img_box">
                            <img className="item_main_img" src={thumbnail} alt={name} />
                        </div>
                        <div className="name">
                            {name}
                        </div>
                    </div>
                )
            }
        </Transition>
    )
}

export default AppHeroItem;