import React, {Component} from 'react';
import Cardlist from '../Components/Cardlist';
import Scroll from '../Components/Scroll';
import Searchbox from '../Components/Searchbox';
import './App.css';


class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response =>  response.json())
            .then(users => {this.setState({robots: users})});

    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value })
    }

    render() {
        const {robots, searchfield} = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if (!robots.length) {
            return <h1>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'>Headfriends</h1>
                    <Searchbox searchChange={this.onSearchChange}/>
                    <Scroll>
                            <Cardlist robots={filterRobots}/>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;