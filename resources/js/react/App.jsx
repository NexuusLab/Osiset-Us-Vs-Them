import React,{useState,useEffect} from "react"
import ReactDOM from "react-dom";
import { AppProvider, Frame } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppContext } from './Context'
import '../../../public/css/index.css';
import '../../../public/css/theme.css';
import '../../../public/css/usVsThem.css';
import '../../../public/css/tablePreview.css'
import {Dashboard,Templates} from "./Pages";



export default function App({ shop, host, apiKey }) {
    const config = { apiKey: apiKey, shopOrigin: shop, host: host, forceRedirect: true };
    const [activePage, setActivePage] = useState(1)
    const [selectedTemplate, setSelectedTemplate] = useState()
    const [templateUserId, setTemplateUserId] = useState()

    // const url = 'https://us-vs-them.test/api'
    // const url = 'https://osisetus.test/api'
    const url='https://phpstack-899954-3189251.cloudwaysapps.com/api';
    //  const url='https://usvsthemapp.com/api';

    // useEffect(() => {
    //     console.log('activePage: ', activePage);
    //     console.log('selectedTemplate: ', selectedTemplate);
    //     console.log('templateUserId: ', templateUserId);
    // }, [activePage, selectedTemplate, templateUserId])


    useEffect(() => {
        console.log('config: ', config);

    }, [config])
    return(
        <BrowserRouter>
                <AppProvider i18n={translations}>
                        <AppContext.Provider
                            value={{
                                activePage, setActivePage, selectedTemplate, setSelectedTemplate,
                                templateUserId, setTemplateUserId, url,config
                            }}>
                            <Frame>
                                <Switch>
                                    <Route exact path="/" component={Dashboard} />
                                    <Route path="/templates" component={Templates} />
                                    {/*<Route path="/locations" component={Locations} />*/}
                                    {/*<Route path="/settings" component={Settings} />*/}
                                </Switch>
                            </Frame>
                        </AppContext.Provider>

                </AppProvider>

        </BrowserRouter>
    );
}

let appElement = document.getElementById('root');
if (appElement) {
    ReactDOM.render(<App {...(appElement.dataset)} />, appElement);
}
