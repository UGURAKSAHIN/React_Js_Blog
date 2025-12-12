import React from 'react';

import tr from "../assets/flag/Turkish.png"
import en from "../assets/flag/English.png"

import { withTranslation } from 'react-i18next';
import OtherLanguageServices from "./OtherLanguageServices";
import { Link } from 'react-router-dom';

function OtherLanguageReusability(props) {
    
    const internationalizationLanguage = language => {
        
        const { i18n } = props;
        
        i18n.changeLanguage(language);
 
        OtherLanguageServices.headerLanguageServices(language);
    }
    return (
        <React.Fragment>
            <div className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none">
                
                <Link className="" onClick={() => internationalizationLanguage('tr')}>
                    <img loading="lazy" src={tr} className="relative rounded-full w-6 h-6 me-3 transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" alt="TR" />
                </Link>

                
                <Link className="" onClick={() => internationalizationLanguage('en')}>
                    <img loading="lazy" src={en} className="relative rounded-full w-6 h-6 me-3 transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" alt="EN" />
                </Link>
            </div>

        </React.Fragment>
    ); 
} 
export default withTranslation()(OtherLanguageReusability)