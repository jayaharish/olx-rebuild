import React, { Component } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import getProducts from "../../../../Fetch/getAllProducts";

import Tile from "../Tiles/Tiles";
import "./Buy.css";
class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      filterText: null,
    };
    this.filterQuery = React.createRef(null);
    this.changeFilter = this.changeFilter.bind(this);
  }
  componentDidMount() {
    getProducts()
      .then((result) => {
        console.log(result);
        this.setState({ items: result });
      })
      .catch((err) => console.log(err));
  }
  changeFilter() {
    this.setState({
      filterText: this.filterQuery.current.value,
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="searchbar_holder">
          <input
            ref={this.filterQuery}
            onChange={this.changeFilter}
            type="text"
            placeholder="Enter product name"
          ></input>
          <button>
            <AiOutlineSearch />
          </button>
        </div>
        <div className="products_holder">
          {this.state.items &&
            Array.from(this.state.items)
              .filter((item) => {
                const title = item.title;
                const category = item.category;
                const description = item.description;
                const regex = new RegExp(
                  `${this.state.filterText ? this.state.filterText : ""}`,
                  "g"
                );
                console.log(title, regex);
                return (
                  regex.test(title) ||
                  regex.test(category) ||
                  regex.test(description)
                );
              })
              .map((item, index) => (
                <Tile
                  key={index}
                  id={item._id}
                  price={item.price}
                  description={item.description}
                  title={item.title}
                />
              ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Buy;
