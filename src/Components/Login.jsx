import React from 'react';

export default class LoginView extends React.Component {
  render() {
    return (
      <div>
        <p className="logo">
          <img src="content/images/logo-64.png"></img>
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
