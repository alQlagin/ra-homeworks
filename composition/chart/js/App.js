function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
  return a - b;
}

/**
 * Легенда
 * @param chartLabels
 * @param colors
 * @returns {*}
 * @constructor
 */
const Legend = ({chartLabels = [], colors = []}) => {
  return <div className="Legend">
    {
      chartLabels.map(
        (label, labelIndex) => {
          return (
            <div>
              <span className="Legend--color" style={{backgroundColor: colors[labelIndex % colors.length]}}/>
              <span className="Legend--label">{label}</span>
            </div>
          );
        })
    }
  </div>;
};

/**
 * Комопнент редрит отдельный столбец
 * @param height
 * @param width
 * @param right
 * @param opacity
 * @param color
 * @param item
 * @param type
 * @returns {*}
 * @constructor
 */
const ChartItem = ({height, width, right, opacity = 1, color, item, type = ''}) => {
  const style = {
    backgroundColor: color,
    height,
    width,
    right,
    opacity,
    zIndex: item
  };
  return (
    <div
      className={`Charts--item ${type}`}
      style={style}
    >
      <b style={{color}}>{item}</b>
    </div>
  )
};

/**
 * Базовый класс для графика
 */
class BaseChart extends React.Component {
  get seriesType() {
    return '';
  }

  get max() {
    return this.props.max || [this.props.series].reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);
  }

  render() {
    const {series, label, height = 'auto'} = this.props;
    const className = `Charts--serie ${this.seriesType}`;

    if (!series || !series.length) return null;
    return <div className={className} style={{height}}>
      <label>{label}</label>
      {series.map((item, itemIndex) => {
        const props = this.getItemProps(item, itemIndex);
        this.props.orientation === 'horizontal' && console.log(props);
        return <ChartItem {...props} key={itemIndex} color={this.getItemColor(itemIndex)} type={this.seriesType}/>;
      })}
    </div>;
  }

  getItemProps(item, indx) {
    throw Error('Implement BaseChart class');
  }

  getItemColor(idx) {
    return this.props.colors[idx];
  }
}

/**
 * Обычный график
 */
class Chart extends BaseChart {
  getItemProps(item, idx) {
    const max = this.max;
    const size = item / (max) * 100;
    const result = {
      opacity: item / max + .05,
    };
    if (this.props.orientation === 'horizontal')
      result.width = size + '%';
    else
      result.height = size + '%';
    return result;
  }
}

/**
 * Stacked график
 */
class StackedChart extends BaseChart {
  get seriesType() {
    return 'stacked';
  }

  getItemProps(item, idx) {
    const sum = this.props.series.reduce((carry, current) => carry + current, 0);
    const size = item / sum * 100;
    return {
      opacity: 1,
      height: size + '%'
    };
  }
}

/**
 * Layered график
 */
class LayeredChart extends BaseChart {
  getItemProps(item, idx) {
    const sortedSerie = this.props.series.slice(0);
    const max = this.max;
    const size = item / (max) * 100;

    sortedSerie.sort(compareNumbers);
    return {
      opacity: (item / max + .05),
      height: size + '%',
      right: ((sortedSerie.indexOf(item) / (this.props.series.length + 1)) * 100) + '%'
    };
  }
}

/**
 * Обертка для группы графиков
 * @param {Array<BaseChart>} charts  массив графиков
 * @param {boolean} horizontal флаг использовать горизонтальную ориентацию
 * @returns {*}
 * @constructor
 */
const ChartGroup = ({charts, horizontal = false}) => {
  if (!charts || !charts.length) return null;
  return <div className={`Charts ${horizontal ? 'horizontal' : ''}`}>
    {charts}
  </div>
};

class App extends React.Component {
  componentWillMount() {
    this.setState({
      data: [],
      series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
      labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
      colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
    })
  }

  componentDidMount() {
    this.populateArray();
    setInterval(this.populateArray.bind(this), 2000);
  }

  populateArray() {
    const series = 5;
    const serieLength = 5;

    let data = new Array(series).fill(new Array(serieLength).fill(0));
    data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

    this.setState({data});
  }

  render() {
    const {data, colors, labels, series} = this.state;
    const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);
    return (
      <section>

        <ChartGroup charts={data.map((serie, idx) => <Chart key={idx}
                                                            label={labels[idx]}
                                                            series={serie}
                                                            max={max}
                                                            height={250}
                                                            colors={colors}/>)
        }/>

        <ChartGroup charts={data.map((serie, idx) => <StackedChart key={idx}
                                                                   label={labels[idx]}
                                                                   series={serie}
                                                                   height={250}
                                                                   colors={colors}/>)
        }/>
        <ChartGroup charts={data.map((serie, idx) => <LayeredChart key={idx}
                                                                   label={labels[idx]}
                                                                   series={serie}
                                                                   max={max}
                                                                   height={250}
                                                                   colors={colors}/>)
        }/>

        <ChartGroup charts={data.map((serie, idx) => <Chart key={idx}
                                                            label={series[idx]}
                                                            series={serie}
                                                            max={max}
                                                            orientation='horizontal'
                                                            colors={colors}/>)
        }
                    horizontal
        />

        <Legend chartLabels={labels} colors={colors}/>
      </section>
    );
  }
}