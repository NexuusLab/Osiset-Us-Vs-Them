import React, { useState } from 'react'
import { Card, IndexTable, Icon, Stack, Button } from '@shopify/polaris';
import { TickMinor, CancelMinor, MobileMajor, DesktopMajor } from '@shopify/polaris-icons';


const theme1Pc = [
    {
        name: 'advantage 1',
        yourBrand: true,
        competitor: true,
    },
    {
        name: 'advantage 2',
        yourBrand: true,
        competitor: true,
    },
    {
        name: 'advantage 3',
        yourBrand: true,
        competitor: true,
    },
    {
        name: 'advantage 4',
        yourBrand: true,
        competitor: false,
    },
    {
        name: 'advantage 5',
        yourBrand: true,
        competitor: false,
    },
    {
        name: 'advantage 6',
        yourBrand: true,
        competitor: false,
    },
    {
        name: 'advantage 7',
        yourBrand: true,
        competitor: false,
    },
    {
        name: 'advantage 8',
        yourBrand: true,
        competitor: false,
    },
    {
        name: 'advantage 9',
        yourBrand: true,
        competitor: false,
    },
]

const theme1Mobile = [
    {
        name: 'advantage 1',
        yourBrand: true,
        competitor: true,
    },
    {
        name: 'advantage 2',
        yourBrand: true,
        competitor: true,
    },
    {
        name: 'advantage 3',
        yourBrand: true,
        competitor: false,
    },
    {
        name: 'advantage 4',
        yourBrand: true,
        competitor: false,
    },
    {
        name: 'advantage 5',
        yourBrand: true,
        competitor: false,
    },
    {
        name: 'advantage 6',
        yourBrand: true,
        competitor: false,
    }
]

export function Table11({ handleSelectTemplate, btnloading }) {

    const [screen, setScreen] = useState(true)

    const handleScreenSelection = (val) => {
        if (val) {
            setScreen(true)
        }
        else {
            setScreen(false)
        }
    }

    const resourceName = {
        singular: 'theme',
        plural: 'themes',
    };

    const themeRowsPc = theme1Pc?.map(
        ({ name, yourBrand, competitor }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >
                <IndexTable.Cell>
                    {`${name}  `}
                </IndexTable.Cell>

                <IndexTable.Cell>
                    <span className='White-Icons'>
                        {yourBrand ?
                            <Icon source={TickMinor}></Icon> :
                            <Icon source={CancelMinor}></Icon>
                        }
                    </span>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {competitor ?
                        <Icon source={TickMinor}></Icon> :
                        <Icon source={CancelMinor}></Icon>
                    }
                </IndexTable.Cell>

            </IndexTable.Row>
        ),
    );

    const themeRowsMobile = theme1Mobile?.map(
        ({ name, yourBrand, competitor }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >
                <IndexTable.Cell>
                    {`${name}  `}
                </IndexTable.Cell>

                <IndexTable.Cell>
                    <span className='White-Icons'>
                        {yourBrand ?
                            <Icon source={TickMinor}></Icon> :
                            <Icon source={CancelMinor}></Icon>
                        }
                    </span>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {competitor ?
                        <Icon source={TickMinor}></Icon> :
                        <Icon source={CancelMinor}></Icon>
                    }
                </IndexTable.Cell>

            </IndexTable.Row>
        ),
    );

    const theme1Headings = [
        { title: '' },
        { title: 'Your Brand' },
        { title: 'Competitor' }
    ]


    return (
        <Card sectioned>
            <div className='Theme-Card-Content'>
                <div className={`${screen ? 'Theme1-Pc-Table' : 'Theme1-Mobile-Table'} Theme-Table`}>
                    <IndexTable
                        resourceName={resourceName}
                        itemCount={screen ? theme1Pc?.length : theme1Mobile.length}
                        selectable={false}
                        headings={screen ? theme1Headings : theme1Headings}
                    >
                        {screen ? themeRowsPc : themeRowsMobile}
                        <IndexTable.Row>
                            <IndexTable.Cell>;</IndexTable.Cell>
                            <IndexTable.Cell>;</IndexTable.Cell>
                            <IndexTable.Cell>;</IndexTable.Cell>
                        </IndexTable.Row>
                    </IndexTable>
                </div>

                <div className='Screen-Selection'>
                    <Stack>
                        <span></span>
                        <div className='Screen-Selection-Icons'>
                            <span className={`Screen-Icon ${screen && 'selected'}`}
                                onClick={() => handleScreenSelection(true)}>
                                <Icon source={DesktopMajor} ></Icon>
                            </span>

                            <span className={`Screen-Icon ${!screen && 'selected'}`}
                                onClick={() => handleScreenSelection(false)}>
                                <Icon source={MobileMajor}></Icon>
                            </span>
                        </div>
                        <div className='Screen-Selection-Btn'>
                            {btnloading[1] ?
                                <Button loading>Select</Button>
                                :
                                <Button primary onClick={() => handleSelectTemplate(1)}>Select</Button>
                            }
                        </div>
                    </Stack>
                </div>

            </div>
        </Card>

    )
}
