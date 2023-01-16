import React, { useContext, useState, useEffect } from 'react'
import { Page, Layout, Card, Icon, Stack, Button } from '@shopify/polaris';
import { MobileMajor, DesktopMajor } from '@shopify/polaris-icons';
import axios from "axios";
import { AppContext } from '../Context'
import { Table11, Table22, Table33, Table44 } from './index'


export function TemplatePage2() {
  const { setActivePage, templateUserId, setTemplateUserId, setSelectedTemplate, url,config } = useContext(AppContext);

    let host = config?.shopOrigin;
  const [btnloading, setBtnLoading] = useState(false)
  const [screen, setScreen] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
  })

  const handleScreenSelection = (id) => {
    setScreen({ ...screen, [id]: !screen[id] })
  }

  const handleSelectTemplate = async (templateId) => {
    setBtnLoading((prev) => {
      let toggleId;
      if (prev[templateId]) {
        toggleId = { [templateId]: false };
      } else {
        toggleId = { [templateId]: true };
      }
      return { ...toggleId };
    });

    const response = await axios
      .post(
        `${url}/step-1?template_id=${templateId}&user_template_id=${templateUserId}&shop_name=${host}`
      )
      .then(res => {
        setBtnLoading(false)
        setSelectedTemplate(templateId)
        setTemplateUserId(res.data.result.user_template_id)
        setActivePage(3)
      })
      .catch(error => {
        alert('Error: ', error)
        setBtnLoading(false)
      });

  }

    useEffect(() => {
        document.documentElement.style.setProperty('--template1-row-bg-odd-color', '#ffffff');
        document.documentElement.style.setProperty('--template1-row-bg-even-color', '#EBECF0');
        document.documentElement.style.setProperty('--template2-row-bg-odd-color', '#EBECF0');
        document.documentElement.style.setProperty('--template2-row-bg-even-color', '#ffffff');
        document.documentElement.style.setProperty('--template3-brand-bg-color', '#51AE58');
        document.documentElement.style.setProperty('--template3-competitor-bg-color', '#E5E5E5');
        document.documentElement.style.setProperty('--template4-odd-column-bg-color', '#EFEFEF');
        document.documentElement.style.setProperty('--template4-even-column-bg-color', '#BFE5F4');
        document.documentElement.style.setProperty('--template1-column2-bg-even-color', '#ED706D');
        document.documentElement.style.setProperty('--template1-column2-bg-odd-color', '#EB4C50');
        document.documentElement.style.setProperty('--template1-brand-text-color', '#ffffff');
        document.documentElement.style.setProperty('--template2-brand-text-color', '#ffffff');
        document.documentElement.style.setProperty('--template3-brand-text-color', '#ffffff');
        document.documentElement.style.setProperty('--template4-brand-text-color','#000000');
        document.documentElement.style.setProperty('--template1-competitor-text-color', '#000000');
        document.documentElement.style.setProperty('--template2-competitor-text-color', '#000000');
        document.documentElement.style.setProperty('--template3-competitor-text-color', '#000000');
        document.documentElement.style.setProperty('--template4-competitor-text-color', '#000000');
        document.documentElement.style.setProperty('--template2-competitor-bg-odd-color', '#474B8B');
        document.documentElement.style.setProperty('--template2-competitor-bg-even-color', '#7B7EAC');
        document.documentElement.style.setProperty('--template2-competitor-bg-color', '#F5F5F5');
        document.documentElement.style.setProperty('--template2-brand-bg-color', '#474B8B');
        document.documentElement.style.setProperty('--template2-advantage-text-color', '#000000');
        document.documentElement.style.setProperty('--template4-advantage-text-color', '#000000');
        document.documentElement.style.setProperty('--template3-brand-inner-text-color', '#000000');
        document.documentElement.style.setProperty('--template3-competitor-inner-text-color', '#000000');
        document.documentElement.style.setProperty('--template4-brand-inner-text-color', '#000000');
        document.documentElement.style.setProperty('--template4-competitor-inner-text-color', '#000000');
        document.documentElement.style.setProperty('--template2-border-color', '#3b3f84');
        document.documentElement.style.setProperty('--template4-border-color', '#000000');

    }, [])

    return (
    <div className='Template-Page2'>
      <Page fullWidth>

        <Layout>
          <Layout.Section fullWidth>

            <Card sectioned>
              <h5>Select your favorite template</h5>
              <p> Choose the template that best suits your needs. You will then be able to
                fully customize it.</p>
            </Card>

          </Layout.Section>

          <Layout.Section oneHalf >
            <Table11 handleSelectTemplate={handleSelectTemplate} btnloading={btnloading} />
          </Layout.Section>

          <Layout.Section oneHalf>
            <Table22 handleSelectTemplate={handleSelectTemplate} btnloading={btnloading} />
          </Layout.Section>

          <Layout.Section oneHalf>
            <Table33 handleSelectTemplate={handleSelectTemplate} btnloading={btnloading} />
          </Layout.Section>

          <Layout.Section oneHalf>
            <Table44 handleSelectTemplate={handleSelectTemplate} btnloading={btnloading} />
          </Layout.Section>

          {/* {[1, 2, 3, 4].map((item) => {
            return (
              <Layout.Section key={item} oneHalf>
                <Card sectioned>
                  <div className='Theme-Card-Content'>

                    <div className='Tables-Image-Section'>
                      {screen[item] ?
                        <img src={`./images/table${item}desktop.jpg`} alt="desktop table" /> :
                        <img src={`./images/table${item}mobile.jpg`} alt="mobile table" />
                      }
                    </div>

                    <div className='Screen-Selection'>
                      <Stack>
                        <span></span>
                        <div className='Screen-Selection-Icons'>
                          <span className={`Screen-Icon ${screen[item] && 'selected'}`}
                            onClick={() => handleScreenSelection(item)}>
                            <Icon source={DesktopMajor} ></Icon>
                          </span>

                          <span className={`Screen-Icon ${!screen[item] && 'selected'}`}
                            onClick={() => handleScreenSelection(item)}>
                            <Icon source={MobileMajor}></Icon>
                          </span>
                        </div>

                        <div className='Screen-Selection-Btn'>
                          {
                            btnloading[item] ?
                              <Button loading >Select</Button> :
                              <Button primary onClick={() => handleSelectTemplate(item)}>Select</Button>
                          }
                        </div>
                      </Stack>
                    </div>

                  </div>
                </Card>
              </Layout.Section>
            )
          })} */}

        </Layout>
      </Page>
    </div>
  )
}


