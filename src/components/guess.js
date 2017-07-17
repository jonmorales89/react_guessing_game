/**
 * Created by jonsm on 7/17/2017.
 */
import React, {Component} from 'react';

class Guess extends Component {
    constructor(props){
        super(props);

        this.state = {
            randomNumber : Math.floor(Math.random() * 10) + 1,
            userGuess : '',
            outcome : '',
            history: []
        }

    }

    handleChange(e){
        this.setState({ userGuess: e.target.value });
    }

    submitGuess(e){
        e.preventDefault();
        let { randomNumber, userGuess } = this.state;
        userGuess = parseInt(userGuess);
        let newOutcome = '';

        if(userGuess > randomNumber){
            newOutcome = 'Too High';
        } else if (userGuess < randomNumber){
            newOutcome = 'Too Low';
        } else if (userGuess === randomNumber){
            newOutcome = 'You got it!'
        } else{
            newOutcome = 'No input given, please try again.'
        }

        const newHistory = `You guessed: ${userGuess}. Outcome: ${newOutcome}`;

        this.setState({
            outcome: newOutcome,
            history: [newHistory,...this.state.history]
        });
    }

    render(){
        const {outcome, history} = this.state;
        const historyOutput = history.map((item, index)=>{
           return <h5 key={index}>{item}</h5>
        });
        return (
            <div>
                <h3>Enter a number between 1 and 10</h3>
                <h1>{this.state.randomNumber}</h1>
                <div className="row">
                    <div className="col-sm-6">
                        <form onSubmit={(e) => this.submitGuess(e)}>
                            <div className="input-group">
                                <input type="number" className="form-control" onChange={(e)=> this.handleChange(e)} value={this.state.userGuess}/>
                                <span className="input-group-btn">
                                    <button className="btn btn-outline-primary">Make Guess</button>
                                </span>
                            </div>
                        </form>
                        <h3 className={(outcome === 'Too Low') ? 'text-warning' : (outcome === 'Too High') ? 'text-danger' : 'text-success'}>{outcome}</h3>
                    </div>
                    <div className="col-sm-6">
                        {historyOutput}
                    </div>
                </div>
            </div>
        )
    }

}

export default Guess;