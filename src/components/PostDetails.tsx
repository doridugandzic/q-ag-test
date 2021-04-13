import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import Comments from "./Comments";
import { User } from "./Posts";


interface PostDetailsProps {
    show: boolean;
    post: any;
    comments: any[];
    user: User;
    handleCloseModal: () => void;
    alertHello: (component: string) => void;
}

interface PostDetailsState {
    component: string;
}



export default class PostDetails extends React.Component<PostDetailsProps, PostDetailsState>{
    constructor(props: PostDetailsProps) {
        super(props);
        this.state = {
            component: "Post Details"
        }
    }

    componentDidMount(){
        this.props.alertHello(this.state.component);
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} size={"xl"} onHide={() => this.props.handleCloseModal()}>
                    <ModalBody style={{padding:25, fontSize: "1.5em", fontWeight: 550}}>{this.props.user.name}</ModalBody>
                    <ModalBody style={{padding:25}}>{this.props.post.title}{this.props.post.body}</ModalBody>
                    <ModalBody>{this.props.comments.map((comment: any, index: number) => {
                        return <Comments comment={comment} index={index}/>
                    })}</ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={() => this.props.handleCloseModal()}>
                            Close
                    </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}