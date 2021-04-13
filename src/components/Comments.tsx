import React, {Component} from "react";
import { ModalBody } from "react-bootstrap";

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface CommentsProps {
    comment: Comment;
    index: number;
}
interface CommentsState{
    userData: {};
}

export default class Comments extends React.Component<CommentsProps, CommentsState>{
    constructor(props: CommentsProps){
        super(props);
    }

    render(){

        const {
            postId,
            id,
            name,
            email,
            body
        } = this.props.comment;
        
        return(
            <div style={{backgroundColor: (this.props.index%2===0) ? "#b3b3b3" : "#e8e8e8", borderRadius: 8, margin: 10, padding: 10}}>
                <div style={{paddingBottom: 1, fontWeight: 600}}>{email} - {name}</div>
                <br/>
                <div style={{paddingBottom: 20}}>{body}</div>
            </div>
        )
    }
}