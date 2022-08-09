import React, { Component } from "react";
import logo from "../new-logo-text-horizontal.PNG";

class NavBar extends Component {
    state = {};
    render() {
        return (
            <nav class="navbar navbar-expand-md navbar-light bg-white rounded">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img
                            style={{ borderRadius: "10%" }}
                            src={logo}
                            alt=""
                            width="150"
                            class="d-inline-block align-text-top"
                        />
                    </a>

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Manage
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Create
                            </a>
                        </li>
                    </ul>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        );
    }
}

export default NavBar;
