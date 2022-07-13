import "../appBanner/appBanner.css";
import avendersLogo from "../images/avengers_logo.png";
import avendersTeam from "../images/avengers-png_team.png"

const AppBanner = (props) => {

    return (
        <>
            <div className="banner">
                <div className="banner_content_box">
                    <img className="banner_logo" src={avendersTeam} alt="logo" />
                </div>
                <div className="banner_content_box">
                    New comics every week! <br /> 
                    Stay tuned!
                </div>
                <div className="banner_content_box">
                    <img className="banner_logo" src={avendersLogo} alt="logo" />
                </div>
            </div>
        </>
    );
}

export default AppBanner;