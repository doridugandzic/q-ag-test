import './App.css';
import Header from "./components/Header";
import ContentTable from "./components/ContentTable";
import React from 'react';
import { User } from './components/Posts';



interface AppProps {

}
interface AppState {
  postArray: Post[];
  loading: boolean;
  searchVal: string;
  searchUpdate: boolean;
}

const INIT_STATE: AppState = {
  postArray: [],
  loading: true,
  searchVal: "",
  searchUpdate: false
}

export interface Post {
  title: string;
  body: string;
  userId: number;
  id: number;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      ...INIT_STATE
    }
  }



  async componentDidMount() {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const data = await response.json();
    await this.setState({ postArray: data, loading: false })
  }

  renderPosts(value: string) {
    this.setState({ searchVal: value })
  };

  alertHello(component: string){
    console.log("Hello from", component)
  }

  async searchPosts() {
    let userResponse = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const data = await userResponse.json();
    let result = data.map((a: User) => a.name);
    const filtered = data.filter((a: User) => a.name?.toLowerCase().includes(this.state.searchVal));
    let userPostArray: any = [];
    for (let i = 0; i < filtered.length; i++) {
      let userPosts = await fetch(`https://jsonplaceholder.typicode.com/users/${filtered[i].id}/posts`)
      const data = await userPosts.json();
      userPostArray = userPostArray.concat(data);
    }
    await this.setState({ postArray: userPostArray, searchUpdate: true })
  }

  render() {
    const {
      postArray,
      loading
    } = this.state;


    return (
      <div className="App">
        <header className="App-header">
          <Header renderPosts={(value) => this.renderPosts(value)} searchPosts={() => this.searchPosts()} alertHello={(component) => this.alertHello(component)}/>
          {loading ? "" : <ContentTable posts={postArray} searchUpdate={this.state.searchUpdate} searchUpdateReset={() => this.setState({ searchUpdate: false })} alertHello={(component) => this.alertHello(component)}/>}
        </header>
      </div>
    );
  }
}
