import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl'
import {store} from "reducers/index";
import useLocale from 'hooks/useLocale'
import { messages } from 'i18n/messages';
import { LOCALES } from 'i18n/locales';

import "apis/fiebase"

import HeaderC from 'components/HeadComponent/HeaderC';
import FooterC from 'components/FootComponent/FooterC';
import ContentC from 'Pages/index'

import { Layout} from 'antd';
import 'assets/scss/main.scss';

const defaultLocale = LOCALES.EN;

function ProviderContainer(props) {
    const {local} = useLocale();
    return (<IntlProvider messages={messages[local]} locale={local} defaultLocale={defaultLocale}>
                    <BrowserRouter>{props.children}</BrowserRouter>
            </IntlProvider>)
}

function App() {
    return (
        <Provider store={store}>
            <ProviderContainer>
                <Layout className="wrapper">
                    <HeaderC/>
                    <ContentC/>
                    <FooterC/>
                </Layout>
            </ProviderContainer>
        </Provider>
    )
}

export default App;
