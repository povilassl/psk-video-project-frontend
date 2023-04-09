import "../css/allPagesHeader.css";

const Header = () => {
    function handleClick() {
        window.location.href = "/";
      }

    return (
        <div className="header">
            <div className="left"/>
            <div className="text">
                <span onClick={handleClick}>VIDEOTEKA</span>
            </div>
            <div className="right"/>
        </div>
    );
  };
  
export default Header;