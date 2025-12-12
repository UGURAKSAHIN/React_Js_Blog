
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

let newDateYear = () => {
  return new Date().getFullYear();
};


class FooterComponent extends Component {
  
  static displayName = 'Footer';

  
  constructor(props) {
    super(props);

    
    this.state = {};

    this.newDate = this.newDate.bind(this);
  } 


  newDate() {
    return new Date().getFullYear();
  }

  render() {

    let footerTopSide = (
      <section className="d-flex mt-5 justify-content-center justify-content-lg-between p-4">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="blog/src/component/main/Footer" className="me-4 link-secondary">
            <i className="text-primary fab fa-facebook-f"></i>
          </a>
          <a href="blog/src/component/main/Footer" className="me-4 link-secondary">
            <i className="text-warning fab fa-twitter"></i>
          </a>
          <a href="blog/src/component/main/Footer" className="me-4 link-secondary">
            <i className="text-primary  text-primary  fab fa-google"></i>
          </a>
        </div>
      </section>
    );

    
    let footerLeftSide = (
      <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
        <h6 className="text-uppercase fw-bold mb-4">{this.props.t('contact')}</h6>
        <p>
          <i className="fas fa-home me-3 text-secondary"></i> Istanbul, TUR 34104
        </p>
        <p>
          <i className="fas fa-envelope me-3 text-secondary"></i>
          uguraksahinn@hotmail.com
        </p>
        <p>
          <i className="fas fa-phone me-3 text-secondary"></i> +90 538 819 26 04
        </p>
      </div>
    );

    
    let footerMiddleSide = (
      <div className="col-md-2 col-lg-2 col-xl-4 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold mb-4">
          <i className="fas fa-gem me-3 text-secondary"></i>
        </h6>
        <p>This React.js application is developed with modern UI/UX principles, reusable components,
          clean architecture, and optimized API integration. My goal is to build scalable 
          and maintainable front-end applications.
        </p>
      </div>
    );

    const footerRightSide = <div className="col-md-6 col-lg-6 col-xl mx-auto mb-4"></div>;

    return (
      <React.Fragment>
        <footer
          className=" bg-dark App-header44 text-center text-white fixed-bottom44"
          style={{ marginTop: '20rem' }}
        >
          {footerTopSide}

          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                {footerLeftSide}
                {footerMiddleSide}
                {footerRightSide}
              </div>
            </div>
          </section>
          
          <div
            className="text-center p-4"
            style={{ backgroundColor: 'rgba(132, 154, 80, 0.03)!important' }}
          >
            {newDateYear()} {this.props.copy}
          </div>
        </footer>
      </React.Fragment>
    );
  }
} 

export default withTranslation()(FooterComponent);