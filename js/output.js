"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

//variables declaration
var ratesApi = {
  id: '6f839a1f0b4c49a394d993adf236698f',
  url: 'https://openexchangerates.org/api/latest.json'
};
var fakeStoreApiUrl = 'https://fakestoreapi.com/products';
var fakeStoreData = [];
var dollarData = []; //html cards sections

var cardSections = {
  men: '.first-cards',
  women: '.second-cards'
};
var categories = {
  menCategory: "men's clothing",
  womenCategory: "women's clothing"
};
var eurRate; //classes
//class for manage the exchange currency

var RateExchange = /*#__PURE__*/function () {
  function RateExchange(exchangeRate, price, htmlElement) {
    _classCallCheck(this, RateExchange);

    this.exchangeRate = exchangeRate;
    this.price = price;
    this.htmlElement = htmlElement;
  }

  _createClass(RateExchange, [{
    key: "convertToDollar",
    value: function convertToDollar(price, rate) {
      return "$".concat((price / rate).toFixed(2));
    }
  }, {
    key: "getHtmlElement",
    value: function getHtmlElement() {
      var _this = this;

      var currencyBtn = document.querySelector("#currency-btn");

      if (currencyBtn !== null) {
        currencyBtn.addEventListener('click', function (e) {
          if (currencyBtn.classList[1] === 'fa-euro-sign') {
            currencyBtn.classList.replace('fa-euro-sign', 'fa-dollar-sign');

            if (dollarData.length !== 0) {
              deleteChilds();
              setData(dollarData);
            } else {
              deleteChilds();
              var convertEurToDollar = fakeStoreData.map(function (i) {
                return _objectSpread(_objectSpread({}, i), {}, {
                  price: _this.convertToDollar(i.price, eurRate)
                });
              });
              dollarData.push.apply(dollarData, _toConsumableArray(convertEurToDollar));
              setData(convertEurToDollar);
            }

            ;
          } else {
            deleteChilds();
            currencyBtn.classList.replace('fa-dollar-sign', 'fa-euro-sign');
            setData(fakeStoreData.map(function (i) {
              return _objectSpread(_objectSpread({}, i), {}, {
                price: "\u20AC".concat(i.price)
              });
            }));
          }
        });
      }
    }
  }]);

  return RateExchange;
}();

; //rate Exchange

var eurExchange = new RateExchange(); //class for creation of HTML by consumed fakeStore API

var CreateHtmlCard = /*#__PURE__*/function () {
  function CreateHtmlCard(image, title, price, rating, section) {
    _classCallCheck(this, CreateHtmlCard);

    this.image = image;
    this.title = title;
    this.price = price;
    this.rating = {
      rate: rating.rate,
      count: rating.count
    };
    this.section = section;
  }

  _createClass(CreateHtmlCard, [{
    key: "createCard",
    value: function createCard() {
      var card = document.createElement('div');
      card.classList.add('card');
      card.appendChild(this.createImage());
      card.appendChild(this.createInfo());
      return card;
    }
  }, {
    key: "createImage",
    value: function createImage() {
      var imgCard = document.createElement('img');
      imgCard.setAttribute('src', this.image);
      return imgCard;
    }
  }, {
    key: "createInfo",
    value: function createInfo() {
      var cardInfo = document.createElement('div');
      cardInfo.classList.add('card-info-title');
      cardInfo.appendChild(this.createTitle());
      cardInfo.appendChild(this.createDetails());
      return cardInfo;
    }
  }, {
    key: "createTitle",
    value: function createTitle() {
      var titleCard = document.createElement('div');
      titleCard.textContent = this.title;
      titleCard.classList.add('card');
      return titleCard;
    }
  }, {
    key: "createDetails",
    value: function createDetails() {
      var cardDetails = document.createElement('div');
      cardDetails.classList.add('card-details');
      cardDetails.appendChild(this.createPrice());
      cardDetails.appendChild(this.createRating()[0]);
      return cardDetails;
    }
  }, {
    key: "createPrice",
    value: function createPrice() {
      var priceCard = document.createElement('div');
      priceCard.classList.add('card-price');
      priceCard.textContent = "".concat(this.price);
      return priceCard;
    }
  }, {
    key: "createRating",
    value: function createRating() {
      var ratingCard = document.createElement('div');
      ratingCard.classList.add('card-rating');
      var iconRatingDiv = document.createElement('div');
      iconRatingDiv.classList.add('card-rating-icon');
      iconRatingDiv.textContent = this.rating.rate;
      ratingCard.appendChild(iconRatingDiv);
      iconRatingDiv.appendChild(this.createStarIcon());
      iconRatingDiv.appendChild(this.createCount());
      return [ratingCard, iconRatingDiv];
    }
  }, {
    key: "createStarIcon",
    value: function createStarIcon() {
      var star = document.createElement('i');
      star.classList.add('fas', 'fa-star');
      return star;
    }
  }, {
    key: "createCount",
    value: function createCount() {
      var count = document.createElement('span');
      count.classList.add('card-count-rating');
      count.textContent = this.rating.count;
      return count;
    }
  }, {
    key: "htmlInject",
    value: function htmlInject() {
      var sectionCard = document.querySelector(this.section);
      this.createCard();
      this.createInfo();
      this.createImage();
      this.createTitle();
      this.createDetails();
      this.createPrice();
      this.createRating();
      this.createStarIcon();
      this.createCount();
      sectionCard.appendChild(this.createCard());
    }
  }]);

  return CreateHtmlCard;
}();

; //functions
//get rates API Data from fakeApi with Ajax XMLHttpRequest

function getRatesApiData() {
  var id = ratesApi.id,
      url = ratesApi.url;
  var req = new XMLHttpRequest(); // set the type of response data

  req.overrideMimeType("application/json");
  req.open('GET', "".concat(url, "?app_id=").concat(id), true);

  req.onload = function () {
    //set response to json format
    var jsonResponse = JSON.parse(req.responseText);
    eurRate = jsonResponse.rates.EUR;
  };

  req.send(null);
}

; //get store API Data from fakeApi with Ajax XMLHttpRequest

function getFakeStoreData() {
  var req = new XMLHttpRequest(); // set the type of response data

  req.overrideMimeType("application/json");
  req.open('GET', fakeStoreApiUrl, true);

  req.onload = function () {
    //set response to json format
    var jsonResponse = JSON.parse(req.responseText); //send the data to a function to DOM Scripting content

    fakeStoreData.push.apply(fakeStoreData, _toConsumableArray(jsonResponse));
    setData(jsonResponse.map(function (i) {
      return _objectSpread(_objectSpread({}, i), {}, {
        price: "\u20AC".concat(i.price)
      });
    }));
  };

  req.send(null);
}

; //delete childs in section cards

function deleteChilds() {
  var mencards = document.querySelector('.first-cards');
  var womancards = document.querySelector('.second-cards');

  while (mencards.firstChild) {
    mencards.removeChild(mencards.firstChild);
  }

  while (womancards.firstChild) {
    womancards.removeChild(womancards.firstChild);
  }
}

; //event listener for make consult to API's

window.addEventListener('DOMContentLoaded', function (e) {
  getFakeStoreData();
  getRatesApiData();
  eurExchange.getHtmlElement();
}); //filter apiData by category and generate html with class

function filterApiStoreData(data, category, section) {
  var filterData = data.filter(function (i) {
    return i.category === category;
  });

  if (filterData.length !== 0) {
    filterData.map(function (_ref, index) {
      var image = _ref.image,
          title = _ref.title,
          price = _ref.price,
          rating = _ref.rating;

      if (index < 4) {
        var createHtmlCard = new CreateHtmlCard(image, title, price, rating, section);
        createHtmlCard.htmlInject();
      }

      ;
    });
  }

  ;
}

; //function pass parameters to filterApiStoreData

function setData(data) {
  if (data.length !== 0) {
    var menCategory = categories.menCategory,
        womenCategory = categories.womenCategory;
    var men = cardSections.men,
        women = cardSections.women;
    filterApiStoreData(data, menCategory, men); // filter men's cloth

    filterApiStoreData(data, womenCategory, women); // filter women's cloth
  }
}

;
