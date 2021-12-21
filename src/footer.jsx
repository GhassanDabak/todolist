import React from 'react'
import './footer.css'

function Footer() {
    return (
        <footer>
            <div className="connect-with-us">
                <a href="https://linkedin.com/"  ><i
                    className="fab fa-linkedin-in"></i></a>
                <a href="https://github.com/"><i
                    className="fab fa-github-alt"></i></a>
                <a href="https://twitter.com/" ><i
                    className="fab fa-twitter"></i></a>
            </div>
            <div className="copyright">
                <p>Copyright ©2021 All rights reserved | This website is powered by</p>
                <span><h2 className="rainbow-text">3 musketeers </h2></span>
            </div>
        </footer>
    )
}

export default Footer
