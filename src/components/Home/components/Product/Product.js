import React, { Component } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

import ProductImage from "../../../../assets/product.png";
import getOneProduct from "../../../../Fetch/getOneProduct";
import AddBid from "../../../../Fetch/Bidding/AddBid";

import "./Product.css";

class Product extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      isInputOpen: false,
      item: null,
    };

    this.price = React.createRef(null);

    this.closeInput = this.closeInput.bind(this);
    this.openInput = this.openInput.bind(this);
    this.addbid = this.addbid.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id)
      getOneProduct(this.props.match.params.id)
        .then((res) => this.setState({ item: res }))
        .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    console.log("product is ", this.state.item);
  }

  openInput() {
    this.setState({
      isInputOpen: true,
    });
  }
  closeInput() {
    this.setState({
      isInputOpen: false,
    });
  }

  addbid() {
    const price = this.price.current.value;
    AddBid(price, this.state.item._id, this.state.item.email)
      .then((result) => {
        alert("Bid added");
        this.props.history.push("/home/buy");
      })
      .catch((err) => alert("Error occured"));
  }
  render() {
    return (
      <div className="product_page">
        <div className="image_rating">
          <img src={ProductImage} />
          <div className="rating_holder">
            <AiOutlineStar size={30} />
            <AiOutlineStar size={30} />
            <AiOutlineStar size={30} />
            <AiOutlineStar size={15} />
            <AiOutlineStar size={15} />
          </div>
        </div>
        <div className="product_details">
          <div className="title">
            {this.state.item && this.state.item.title}
          </div>
          <div className="title">
            {this.state.item && this.state.item.category}
          </div>
          <div className="description">
            {this.state.item && this.state.item.description}
          </div>
          <div className="price_bargain">
            <div>
              <span>&#8377;</span>
              {this.state.item && this.state.item.price}
            </div>
            <div className="bargain">
              <button
                onClick={this.openInput}
                className="quote_price"
                style={{
                  transform: `translateX(${
                    this.state.isInputOpen ? "100%" : "0"
                  })`,
                }}
              >
                Quote your price
              </button>
              <div
                className="input_holder"
                style={{
                  transform: `translateX(${
                    !this.state.isInputOpen ? "-100%" : "0"
                  })`,
                }}
              >
                <input
                  ref={this.price}
                  type="number"
                  placeholder="Enter your price"
                ></input>
                <div onClick={this.addbid} className="ok">
                  <MdDone />
                </div>
                <div onClick={this.closeInput} className="cancel">
                  <TiCancel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
