import React from "react";
import checkUser from "../../Fetch/checkuser";
import "./Signin.css";
import authorise from "../../Fetch/authorise";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.signin = this.signin.bind(this);
    this.email = React.createRef(null);
    this.password = React.createRef(null);
  }

  componentDidMount() {
    authorise()
      .then((result) => this.props.history.push("/home/buy"))
      .catch((err) => console.log("Not logged in"));
  }

  signin() {
    checkUser(this.email.current.value, this.password.current.value)
      .then((res) => {
        if (res) this.props.history.push("/home");
        console.log(res);
      })
      .catch((err) => console.log("try after some time"));
  }

  render() {
    return (
      <div className="signin_page">
        <div className="signin_page__section">
          <div className="signin_page__form_holder">
            <div className="signin_page__form_holder__input_holder">
              <input ref={this.email} className="input" type="email"></input>
              <div className="placeholder">EMAIL</div>
            </div>
            <div className="signin_page__form_holder__input_holder">
              <input
                ref={this.password}
                className="input"
                type="password"
              ></input>
              <div className="placeholder">PASSWORD</div>
            </div>
            <input
              onClick={this.signin}
              className="submit"
              type="submit"
              value="Sign in"
            ></input>
          </div>
          <div className="signin_page__about_holder">
            <div className="about_content">Leading market place</div>
            <div className="about_content_sub">
              Try OLX to instantly sell or buy goods with ease.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
