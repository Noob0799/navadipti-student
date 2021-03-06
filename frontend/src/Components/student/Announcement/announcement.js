import React, { Fragment } from 'react';
import Navbar from '../../navbar';
import Card from './card';
import Axios from 'axios';

class announcement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: '',
            data: [],
            open: false
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount() {
        Axios.get("/announcement/get")
            .then(res => {
                console.log(res.data.message, res.data.data);
                this.setState({
                    data: res.data.data,
                    token: 'announcementrecord'
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
                <Navbar token={this.state.token}/>
                {
                    this.state.data.map(obj => {
                        return (
                            <div key={obj._id}>
                                <Card obj={obj}/>
                            </div>
                        );
                    })
                }
            </Fragment>
        );
    }
}

export default announcement;
