import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import cn from "classnames";
import "./style.css";
import { ChangePassword, Logout } from '../../containers';
import { actions } from '../../../state-management';
import NewFolder from '../NewFolder';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  changePassword = async (data) => {
    await this.props.changePasswordRequest(data);
  };
  createDirectory = async (data) => {
    await this.props.createDirectory(data);
  };

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Row className="holder">
        <Col span={4} className={cn("header__logo", {
          "flex-start": isLoggedIn,
          "flex-center": !isLoggedIn
        })}>
          Woden
        </Col>
        {
          isLoggedIn && (
            <>
              <Col span={1} offset={13} className="flex-end">
                <NewFolder onFinish={this.createDirectory}/>
              </Col>
              <Col span={1} offset={13} className="flex-end">
                <ChangePassword onFinish={this.changePassword}/>
              </Col>
              <Col span={6} className="flex-end">
                <Logout/>
              </Col>
            </>
          )
        }
      </Row>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }),
  { changePasswordRequest: actions.changePasswordRequest, createDirectory: actions.createDirectory }
)(Header);