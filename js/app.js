function getData() {
    let req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', 'https://fakestoreapi.com/products', true);
    req.onload = function () {
        let jsonResponse = JSON.parse(req.responseText);
        setData(jsonResponse)
        // do something with jsonResponse
    };
    req.send(null);
};

getData();

function setData(data) {
    if (data.length !== 0) {
        let clothingFilter = data.filter(i => i.category === "men's clothing");
        console.log(clothingFilter);
        if (clothingFilter !== 0) {
            clothingFilter.map(({ image, title, price, rating }) => {
                const card = document.createElement('div');
                card.classList.add('card');
                const cardInfo = document.createElement('div');
                cardInfo.classList.add('card-info');
                const imgCard = document.createElement('img');
                imgCard.setAttribute('src', image);
                const titleCard = document.createElement('span');
                titleCard.classList.add('card-info-title');
                titleCard.textContent = title;
                const cardDetails = document.createElement('div');
                cardDetails.classList.add('card-details');
                const priceCard = document.createElement('div');
                priceCard.classList.add('card-price');
                priceCard.textContent = price;
                const ratingCard = document.createElement('div');
                ratingCard.classList.add('card-rating');
                iconRatingDiv = document.createElement('div');
                iconRatingDiv.classList.add('card-rating-icon');
                iconRatingDiv.textContent = rating.rate;
                const star = document.createElement('i');
                star.classList.add('fas', 'fa-star');
                const count = document.createElement('span');
                count.classList.add('card-count-rating');
                count.textContent = rating.count;
                card.appendChild(imgCard);
                card.appendChild(cardInfo);
                cardInfo.appendChild(titleCard);
                cardInfo.appendChild(cardDetails);
                cardDetails.appendChild(priceCard);
                cardDetails.appendChild(ratingCard);
                ratingCard.appendChild(iconRatingDiv);
                iconRatingDiv.appendChild(star);
                iconRatingDiv.appendChild(count);
                const sectionCard = document.querySelector('.first-cards');
                sectionCard.appendChild(card);
            });
        }
    }
}