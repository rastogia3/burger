import React from 'react';
import Topbar from './Navigation/TopBar/TopBar';
import './Layout.css'
import SideDrawer from './Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
class Layout extends React.Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerClosedHandler = () => this.setState({ showSideDrawer: false });
  sideDrawerOpenHandler = () => this.setState({ showSideDrawer: true });

  render() {
    return (
      <div>
        <Topbar isAuthenticate={this.props.isAuthenticate} clicked={this.sideDrawerOpenHandler} />
        <SideDrawer
          isAuthenticate={this.props.isAuthenticate} Î
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }
}

const mapStateToProps = State => {
  return {
    isAuthenticate: State.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);