import React from 'react';
import logo from '../../content/images/logo-64.png';

export default class LoginView extends React.Component {
  render() {// eslint-disable-line
    return (
      <div>
        <p className="logo">
          <img src={logo}></img>
          <span>Infor CRM</span>
        </p>
        <div className="panel-content">
          <h2>Details</h2>
          <fieldset>
            <a name="username"></a>
            <div className="row row-edit" data-field-type="text">

            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}
