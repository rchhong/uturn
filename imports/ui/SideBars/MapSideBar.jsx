import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor';

export default class MapSideBar extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data : [],
        }
    }
    componentDidMount()
    {
        this.tick();
        this.timer = setInterval(() => this.tick(), 5000);
    }
    tick()
    {
        var self = this;
        Meteor.call('orders.findNearMe', this.props.centerLat, this.props.centerLng, (err, res) => {
            if(err)
            {
                alert(err);
            }
            else
            {
                //console.log(res);
                self.setState({data : res});
            }
        })
    }
    componentWillUnmount()
    { 
        clearInterval(this.timer);
    }
    render()
    {
        return(
            <div id='map-side-bar-container' style = {{width : "30%", 
            height: "90vh", position: "absolute", zIndex: 1000000000, 
            right: 0, textAlign : "right", marginRight : "20px", backgroundColor:'rgba(255,255,255,0.5)'}}>
                <h1 style={{textAlign:'center'}}>NEARBY REQUESTS</h1>
                <div style={{textAlign:'center'}}>________________</div>
                {this.state.data !== [] && this.state.data.map((order, index) => {
                    return (
                    <div id='wrapper' key = {index}>
                        <div>{"lat: " + order.location.lat}</div>
                    </div>
                    );
                })}
            </div>
        );
    }
}