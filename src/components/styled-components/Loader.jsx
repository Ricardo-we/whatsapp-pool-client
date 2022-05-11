import '../../assets/css/Loader.css';

function Loader() {
    return ( 
        <svg className="loader-svg" viewBox="25 25 50 50">
            <circle className="loader-circle" r="20" cy="50" cx="50"></circle>
        </svg> 
    );
}

export default Loader;