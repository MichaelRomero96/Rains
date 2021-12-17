//variables declaration
const ratesApi = {
    id: '6f839a1f0b4c49a394d993adf236698f',
    url: 'https://openexchangerates.org/api/latest.json'
};
const fakeStoreApiUrl = 'https://fakestoreapi.com/products';
const fakeStoreData = [];
const dollarData = [];

//html cards sections
const cardSections = {
    men: '.first-cards',
    women: '.second-cards'
};
const categories = {
    menCategory: `men's clothing`,
    womenCategory: `women's clothing`
};
let eurRate;

//classes

//class for manage the exchange currency
class RateExchange {
    constructor(exchangeRate, price, htmlElement) {
        this.exchangeRate = exchangeRate;
        this.price = price;
        this.htmlElement = htmlElement
    };
    convertToDollar(price, rate) {
        return `$${((price / rate).toFixed(2))}`;
    };
    getHtmlElement() {
        const currencyBtn = document.querySelector("#currency-btn");
        if (currencyBtn !== null) {
            currencyBtn.addEventListener('click', (e) => {
                if (currencyBtn.classList[1] === 'fa-euro-sign') {
                    currencyBtn.classList.replace('fa-euro-sign', 'fa-dollar-sign');
                    if (dollarData.length !== 0) {
                        deleteChilds();
                        setData(dollarData);
                    } else {
                        deleteChilds();
                        const convertEurToDollar = fakeStoreData.map(i => {
                            return {
                                ...i,
                                price: this.convertToDollar(i.price, eurRate)
                            }
                        });
                        dollarData.push(...convertEurToDollar);
                        setData(convertEurToDollar);
                    };
                } else {
                    deleteChilds();
                    currencyBtn.classList.replace('fa-dollar-sign', 'fa-euro-sign');
                    setData(fakeStoreData.map(i => {
                        return {
                            ...i,
                            price: `€${i.price}`
                        }
                    }));
                }
            })
        }
    }
};

//rate Exchange
const eurExchange = new RateExchange();

//class for creation of HTML by consumed fakeStore API
class CreateHtmlCard {
    constructor(image, title, price, rating, section) {
        this.image = image;
        this.title = title;
        this.price = price;
        this.rating = {
            rate: rating.rate,
            count: rating.count
        };
        this.section = section;
    };
    createCard() {
        const card = document.createElement('div');
        card.classList.add('card');
        card.appendChild(this.createImage());
        card.appendChild(this.createInfo());
        return card;
    };
    createImage() {
        const imgCard = document.createElement('img');
        imgCard.setAttribute('src', this.image);
        return imgCard;
    };
    createInfo() {
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info-title');
        cardInfo.appendChild(this.createTitle());
        cardInfo.appendChild(this.createDetails());
        return cardInfo;
    };
    createTitle() {
        const titleCard = document.createElement('div');
        titleCard.textContent = this.title;
        titleCard.classList.add('card');
        return titleCard;
    };
    createDetails() {
        const cardDetails = document.createElement('div');
        cardDetails.classList.add('card-details');
        cardDetails.appendChild(this.createPrice());
        cardDetails.appendChild(this.createRating()[0]);
        return cardDetails;
    };
    createPrice() {
        const priceCard = document.createElement('div');
        priceCard.classList.add('card-price');
        priceCard.textContent = `${this.price}`;
        return priceCard;
    };
    createRating() {
        const ratingCard = document.createElement('div');
        ratingCard.classList.add('card-rating');
        const iconRatingDiv = document.createElement('div');
        iconRatingDiv.classList.add('card-rating-icon');
        iconRatingDiv.textContent = this.rating.rate;
        ratingCard.appendChild(iconRatingDiv);
        iconRatingDiv.appendChild(this.createStarIcon());
        iconRatingDiv.appendChild(this.createCount());
        return [ratingCard, iconRatingDiv];
    };
    createStarIcon() {
        const star = document.createElement('i');
        star.classList.add('fas', 'fa-star');
        return star;
    };
    createCount() {
        const count = document.createElement('span');
        count.classList.add('card-count-rating');
        count.textContent = this.rating.count;
        return count;
    };
    htmlInject() {
        const sectionCard = document.querySelector(this.section);
        this.createCard()
        this.createInfo();
        this.createImage();
        this.createTitle();
        this.createDetails();
        this.createPrice();
        this.createRating();
        this.createStarIcon();
        this.createCount();
        sectionCard.appendChild(this.createCard());
    };
};

//functions
//get rates API Data from fakeApi with Ajax XMLHttpRequest
function getRatesApiData() {
    const { id, url } = ratesApi;
    let req = new XMLHttpRequest();
    // set the type of response data
    req.overrideMimeType("application/json");
    req.open('GET', `${url}?app_id=${id}`, true);
    req.onload = () => {
        //set response to json format
        let jsonResponse = JSON.parse(req.responseText);
        eurRate = jsonResponse.rates.EUR;
    };
    req.send(null);
};

//get store API Data from fakeApi with Ajax XMLHttpRequest
function getFakeStoreData() {
    let req = new XMLHttpRequest();
    // set the type of response data
    req.overrideMimeType("application/json");
    req.open('GET', fakeStoreApiUrl, true);
    req.onload = () => {
        //set response to json format
        let jsonResponse = JSON.parse(req.responseText);
        //send the data to a function to DOM Scripting content
        fakeStoreData.push(...jsonResponse);
        setData(jsonResponse.map(i => {
            return {
                ...i,
                price: `€${i.price}`
            }
        }));
    };
    req.send(null);
};

//delete childs in section cards
function deleteChilds() {
    const mencards = document.querySelector('.first-cards');
    const womancards = document.querySelector('.second-cards');
    while (mencards.firstChild) {
        mencards.removeChild(mencards.firstChild);
    }
    while (womancards.firstChild) {
        womancards.removeChild(womancards.firstChild);
    }
};

//event listener for make consult to API's
window.addEventListener('DOMContentLoaded', e => {
    getFakeStoreData();
    getRatesApiData();
    eurExchange.getHtmlElement();
});

//filter apiData by category and generate html with class
function filterApiStoreData(data, category, section) {
    let filterData = data.filter(i => i.category === category);
    if (filterData.length !== 0) {
        filterData.map(({ image, title, price, rating }, index) => {
            if (index < 4) {
                const createHtmlCard = new CreateHtmlCard(image, title, price, rating, section);
                createHtmlCard.htmlInject();
            };
        })
    };
};

//function pass parameters to filterApiStoreData
function setData(data) {
    if (data.length !== 0) {
        const { menCategory, womenCategory } = categories;
        const { men, women } = cardSections;
        filterApiStoreData(data, menCategory, men); // filter men's cloth
        filterApiStoreData(data, womenCategory, women); // filter women's cloth
    }
};