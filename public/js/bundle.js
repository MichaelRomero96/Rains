/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/homePage/index.js":
/*!*******************************!*\
  !*** ./src/homePage/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  //variables declaration\n  const ratesApi = {\n    id: \"6f839a1f0b4c49a394d993adf236698f\",\n    url: \"https://openexchangerates.org/api/latest.json\",\n  };\n  const fakeStoreApiUrl = \"https://fakestoreapi.com/products\";\n  const fakeStoreData = [];\n  const dollarData = [];\n\n  //html cards sections\n  const cardSections = {\n    men: \".first-cards\",\n    women: \".second-cards\",\n  };\n  const categories = {\n    menCategory: `men's clothing`,\n    womenCategory: `women's clothing`,\n  };\n  let eurRate;\n\n  //classes\n\n  //class for manage the exchange currency\n  class RateExchange {\n    constructor(exchangeRate, price, htmlElement) {\n      this.exchangeRate = exchangeRate;\n      this.price = price;\n      this.htmlElement = htmlElement;\n    }\n    convertToDollar(price, rate) {\n      return `$${(price / rate).toFixed(2)}`;\n    }\n    getHtmlElement() {\n      const currencyBtn = document.querySelector(\"#currency-btn\");\n      if (currencyBtn !== null) {\n        currencyBtn.addEventListener(\"click\", (e) => {\n          if (currencyBtn.classList[1] === \"fa-euro-sign\") {\n            currencyBtn.classList.replace(\"fa-euro-sign\", \"fa-dollar-sign\");\n            if (dollarData.length !== 0) {\n              deleteChilds();\n              setData(dollarData);\n            } else {\n              deleteChilds();\n              const convertEurToDollar = fakeStoreData.map((i) => {\n                return {\n                  ...i,\n                  price: this.convertToDollar(i.price, eurRate),\n                };\n              });\n              dollarData.push(...convertEurToDollar);\n              setData(convertEurToDollar);\n            }\n          } else {\n            deleteChilds();\n            currencyBtn.classList.replace(\"fa-dollar-sign\", \"fa-euro-sign\");\n            setData(\n              fakeStoreData.map((i) => {\n                return {\n                  ...i,\n                  price: `€${i.price}`,\n                };\n              })\n            );\n          }\n        });\n      }\n    }\n  }\n\n  //rate Exchange\n  const eurExchange = new RateExchange();\n\n  //class for creation of HTML by consumed fakeStore API\n  class CreateHtmlCard {\n    constructor(image, title, price, rating, section) {\n      this.image = image;\n      this.title = title;\n      this.price = price;\n      this.rating = {\n        rate: rating.rate,\n        count: rating.count,\n      };\n      this.section = section;\n    }\n    createCard() {\n      const card = document.createElement(\"div\");\n      card.classList.add(\"card\");\n      card.appendChild(this.createImage());\n      card.appendChild(this.createInfo());\n      return card;\n    }\n    createImage() {\n      const imgCard = document.createElement(\"img\");\n      imgCard.setAttribute(\"src\", this.image);\n      return imgCard;\n    }\n    createInfo() {\n      const cardInfo = document.createElement(\"div\");\n      cardInfo.classList.add(\"card-info-title\");\n      cardInfo.appendChild(this.createTitle());\n      cardInfo.appendChild(this.createDetails());\n      return cardInfo;\n    }\n    createTitle() {\n      const titleCard = document.createElement(\"div\");\n      titleCard.textContent = this.title;\n      titleCard.classList.add(\"card\");\n      return titleCard;\n    }\n    createDetails() {\n      const cardDetails = document.createElement(\"div\");\n      cardDetails.classList.add(\"card-details\");\n      cardDetails.appendChild(this.createPrice());\n      cardDetails.appendChild(this.createRating()[0]);\n      return cardDetails;\n    }\n    createPrice() {\n      const priceCard = document.createElement(\"div\");\n      priceCard.classList.add(\"card-price\");\n      priceCard.textContent = `${this.price}`;\n      return priceCard;\n    }\n    createRating() {\n      const ratingCard = document.createElement(\"div\");\n      ratingCard.classList.add(\"card-rating\");\n      const iconRatingDiv = document.createElement(\"div\");\n      iconRatingDiv.classList.add(\"card-rating-icon\");\n      iconRatingDiv.textContent = this.rating.rate;\n      ratingCard.appendChild(iconRatingDiv);\n      iconRatingDiv.appendChild(this.createStarIcon());\n      iconRatingDiv.appendChild(this.createCount());\n      return [ratingCard, iconRatingDiv];\n    }\n    createStarIcon() {\n      const star = document.createElement(\"i\");\n      star.classList.add(\"fas\", \"fa-star\");\n      return star;\n    }\n    createCount() {\n      const count = document.createElement(\"span\");\n      count.classList.add(\"card-count-rating\");\n      count.textContent = this.rating.count;\n      return count;\n    }\n    htmlInject() {\n      const sectionCard = document.querySelector(this.section);\n      this.createCard();\n      this.createInfo();\n      this.createImage();\n      this.createTitle();\n      this.createDetails();\n      this.createPrice();\n      this.createRating();\n      this.createStarIcon();\n      this.createCount();\n      sectionCard.appendChild(this.createCard());\n    }\n  }\n\n  //functions\n  //get rates API Data from fakeApi with Ajax XMLHttpRequest\n  function getRatesApiData() {\n    const { id, url } = ratesApi;\n    let req = new XMLHttpRequest();\n    // set the type of response data\n    req.overrideMimeType(\"application/json\");\n    req.open(\"GET\", `${url}?app_id=${id}`, true);\n    req.onload = () => {\n      //set response to json format\n      let jsonResponse = JSON.parse(req.responseText);\n      eurRate = jsonResponse.rates.EUR;\n    };\n    req.send(null);\n  }\n\n  //get store API Data from fakeApi with Ajax XMLHttpRequest\n  function getFakeStoreData() {\n    let req = new XMLHttpRequest();\n    // set the type of response data\n    req.overrideMimeType(\"application/json\");\n    req.open(\"GET\", fakeStoreApiUrl, true);\n    req.onload = () => {\n      //set response to json format\n      let jsonResponse = JSON.parse(req.responseText);\n      //send the data to a function to DOM Scripting content\n      fakeStoreData.push(...jsonResponse);\n      setData(\n        jsonResponse.map((i) => {\n          return {\n            ...i,\n            price: `€${i.price}`,\n          };\n        })\n      );\n    };\n    req.send(null);\n  }\n\n  //delete childs in section cards\n  function deleteChilds() {\n    const mencards = document.querySelector(\".first-cards\");\n    const womancards = document.querySelector(\".second-cards\");\n    while (mencards.firstChild) {\n      mencards.removeChild(mencards.firstChild);\n    }\n    while (womancards.firstChild) {\n      womancards.removeChild(womancards.firstChild);\n    }\n  }\n\n  //event listener for make consult to API's\n  window.addEventListener(\"DOMContentLoaded\", (e) => {\n    getFakeStoreData();\n    getRatesApiData();\n    eurExchange.getHtmlElement();\n  });\n\n  //filter apiData by category and generate html with class\n  function filterApiStoreData(data, category, section) {\n    let filterData = data.filter((i) => i.category === category);\n    if (filterData.length !== 0) {\n      filterData.map(({ image, title, price, rating }, index) => {\n        if (index < 4) {\n          const createHtmlCard = new CreateHtmlCard(\n            image,\n            title,\n            price,\n            rating,\n            section\n          );\n          createHtmlCard.htmlInject();\n        }\n      });\n    }\n  }\n\n  //function pass parameters to filterApiStoreData\n  function setData(data) {\n    if (data.length !== 0) {\n      const { menCategory, womenCategory } = categories;\n      const { men, women } = cardSections;\n      filterApiStoreData(data, menCategory, men); // filter men's cloth\n      filterApiStoreData(data, womenCategory, women); // filter women's cloth\n    }\n  }\n}\n\n\n//# sourceURL=webpack://rains/./src/homePage/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _homePage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./homePage */ \"./src/homePage/index.js\");\n\n// webpack --- NPM Node.JS\n// manejo DOM Eventos\naddEventListener(\"DOMContentLoaded\", () => {\n  (0,_homePage__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  cart();\n});\n\nfunction cart() {\n  const cartButton = document.querySelector(\"#cart-button\");\n  const modal = document.querySelector(\".cart-modal\");\n  const modalClose = document.querySelector(\".modal__no-content\");\n  const handleClick = () => {\n    console.log(\"haciendo click\");\n    toggleModalClose()\n    modal.classList.remove(\"cart-modal--hidden\");\n  };\n  cartButton.addEventListener(\"click\", handleClick);\n\n  modalClose.addEventListener(\"click\", () => {\n    console.log(\"entra?\");\n    toggleModalClose()\n    modal.classList.add(\"cart-modal--hidden\");\n  });\n\n  function toggleModalClose() {\n    modalClose.classList.toggle(\"hidden\");\n  }\n}\n\n\n//# sourceURL=webpack://rains/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;