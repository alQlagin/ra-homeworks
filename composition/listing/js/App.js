'use strict';

const App = ({items}) => (
  <main>
    {items.map(item => <ItemColorDecorator item={item} />)}
  </main>
);
