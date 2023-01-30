import React, { useContext, useEffect, useState } from 'react'
import {Page, Layout, Card, MediaCard, Button, Loading, Link, Toast, Banner, List} from '@shopify/polaris';
import { AppContext } from '../Context'
import axios from "axios";
// import createApp from '@shopify/app-bridge/development';
// import { Redirect } from '@shopify/app-bridge/actions';


export function TemplatePage4() {
    const { setActivePage, setTemplateUserId, setSelectedTemplate, templatesCount,templateUserId, config, url } = useContext(AppContext);
    let host = config?.shopOrigin;
    // const app = createApp(config);
    // const redirect = Redirect.create(app);
    const [onlineStoreUrl, setOnlineStoreUrl] = useState()
    const [appEnable, setAppEnable] = useState(false)
    const [btnloading, setBtnLoading] = useState(false)
    const [appError, setAppError] = useState(true)
    const [loading, setLoading] = useState(false)
    const [appStatusToast, setAppStatusToast] = useState(false);



    const toggleToastAppStatus = () => {
        setAppStatusToast(false);
    }

    const toastAppStatus = appStatusToast ?
        (
            appEnable ?
                <Toast content="App Enabled" onDismiss={toggleToastAppStatus} duration={1500} /> :
                <Toast content="App Disabled" onDismiss={toggleToastAppStatus} duration={1500} />
        ) : null;

    // useEffect(() => {
    //     setActivePage(1)
    //     setSelectedTemplate()
    //     setTemplateUserId()
    // }, [])

    const getPlanData = async () => {
        const response = await axios
            .get(
                `${url}/check-trial?shop_name=${host}&user_template_id=${templateUserId}`
            )
            .then(res => {
                setAppEnable(res.data.result.app_status)
                setOnlineStoreUrl(res.data.result.link)
                setAppError(res.data.result.app_error)
                setLoading(false)

            })
            .catch(error =>
                alert('Error', error));
    }

    useEffect(() => {
        getPlanData();
    }, []);

    const handleAppStatus = async () => {
        setBtnLoading(true)
        let data = {
            status: !appEnable,
            shop_name: host,
        };
        try {
            const response = await axios.post(`${url}/enable-app`, data)
            setAppEnable(!appEnable)
            setBtnLoading(false)
            setAppStatusToast(true)
        } catch (error) {
            alert('Error', error);
            setBtnLoading(false)
        }
    }

    const handleAppLocation = () => {
        // if (!templatesCount) {
        //     redirect.dispatch(Redirect.Action.APP, {
        //         path: `/`,
        //     })
        // }
        // redirect.dispatch(Redirect.Action.APP, {
        //     path: `/`,
        // })

    }

    return (
        <div className='Template-Page4'>
            {loading ? <Loading /> :
                <Page fullWidth>
                    <Layout>
                        <Layout.Section fullWidth>
                            {/*<Card sectioned>*/}

                            {/*    <h5>Display the Tables on your Product Page</h5>*/}
                            {/*    <p>*/}
                            {/*        If your theme uses the Online Store 2.0 system, you can add the Us vs Them app block and place the tables on the product page*/}
                            {/*    </p>*/}
                            {/*    <br />*/}


                            {/*    <a href={onlineStoreUrl} target='_blank'>*/}
                            {/*        <Button>Go to App Embed</Button>*/}
                            {/*    </a>*/}

                            {/*</Card>*/}

                            {!appEnable &&
                                <div className='App-Banner template-page-4'>
                                    {appError ?
                                        <Banner
                                            title="Your Store is Password Protected"
                                            status="warning"
                                            // onDismiss={() => setAppEnable(true)}
                                        >

                                            <p> {`Go to Sales Channel : → Online Store : → Preferences and remove the password`} </p>
                                            <br/>
                                            <div className='Polaris-Banner__Actions'>

                                                <a href={onlineStoreUrl} target='_blank'>
                                                    <Button primary>
                                                        Go to password page
                                                    </Button>
                                                </a>
                                            </div>
                                        </Banner>
                                        :
                                        <Banner
                                            title="Your Us vs Them Widget was created. Now install the forms theme app embed."
                                            status="warning"
                                            onDismiss={() => setAppEnable(true)}
                                        >

                                            <p> In order for your widgets to work on your storefront, go to your
                                                    online store editor
                                                    and turn on the forms theme app embed.</p>

                                            <br/>

                                            <div className='Polaris-Banner__Actions'>
                                                <a href={onlineStoreUrl} target='_blank'>
                                                    <Button primary>
                                                        Go to online store
                                                    </Button>
                                                </a>
                                            </div>
                                        </Banner>
                                    }

                                </div>

                            }
                        </Layout.Section>

                        <Layout.Section fullWidth>
                            {/*<div className='LastStep-MediaCard'>*/}
                            {/*    <MediaCard*/}
                            {/*        title="Last Step: Activate the app !"*/}
                            {/*        primaryAction={{*/}
                            {/*            content: appEnable ? 'Disable the app' : 'Enable the app',*/}
                            {/*            disabled: btnloading ? true : false,*/}
                            {/*            primary: true,*/}
                            {/*            onAction: handleAppStatus,*/}
                            {/*        }}*/}
                            {/*        description={`You just have one more step to activate your application, you just have to click on the button below!`}*/}

                            {/*    >*/}
                            {/*        <img*/}
                            {/*            alt="table1"*/}
                            {/*            className='MediaCard-Img'*/}
                            {/*            src="https://i.ibb.co/QXcJW8V/image.png"*/}
                            {/*        />*/}
                            {/*    </MediaCard>*/}
                            {/*</div>*/}

                            <div className='Additional-Tips-Section'>
                                <h3>Additional Tips:</h3>

                                <MediaCard
                                    title="Add an app block"
                                    description={`Using the theme customizer for your published theme, navigate to the template for product pages.
                                Use the block list navigator to add a new block and add the Us vs Them Block.`}
                                >
                                    <img
                                        alt="table1"
                                        className='MediaCard-Img'
                                        src="https://i.ibb.co/FmKQLvg/image-1.png"
                                    />
                                </MediaCard>


                                <MediaCard
                                    title="Reorder an app block"
                                    description={`Hover over the app block you want to move and grab the grid icon. you can drag and drop to re-order the block.`}
                                >
                                    <img
                                        alt="table1"
                                        className='MediaCard-Img'
                                        src="https://i.ibb.co/FmKQLvg/image-1.png"
                                    />
                                </MediaCard>

                            </div>
                        </Layout.Section>

                        <Layout.Section fullWidth>
                            <div className='GoTo-App-Btn'>
                                <Link url={`/?shop=${config.shopOrigin}&host=${config.host}`}>
                                    <Button primary onClick={handleAppLocation}>Go to app</Button>
                                </Link>
                            </div>
                        </Layout.Section>

                    </Layout>
                    {toastAppStatus}
                </Page>
            }
        </div>
    )
}
