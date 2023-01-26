import "../Sass/Card.scss";

export const Card = ( {name, image} ) => {
  return (
    <div className="card">
      <p className="card__name">{name}</p>
      <div className="card__circle"></div>
      <img className="card__img" src={image} alt="pokemon img" />
    </div>
  );
};
