import React, { Fragment } from 'react';
import Navbar from '../../navbar';
import './homework.css';
import Axios from 'axios';

class homework extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            details: 'Homework will be displayed here if available.',
            date: ''
        };
        this.findHomework = this.findHomework.bind(this);
        this.resetHomework = this.resetHomework.bind(this);
    }

    componentDidMount() {
        Axios.get("http://localhost:5000/homework/get")
            .then(res => {
                console.log(res.data.message, res.data.data);
                this.setState({
                    data: res.data.data,
                    date: 'N/A'
                });
            },
            err => {
                console.log('Error');
            })
    }

    findHomework() {
        const hclass = document.getElementById('hclass').value;
        const hsubject = document.getElementById('hsubject').value;
        if(hclass === 'Nursery' || hclass === 'KG') {
            if(hsubject !== 'English' && hsubject !== 'Bengali' && hsubject !== 'Mathematics'){
                console.log('Error');
                return;
            }
        }
        if(hclass === 'Transition') {
            if(hsubject !== 'English' && hsubject !== 'Bengali' && hsubject !== 'Mathematics' && hsubject !== 'GK'){
                console.log('Error');
                return;
            }
        }
        if(hclass === '1') {
            if(hsubject !== 'English' && hsubject !== 'Bengali' && hsubject !== 'Mathematics' && hsubject !== 'GK' && hsubject !== 'EVS'){
                console.log('Error');
                return;
            }
        }
        if(hclass === '2' || hclass === '3') {
            if(hsubject === 'EVS'){
                console.log('Error');
                return;
            }
        }
        if(hclass && hsubject) {
            this.state.data.forEach(obj => {
                if(obj.class === hclass && obj.subject === hsubject) {
                    this.setState({
                        details: obj.details,
                        date: obj.date
                    });
                }
            });
        } else {
            console.log('Error');
        }
    }

    resetHomework() {
        this.setState({
            details: 'Homework will be displayed here if available.',
            date: 'N/A'
        });
    }

    render() {
        return(
            <Fragment>
                <Navbar />
                <div className="jumbotron m-1">
                    <h5>Find Homework:</h5>
                </div>
                <form className="mx-5">
                    <label>Class:</label><br/>
                    <select id="hclass">
                        <option value="Nursery">Nursery</option>
                        <option value="KG">KG</option>
                        <option value="Transition">Transition</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select><br/>
                    <label>Subject:</label><br/>
                    <select id="hsubject">
                        <option value="English">English</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="GK">GK</option>
                        <option value="EVS">EVS</option>
                        <option value="History">History</option>
                        <option value="Geograpgy">Geography</option>
                        <option value="Science">Science</option>
                    </select><br/>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-dark m-2" onClick={this.findHomework}>Search</button>
                        <button type="reset" className="btn btn-dark m-2" id="hreset" onClick={this.resetHomework}>Reset</button>
                    </div>
                    <hr/>
                    <div className="displayhomework">
                        <p>To be checked on: {this.state.date}</p>
                        <p>{this.state.details}</p>
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default homework;