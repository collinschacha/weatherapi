import "./Card.css";

type CardProps = {
  imgUrl: string;
  location: string;
  temp_c: string;
  temp_f: string;
  weather: string;
};

const Cards = ({ imgUrl, location, temp_c, temp_f, weather }: CardProps) => {
  return (
    <div className="cardContainer">
      <div className="card">
        <p className="city">{location}</p>
        <p className="weather">{weather}</p>
        <img
          className="weatherIcon"
          src={imgUrl}
          alt="weather icon"
          width="50"
          height="50"
        />
        <p className="temp">{temp_c}°C</p>
        <div className="minmaxContainer">
          <div className="min">
            <p className="minHeading">Fahrenheit</p>
            <p className="minTemp">{temp_f}°F</p>
          </div>
          <div className="max">
            <p className="maxHeading">Celsius</p>
            <p className="maxTemp">{temp_c}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
