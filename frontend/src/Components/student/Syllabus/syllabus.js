import React, { Fragment } from 'react';
import Navbar from '../../navbar';
import './syllabus.css';
import Axios from 'axios';

class syllabus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            details: 'Syllabus will be displayed here if available.'
        };
        this.findSyllabus = this.findSyllabus.bind(this);
        this.resetSyllabus = this.resetSyllabus.bind(this);
    }

    componentDidMount() {
        Axios.get("/syllabus/get")
            .then(res => {
                console.log(res.data.message, res.data.data);
                this.setState({
                    data: res.data.data
                });
            },
            err => {
                console.log('Error');
            })
    }

    findSyllabus() {
        const cclass = document.getElementById('cclass').value;
        const ssubject = document.getElementById('ssubject').value;
        const tterm = document.getElementById('tterm').value;
        if(cclass === 'Nursery' || cclass === 'KG') {
            if(ssubject !== 'English' && ssubject !== 'Bengali' && ssubject !== 'Mathematics'){
                console.log('Error');
                return;
            }
        }
        if(cclass === 'Transition') {
            if(ssubject !== 'English' && ssubject !== 'Bengali' && ssubject !== 'Mathematics' && ssubject !== 'GK'){
                console.log('Error');
                return;
            }
        }
        if(cclass === '1') {
            if(ssubject !== 'English' && ssubject !== 'Bengali' && ssubject !== 'Mathematics' && ssubject !== 'GK' && ssubject !== 'EVS'){
                console.log('Error');
                return;
            }
        }
        if(cclass === '2' || cclass === '3') {
            if(ssubject === 'EVS'){
                console.log('Error');
                return;
            }
        }
        if(cclass && ssubject && tterm) {
            this.state.data.forEach(obj => {
                if(obj.class === cclass && obj.subject === ssubject && obj.term === tterm) {
                    this.setState({
                        details: obj.details
                    });
                }
            });
        } else {
            console.log('Error');
        }
    }

    resetSyllabus() {
        this.setState({
            details: 'Syllabus will be displayed here if available.'
        });
    }

    render() {
        return(
            <Fragment>
                <Navbar />
                <div className="jumbotron m-1">
                    <h5>Find Syllabus:</h5>
                </div>
                <form className="mx-5">
                    <label>Class:</label><br/>
                    <select id="cclass">
                        <option value="Nursery">Nursery</option>
                        <option value="KG">KG</option>
                        <option value="Transition">Transition</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select><br/>
                    <label>Subject:</label><br/>
                    <select id="ssubject">
                        <option value="English">English</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="GK">GK</option>
                        <option value="EVS">EVS</option>
                        <option value="History">History</option>
                        <option value="Geograpgy">Geography</option>
                        <option value="Science">Science</option>
                    </select><br/>
                    <label>Term:</label><br/>
                    <select id="tterm">
                        <option value="1">1st Test</option>
                        <option value="2">2nd Test</option>
                        <option value="HY">Half Yearly</option>
                        <option value="3">3rd Test</option>
                        <option value="4">4th Test</option>
                        <option value="A">Annual</option>
                    </select><br/>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-dark m-2" onClick={this.findSyllabus}>Search</button>
                        <button type="reset" className="btn btn-dark m-2" id="rreset" onClick={this.resetSyllabus}>Reset</button>
                    </div>
                    <hr/>
                    <div className="displaysyllabus">
                        <p>{this.state.details}</p>
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default syllabus;

