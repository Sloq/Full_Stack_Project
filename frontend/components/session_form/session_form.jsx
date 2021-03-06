import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      profile_pic: "https://res.cloudinary.com/cloudmccloud/image/upload/v1500498267/BetterBooks/003-book-2_iefo3g.png"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm({user});
  }

  handleClick(e) {
    e.preventDefault();
    const user = {
      username: "Guest",
      password: "guest123456"
    };
    this.props.login({user});
  }

  navLink() {
    if (this.props.formType === 'login') {
      return <Link to="/signup">Sign Up</Link>;
    } else {
      return <Link to="/login">Log In</Link>;
    }
  }

  emailField() {
    if (this.props.formType === 'signup') {
      return (
          <div className="login-field">
            Email
            <br/>
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              className="login-input"
            />
          </div>
        );
    }
  }

  renderErrors() {
    if (this.props.errors) {
      const errz = this.props.errors.join(", ");
      return(
        <p>{errz}</p>
      );
    }
  }

  loginHeader() {
    let logOrSign;
    if (this.props.formType === "login") {
      logOrSign = "Log In";
    } else {
      logOrSign = "Sign In";
    }
    return(
      <div className="sign-in-header">
        Please {logOrSign} or {this.navLink()}
      </div>
    );
  }

  render() {
    return (
      <div className="login-background">

        <div className="login-form-container">

          <div className='pic-div'>
            <img src="https://res.cloudinary.com/cloudmccloud/image/upload/v1500498258/BetterBooks/koala_kygmbi.png" alt="Koala Mascot"/>
          </div>

          {this.loginHeader()}

          <form onSubmit={this.handleSubmit} className="login-form-box">

            <div className="login-form">
              <div className="errors">
                {this.renderErrors()}
              </div>

              <div className="login-field">
                Username
                <br/>
                <input type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                  className="login-input"
                />
              </div>

              {this.emailField()}

              <div className="login-field">
                Password
                <br/>
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  className="login-input"
                />
              </div>

              <div className="login-field">
                <button
                  className="log-in-button">
                  {this.props.formType === "signup" ? "Sign Up" : "Log In"}
                </button>

                <button
                  className="log-in-button"
                  onClick={ this.handleClick }>
                  Guest Sign In
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
