// REACT
import React from 'react';

// I18N
import {withTranslation} from 'react-i18next';

// COMPONENTS
import HeaderComponent from '../components/HeaderComponent';
import MainComponent from '../components/MainComponent';
import FooterComponent from '../components/FooterComponent';

// ROUTER
import {Route, Routes} from 'react-router-dom';
import BlogCategoryManagement from '../components/blog_category/blog_category_management';


// ROUTER APP COMPONENT
function RouterApp() {
    return (
        <React.Fragment>
            {/* HEADER */}
            <HeaderComponent logo="fa-solid fa-blog"/>

            {/* MAIN */}
            {/* <MainComponent /> */}
            <Routes>
                {/* Root Path */}
                <Route path={'/'} element={<MainComponent/>}/>
                <Route path={'/index'} element={<MainComponent/>}/>
                <Route path={'*'} element={<MainComponent/>}/>

                <Route path="/blog/category/list" element={<BlogCategoryManagement/>}/>
            </Routes>

            {/* FOOTER */}
            <FooterComponent copy="&copy; All rights reserved."/>
        </React.Fragment>
    );
}

// HOC withTranslation
export default withTranslation()(RouterApp);
