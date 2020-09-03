import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { logout } from "../actions/logout"
import Header from "./header"
import Footer from "./footer"
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

const Layout = ({ children, fullWidth, isAuthenticated, logout }) => {
  return (
    <div className="site">
      <Header  logout={logout} isAuthenticated={isAuthenticated}/>
        <div className="container-fluid main">
          <div className="row">
            <div
              className={fullWidth ? "col-12 mx-auto" : "col-9 my-4 mx-auto"}
            >
              <main className={fullWidth ? "" : "content mx-auto"}>{children}</main>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool
}

Layout.defaultProps = {
  children: null,
  fullWidth: false
}

function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated } = auth

  return {
    isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)