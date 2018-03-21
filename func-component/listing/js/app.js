'use strict';
// получить данные
fetch('https://neto-api.herokuapp.com/etsy')
    .then(response => response.json())

    // нужны только определенные поля
    .then(list => list.map(item => ({
        listing_id: item.listing_id,
        url: item.url,
        MainImage: item.MainImage,
        title: item.title,
        currency_code: item.currency_code,
        price: item.price,
        quantity: item.quantity,
    })))

    .then(list => ReactDOM.render(
        <Listing items={list}/>,
        document.getElementById('root')
    ));

function Listing({items}) {
    return <div className="item-list">{items.map(item => <ListingItem item={item} key={item.listing_id}/>)}</div>
}

function ListingItem({item}) {
    return <div className="item">
        <ListingItemImage item={item}/>
        <div className="item-details">
            <ListingItemTitle title={item.title}/>
            <ListingItemPrice price={item.price} currency={item.currency_code}/>
            <ListingItemQuantity quantity={item.quantity}/>
        </div>
    </div>
}

function ListingItemImage({item}) {
    return <div className="item-image">
        <a href={item.url}>
            <img src={item.MainImage.url_570xN}/>
        </a>
    </div>
}

function ListingItemTitle({title}) {
    if (title.length > 50) title = title.substr(0, 50) + '…';
    return <p className="item-title">{title}</p>;
}

function ListingItemPrice({price, currency}) {
    if (!price) return null;
    let out = '';
    switch (currency) {
        case 'USD':
            out = `$${price}`;
            break;
        case 'EUR':
            out = `€${price}`;
            break;
        default:
            out = `${price} ${currency}`;
            break;
    }
    return <p className="item-price">{out}</p>
}

function ListingItemQuantity({quantity}) {
    let level = '';
    if (quantity > 20) {
        level = 'high';
    } else if (quantity > 10) {
        level = 'medium';
    } else {
        level = 'low';
    }
    return <p className={`item-quantity level-${level}`}>{quantity} left</p>
}