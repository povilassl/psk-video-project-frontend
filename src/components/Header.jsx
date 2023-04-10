import "../css/allPagesHeader.css";

const Header = () => {
  function handleClick_up() {
    window.location.href = "/video/upload";
  }

  function handleClick() {
    window.location.href = "/";
  }

  return (
    <div className="header">
      <div className="left" />
      <div className="text">
        <span style={{display: 'inline-flex'}}>
        <span onClick={handleClick}>VIDEOTEKA /</span>
        <span onClick={handleClick_up}> Upload</span></span>
      </div>
      <div className="right" />
    </div>
  );
};

export default Header;