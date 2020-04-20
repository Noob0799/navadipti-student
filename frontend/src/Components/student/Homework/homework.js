import React, { Fragment } from 'react';
import Navbar from '../../navbar';
import './homework.css';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class homework extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: []
        };
        this.findHomework = this.findHomework.bind(this);
        this.resetHomework = this.resetHomework.bind(this);
    }

    componentDidMount() {
        
    }

    findHomework() {
        const hclass = document.getElementById('hclass').value;
        const hsubject = document.getElementById('hsubject').value;
        if(hclass === 'Nursery' || hclass === 'KG') {
            if(hsubject !== 'English' && hsubject !== 'Bengali' && hsubject !== 'Mathematics' && hsubject !== 'GK'){
                console.log('Error');
                this.notifyB('Not available');
                this.resetHomework();
                return;
            }
        }
        if(hclass === 'Transition') {
            if(hsubject !== 'English' && hsubject !== 'Bengali' && hsubject !== 'Mathematics' && hsubject !== 'GK'){
                console.log('Error');
                this.notifyB('Not available');
                this.resetHomework();
                return;
            }
        }
        if(hclass === '1') {
            if(hsubject !== 'English' && hsubject !== 'Bengali' && hsubject !== 'Mathematics' && hsubject !== 'GK' && hsubject !== 'EVS' && hsubject !== 'Computer'){
                console.log('Error');
                this.notifyB('Not available');
                this.resetHomework();
                return;
            }
        }
        if(hclass === '2' || hclass === '3') {
            if(hsubject === 'EVS'){
                console.log('Error');
                this.notifyB('Not available');
                this.resetHomework();
                return;
            }
        }
        if(hclass && hsubject) {
            console.log(hclass, hsubject);
            let tempdetails = [];
            Axios.get("/homework/get/" + hclass + "&" + hsubject)
            .then(res => {
                console.log(res.data.message);
                this.notifyA(res.data.message);
                console.log(res.data.data);
                res.data.data.forEach(element => {
                    const obj = {img: element.img, details: element.details, date: element.date, id: element._id};
                    tempdetails.push(obj);
                });
                this.setState({
                    details: tempdetails
                });
            },
            err => {
                console.log('Error');
                this.notifyB('Try again later');
                this.resetHomework();
            })
        } else {
            console.log('Error');
            this.notifyB('Error');
            this.resetHomework();
        }
    }

    resetHomework() {
        this.setState({
            details: []
        });
    }
    
    notifyA = (text) => toast.success(text, {containerId: 'A'});
    notifyB = (text) => toast.error(text, {containerId: 'B'});

    render() {
        return(
            <Fragment>
                <Navbar />
                <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
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
                        <option value="Geography">Geography</option>
                        <option value="Science">Science</option>
                        <option value="Computer">Computer</option>
                    </select><br/>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-dark m-2" onClick={this.findHomework}>Search</button>
                        <button type="reset" className="btn btn-dark m-2" id="hreset" onClick={this.resetHomework}>Reset</button>
                    </div>
                    <hr/>
                    <div className="displayhomework">
                        {
                            this.state.details.map(obj => {
                                return (
                                    <div key={obj.id}>
                                        <p>To be checked on: {obj.date}</p>
                                        {obj.img &&
                                            <div>
                                                <p><img src={obj.img} alt="homework" width="100" height="100"/></p>
                                                <p><a download={"hw" + obj.class + obj.subject} href={obj.img}>Download</a></p>
                                            </div>
                                        }
                                        <p>{obj.details}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default homework;