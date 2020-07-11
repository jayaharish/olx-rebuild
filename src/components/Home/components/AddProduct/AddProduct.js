import React, { Component } from "react";
import authorise from "../../../../Fetch/authorise";
import insertProduct from "../../../../Fetch/insertProduct";

import "./AddProduct.css";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef(null);
    this.description = React.createRef(null);
    this.price = React.createRef(null);
    this.category = React.createRef(null);
    this.insert = this.insert.bind(this);
  }
  componentDidMount() {
    authorise()
      .then((res) => {
        console.log("verified");
      })
      .catch((err) => this.props.history.push("/"));
  }

  insert() {
    insertProduct(
      this.title.current.value,
      this.description.current.value,
      this.price.current.value,
      this.category.current.value
    )
      .then((res) => this.props.history.push("/home/sell"))
      .catch((err) => this.props.history.push("/"));
  }
  render() {
    return (
      <div className="add_product">
        <label htmlFor="title">Title</label>
        <input
          ref={this.title}
          placeholder="Enter your title"
          id="title"
          type="text"
          name="title"
        />
        <label htmlFor="category">Category</label>
        <input
          ref={this.category}
          placeholder="Enter your title"
          id="category"
          type="text"
          name="title"
        />
        <label htmlFor="description">Description</label>
        <textarea
          ref={this.description}
          placeholder="Write short description"
          id="description"
          type="text"
          name="description"
        ></textarea>
        <label htmlFor="price">Price</label>
        <input
          ref={this.price}
          placeholder="Quote your price"
          id="price"
          type="number"
          name="price"
        />
        <button onClick={this.insert} type="sumbit">
          Add Product
        </button>
      </div>
    );
  }
}

export default AddProduct;
