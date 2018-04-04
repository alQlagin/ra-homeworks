'use strict';
const items = [{
  title: 'Компоненты',
  text: 'Каждый компонент являются законченной частью пользовательского интерфейса и сам управляет своим состоянием, а композиция компонентов (соединение) позволяет создавать более сложные компоненты. Таким образом, создается иерархия компонентов, причем каждый отдельно взятый компонент независим сам по себе. Такой подход позволяет строить сложные интерфейсы, где есть множество состояний, и взаимодействовать между собой.'
}, {
  title: 'Выучил раз, используй везде!',
  text: 'После изучения React вы сможете использовать его концепции не только в браузере, но также и при разработке мобильных приложений с использованием React Native.'
}, {
  title: 'Использование JSX',
  text: 'JSX является языком, расширяющим синтаксис стандартного Javascript. По факту он позволяет писать HTML-код в JS-скриптах. Такой подход упрощает разработку компонентов и повышает читаемость кода.'
}];

const AccordionItem = ({title, text, opened, onOpen}) => {
  return <section className={`section ${opened ? 'open' : ''}`} onClick={() => onOpen()}>
    <button>toggle</button>
    <h3 className="sectionhead">{title}</h3>
    <div className="articlewrap">
      <div className="article">{text}</div>
    </div>
  </section>
};

class Accordion extends React.Component {
  onOpen = (idx) => {
    this.setState({opened: idx});
  };

  constructor(props) {
    super(props);
    this.state = {
      opened: 0
    }
  }

  render() {
    const {items, title} = this.props;
    return <main className="main">
      <h2 className="title">{title}</h2>
      {items.map((item, idx) => <AccordionItem {...item} key={idx} opened={idx === this.state.opened}
                                               onOpen={() => this.onOpen(idx)}/>)}
    </main>
  };
}

ReactDOM.render(
  <Accordion items={items} title='React'/>
  , document.getElementById('accordian'));