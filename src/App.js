import React, {Component} from 'react';
import './App.css';	
import Snake from './Snake';

const grid = [];

const initState = {
                rows: 10,
                cols: 10,
                grid: [],
                direction:'RIGHT',
                snakeDots : [
                        [0,0],
                        [10,0],
                        [20,0],
                ]
        };
class App extends Component {
	constructor() {
		super();
		this.state = initState;
		this.state.target = "";
	}

	componentDidMount() {
		this.initialState();
	}

	componentDidUpdate() {
		this.checkBouderies();
	}
	
	initialState = () => {
		const gr = [];
		for (let row = 0; row < this.state.rows; row++) {
			for (let col = 0; col < this.state.cols; col++) {
                		gr.push({row,col})
        		}
		}
		this.setState({ grid: gr }); 
	}
	
	moveSnake = () => {
		let dots = [...this.state.snakeDots];
		let head = dots[dots.length-1];
		switch(this.state.direction) {
			case 'RIGHT':
				head= [head[0] + 10, head[1]];
				break;
			case 'LEFT':
				head = [head[0] - 10, head[1]];
				break;
			case 'DOWN':
				head= [head[0], head[1] + 10];
				break;
			case 'UP':
				head = [head[0], head[1] - 10];
				break;			
		}
		dots.push(head);
		dots.shift();
		this.setState({
			snakeDots: dots
		});
	}

	
	checkBouderies() {
		let head = this.state.snakeDots[this.state.snakeDots.length -1];
		if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
			this.setState(initState);
			this.initialState();
			return;
		}
	}

	
	handleClick(e) {
		e.target.className = "dot snake";
		let key = e.target.dataset.key;
		this.setState({target: key});
		
		let nodes = key.split("-");
		let coords = [nodes[1] * 10 , nodes[0]*10];
		let head = this.state.snakeDots[this.state.snakeDots.length -1];
		let t = this;
		let move = setInterval(function() {
			head = t.state.snakeDots[t.state.snakeDots.length -1];
			if(coords[0] > head[0]) {
				t.setState({direction: 'RIGHT'});
				t.moveSnake(); 
			} else if(coords[0] < head[0]) {
				t.setState({direction: 'LEFT'});
				t.moveSnake(); 
			}
			if(coords[1] > head[1]) {
				t.setState({direction: 'DOWN'});
				t.moveSnake(); 
			} else if(coords[1] < head[1]) {
				t.setState({direction: 'UP'});
				t.moveSnake(); 
			}
			if(head[0] == coords[0] && head[1] == coords[1]) {
				clearInterval(move);
			}
		}, 500);
	}

	render() {
			const gridItems = this.state.grid.map((grid) => {
      				return <div 
        				data-key={grid.row.toString() + '-' + grid.col.toString()} 
        				className={(grid.row.toString() + '-' + grid.col.toString()) == this.state.target? "dot snake": "dot"} onClick={this.handleClick.bind(this)}></div>
    			});
			
		return (
			<div>
				<div className="header-text">10X10 Grid</div>
				<div className="sgame">
					{gridItems}
					<Snake snakeDots={this.state.snakeDots} />
				</div>
			</div>
		);
	}
}

export default App;
