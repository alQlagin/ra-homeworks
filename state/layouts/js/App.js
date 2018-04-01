'use strict';

const VIEW_LIST = "view_list";
const VIEW_MODULE = "view_module";

class App extends React.Component {

    onSwitch = () => {
        this.setState({cardView: !this.state.cardView});
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            cardView: true
        }
    }

    render() {
        return (
            <div>
                <div className="toolbar">
                    <IconSwitch
                        icon={this.state.cardView ? VIEW_MODULE : VIEW_LIST}
                        onSwitch={this.onSwitch}/>
                </div>
                {this.renderLayout(this.state.cardView)}
            </div>
        );
    }

    renderLayout(cardView) {
        if (cardView) {
            return (
                <CardsView
                    layout={this.props.layout}
                    cards={this.getShopItems(this.props.products, cardView)}/>
            );
        }
        return (<ListView items={this.getShopItems(this.props.products, cardView)}/>);
    }

    getShopItems(products, cardView) {
        return products.map(product => {
            let cardProps = {
                title: product.name,
                caption: product.color,
                img: product.img,
                price: `$${product.price}`
            };
            if (cardView) {
                return (
                    <ShopCard {...cardProps}/>
                );
            }
            return (<ShopItem {...cardProps}/>)
        });
    }
}
