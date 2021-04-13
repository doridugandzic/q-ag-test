import React, {Component} from "react";
import PostDetails from "./PostDetails";


interface PostProps {
    post: any;
    alertHello: (component: string) => void;
}
interface PostState{
    modalOpen: boolean;
    postData: any;
    postComments: any[];
    user: User;
    component: string;
}

export interface User{
    id?: number,
    name?: string,
    userName?: string,
    email?: string,
    address?: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo : {
            lat: string,
            lng: string
        }
    }
    phone?: string,
    website?: string,
    company?: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}


export default class Post extends React.Component<PostProps, PostState>{
    constructor(props: PostProps){
        super(props);
        this.state = {
            modalOpen: false,
            postData: "",
            postComments: [],
            user: {},
            component: "Posts"
        }
    }

    async componentDidMount(){
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.post.id}/comments`);
        const data = await response.json();        
        await this.setState({postComments: data});
        this.props.alertHello(this.state.component);
    }


    async getUserData(){
        await this.setState({postData: this.props.post})
        let responseUser = await fetch(`https://jsonplaceholder.typicode.com/users/${this.state.postData.userId}`);
        const dataUser = await responseUser.json();        
        this.setState({user: dataUser});
        this.setState({modalOpen: true});
    }

    closePostDetails(){
        this.setState({modalOpen: false});
    }

    
   render(){
    

    const {
        userId,
        id,
        body,
        title
    } = this.props.post;


       return(
           <div>
               <div style={{height: "auto", width: "15vw", overflow: "auto", lineBreak: "strict", padding: "25px", border: "1px solid white", color: "white", display: "block", margin: 25}}
                onClick={() => this.getUserData()} className={"post-body"}>
               <div style={{fontSize: 24, padding: "10px", lineHeight: "1em" }}>
                   {title}
               </div>
               <div style={{fontSize: 14}}>
                   {body}
               </div>
           </div>
               <PostDetails 
                show={this.state.modalOpen} 
                user={this.state.user} 
                post={this.state.postData} 
                comments={this.state.postComments} 
                handleCloseModal={() => this.closePostDetails()}
                alertHello={(component) => this.props.alertHello(component)}/>
           </div>
           
       )
   }
}