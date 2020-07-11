import React, { Component } from "react";
import Product from "../../../../assets/product.png";
import { withRouter } from "react-router-dom";

import "./Tile.css";
class Tiles extends Component {
  constructor(props) {
    super(props);
    this.gotoProduct = this.gotoProduct.bind(this);
  }

  gotoProduct() {
    this.props.history.push("/home/buy/" + this.props.id);
  }
  render() {
    return (
      <div onClick={this.gotoProduct} className="tile">
        <img src={Product} className="image_holder" />
        <div className="title">{this.props.title}</div>
        <div className="price">
          <span>&#8377;</span>
          {this.props.price}
        </div>
      </div>
    );
  }
}

export default withRouter(Tiles);
