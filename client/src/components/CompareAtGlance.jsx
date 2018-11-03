import React from "react";
import StarRating from "react-star-ratings";

const CompareAtGlance = ({ item, linkText }) =>
  !item ? (
    <div>please wait</div>
  ) : (
    <div className="cag__item">
      <img src={item.imageURL} alt="Product" />
      <div className="cag__item__main-info text-center">
        <p className="roboto-C cag__item__main-info__name">{item.title}</p>
        <div>
          <StarRating
            numberOfStars={5}
            rating={item.ranking}
            starRatedColor="#BD5A0E"
            starDimension="15px"
            starSpacing="3px"
          />
          <span className="review">({item.reviews})</span>
        </div>
        <p className="roboto" data-price="dt-price">
          ${item.price}
        </p>
        <a className="cag__link" href="">
          {linkText}
        </a>
      </div>

      <div className="cag__info-group">
        <p className="cag__info-group__title">Sleeping Capacity</p>
        <p className="cag__info-group__info">{item.sleepingCapacity}</p>
      </div>
      <div className="cag__info-group">
        <p className="cag__info-group__title">Packaged Weight</p>
        <p className="cag__info-group__info">{item.packagedWeight}</p>
      </div>
      <div className="cag__info-group">
        <p className="cag__info-group__title">Number of Doors</p>
        <p className="cag__info-group__info">
          {item.numberOfDoors > 1
            ? `${item.numberOfDoors} doors`
            : `${item.numberOfDoors} door`}
        </p>
      </div>
      <div className="cag__info-group">
        <p className="cag__info-group__title">Best Use</p>
        <p className="cag__info-group__info">{item.bestUse}</p>
      </div>
    </div>
  );

export default CompareAtGlance;
