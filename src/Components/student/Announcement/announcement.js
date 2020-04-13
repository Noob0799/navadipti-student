import React, { Fragment } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import './announcement.css';
import Navbar from '../../navbar';
import Axios from 'axios';

class announcement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            open: false
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount() {
        Axios.get("http://localhost:5000/announcement/get")
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

    handleToggle() {
        this.setState({
          open: !this.state.open
        });
      }

    render() {
        return(
            <Fragment>
                <Navbar />
                {
                    this.state.data.map(obj => {
                        return (
                            <ul className="list-group" key={obj._id}>
                                <li className="btn btn-dark m-2" onClick={this.handleToggle}
                                aria-controls="example-collapse-text"
                                aria-expanded={this.state.open}
                                >
                                    <label className="datename">{obj.date} {obj.class}</label>
                                </li>
                                <Collapse in={this.state.open}>
                                    <div id="example-collapse-text" className="announcement-container card m-1 p-1" disabled>
                                        <div className="card-body">
                                        <label className="card-text">{obj.details}</label>
                                            <p className="card-title">{obj.name}</p>
                                        </div>
                                    </div>
                                </Collapse>
                            </ul>
                        );
                    })
                }
            </Fragment>
        );
    }
}

export default announcement;