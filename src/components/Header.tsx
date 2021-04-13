import React, {Component} from "react";
import { Button } from "react-bootstrap";


interface HeaderProps {
    renderPosts: (value: string) => void;
    searchPosts: () => void;
    alertHello: (component: string) => void;
}
interface HeaderState{
    component: string;
}

export default class Header extends React.Component<HeaderProps, HeaderState>{
    constructor(props: HeaderProps){
        super(props);
        this.state = {
            component: "Header"
        }
    }

    componentDidUpdate(){
        this.props.alertHello(this.state.component);
    }

    render(){
        return(
            <div style={{height: "auto", top: 0, backgroundColor: "#88b893", width: "100vw", position: "absolute" }}>
            <div >
                <input placeholder={"Search users"} style={{fontWeight: 600, textAlign: "left", margin: 10, fontSize:"20px",float: "left", marginLeft: 25}} onChange={(e) => this.props.renderPosts(e.target.value)}>
                </input>
                <Button variant="primary" style={{float: "left", margin: 10}} onClick={() => this.props.searchPosts()}>Search</Button>
            </div>            
            </div>
        )
    }
}