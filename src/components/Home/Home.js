//library imports
import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//component imports
import Buy from "./components/Buy/Buy";
import "./Home.css";

import authorise from "../../Fetch/authorise";
import getbalance from "../../Fetch/Balance/getBalance";

import Product from "./components/Product/Product";
import Sell from "./components/Sell/Sell";
import AddProduct from "./components/AddProduct/AddProduct";
import QuotedPrices from "./components/QuotedPrices/QuotedPrices";
import getBalance from "../../Fetch/Balance/getBalance";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inSell: false,
      balance: 0,
    };
    this.gotoBuy = this.gotoBuy.bind(this);
    this.gotoSell = this.gotoSell.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.props.history.push("/home/buy");
    authorise()
      .then((res) => {
        getBalance().then((result) => {
          this.setState({ balance: result.balance });
        });
        console.log("Logged in");
      })
      .catch((err) => this.props.history.push("/"));
  }
  gotoSell() {
    this.setState({ inSell: true });
    this.props.history.push("/home/sell");
  }
  gotoBuy() {
    this.setState({ inSell: false });
    this.props.history.push("/home/buy");
  }
  logout() {
    fetch("http://localhost:9999/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      this.props.history.push("/");
    });
  }
  render() {
    return (
      <div className="home">
        <div className="container">
          <Switch>
            <Route exact path="/home/buy" component={Buy}></Route>
            <Route exact path="/home/sell" component={Sell}></Route>
            <Route exact path="/home/sell/add" component={AddProduct}></Route>
            <Route
              exact
              path="/home/sell/quotedprice"
              component={QuotedPrices}
            ></Route>
            <Route path="/home/buy/:id" component={Product}></Route>
          </Switch>
        </div>
        <div className="navbar">
          <div className="navbar__brand">OLX</div>
          <div className="navbar__options">
            You want to
            <button
              onClick={this.gotoBuy}
              className={`${this.state.inSell ? "" : "active"}`}
            >
              Buy
            </button>{" "}
            or
            <button
              onClick={this.gotoSell}
              className={`${!this.state.inSell ? "" : "active"}`}
            >
              Sell
            </button>
          </div>
          <div className="account">
            Balance: <span>&#8377;</span> {this.state.balance}
            <button onClick={this.logout}>Logout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
