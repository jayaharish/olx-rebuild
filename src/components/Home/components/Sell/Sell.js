import React, { Component } from "react";
import Tile from "../Tiles/Tiles";
import { IoMdAdd } from "react-icons/io";
import "./Sell.css";
import getUserProduct from "../../../../Fetch/getUserProduct";

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
    };
    this.addProduct = this.addProduct.bind(this);
    this.quotedPrice = this.quotedPrice.bind(this);
  }
  componentDidMount() {
    getUserProduct()
      .then((result) => this.setState({ items: result }))
      .catch((err) => this.props.history.push("/"));
  }
  addProduct() {
    this.props.history.push("/home/sell/add");
  }
  quotedPrice() {
    this.props.history.push("/home/sell/quotedprice");
  }

  render() {
    return (
      <div className="sell">
        <div className="sell_header">
          <div className="sell_header_text">Your ads</div>
          <button onClick={this.quotedPrice} className="look_bargains">
            Check quoted prices
          </button>
        </div>

        <div className="products_holder">
          <div className="add" onClick={this.addProduct}>
            <IoMdAdd size={60} />
            <div className="add_text">Add product</div>
          </div>
          {this.state.items &&
            this.state.items.map((item, index) => (
              <Tile
                key={index}
                id={item._id}
                price={item.price}
                description={item.description}
                title={item.title}
              ></Tile>
            ))}
        </div>
      </div>
    );
  }
}

export default Sell;
