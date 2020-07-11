import React, { Component } from "react";
import getAllBids from "../../../../Fetch/Bidding/GetAll";
import getProduct from "../../../../Fetch/getOneProduct";
import reduceBalance from "../../../../Fetch/Balance/removeBalance";
import addBalance from "../../../../Fetch/Balance/addBalance";
import removeBid from "../../../../Fetch/Bidding/RemoveBid";
import removeProduct from "../../../../Fetch/removeProduct";
import RejectBid from "../../../../Fetch/Bidding/RejectBid";
import "./QuotedPrices.css";
class QuotedPrices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bids: [],
    };
    this.acceptBid = this.acceptBid.bind(this);
    this.rejectBid = this.rejectBid.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  acceptBid(bidId, productId, bid, buyer) {
    reduceBalance(bid, buyer)
      .then((result) => {
        return addBalance(bid);
      })
      .then((result) => {
        return removeBid(productId, buyer);
      })
      .then((result) => {
        return removeProduct(productId);
      })
      .catch((err) => console.log(err));
    this.loadData();
  }
  rejectBid(bidId, buyer) {
    RejectBid(bidId, buyer)
      .then((result) => console.log(result))
      .catch((err) => this.props.history.push("/"));
    this.loadData();
  }
  loadData() {
    this.setState({ bids: [] });
    getAllBids()
      .then((result) => {
        console.log("bids", result);
        let items = [];
        result.map((item) => {
          getProduct(item.ref)
            .then((record) => {
              this.setState({
                bids: [
                  ...this.state.bids,
                  {
                    bid: item.amount,
                    amount: record.price,
                    title: record.title,
                    bidId: item._id,
                    productId: record._id,
                    buyer: item.email,
                  },
                ],
              });
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    console.log(this.state.bids);
  }

  render() {
    return (
      <div className="quoted_price">
        <table>
          <tr>
            <th>Product Title</th>
            <th>Your price</th>
            <th>Quoted price</th>
            <th>Accept</th>
            <th>Reject</th>
          </tr>
          {this.state.bids.map((bid) => (
            <tr>
              <td>{bid.title}</td>
              <td>{bid.amount}</td>
              <td>{bid.bid}</td>
              <td>
                <button
                  onClick={() => {
                    this.acceptBid(
                      bid.bidId,
                      bid.productId,
                      bid.bid,
                      bid.buyer
                    );
                  }}
                >
                  Accept
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    this.rejectBid(bid.bidId, bid.buyer);
                  }}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default QuotedPrices;
