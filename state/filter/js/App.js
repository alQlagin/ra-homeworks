'use strict';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filter: props.filters[0],
            projects: this.filterProjects(props.filters[0])
        };

    }

    onSelectFilter = (filter) => {
        this.setState({filter, projects: this.filterProjects(filter)})
    };

    filterProjects(filter) {
        if (!filter || /all/i.test(filter)) {
            return [...this.props.projects]
        } else {
            const filterRe = new RegExp(`^${filter}$`, 'i');
            return this.props.projects.filter(project => filterRe.test(project.category))
        }
    }

    render() {
        return <div>
            <Toolbar
                filters={this.props.filters}
                selected={this.state.filter}
                onSelectFilter={this.onSelectFilter}/>
            <Portfolio projects={this.state.projects}/>
        </div>
    }
}
