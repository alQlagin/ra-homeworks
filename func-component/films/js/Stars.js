'use strict';

function Stars({count}) {
    if (count < 1 || count > 5) return null;
    const stars = [];
    do {
        stars.push(count);
        count--;
    } while (count > 0);
    return <ul className="card-body-stars u-clearfix">
        <li>{stars.map(() => <Star/>)}</li>
    </ul>;
}
