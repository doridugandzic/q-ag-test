import React, { Component } from "react";
import Posts from "./Posts";

interface TableProps {
    posts: any[];
    searchUpdate: boolean;
    searchUpdateReset: () => void;
    alertHello: (component: string) => void;
}
interface TableState {
    currentPage: number;
    totalPages: number;
    postsPerPage: number;
    component: string;
}

const INIT_STATE: TableState = {
    currentPage: 1,
    totalPages: 1,
    postsPerPage: 10,
    component: "Content Table"
}

export default class ContentTable extends React.Component<TableProps, TableState>{
    constructor(props: TableProps){
        super(props);
        this.state = {
            ...INIT_STATE
        }
    }

    componentDidMount(){
        if(this.props.posts){
            this.setState({totalPages: Math.ceil(this.props.posts.length/this.state.postsPerPage)});
        }        
        this.props.alertHello(this.state.component);
    }

    componentDidUpdate(){
        if(this.props.searchUpdate){
            this.props.searchUpdateReset();
            this.setState({currentPage: 1})
        }
    }

    componentWillReceiveProps(nextProps: any){
        this.setState({totalPages: Math.ceil(nextProps.posts.length/this.state.postsPerPage)})
    }

    paginate(number: number){
        this.setState({currentPage: number})
    }

    

    pagination(){
        const pageNumbers = [];
        for(let i = 0; i < this.state.totalPages; i++){
            pageNumbers.push(i+1);
        }
        return (
            <nav>
              <ul className='pagination'>
                {pageNumbers.map(number => (
                  <li key={number} className={`page-item ${this.state.currentPage == number ? "active" : ""}`}>
                    <a onClick={() => this.paginate(number)} href='!#' className='page-link'>
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          );
    }

    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.props.posts.slice(indexOfFirstPost, indexOfLastPost);

        return (

        <div style={{marginTop: 50}}>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
                {currentPosts.map((post: any) => {
                    return <Posts post={post} alertHello={(component) => this.props.alertHello(component)}/>
                })}
            </div>
            <div style={{display: "inline-flex"}}>{this.pagination()}</div>
        </div>
            
        )

    }
}