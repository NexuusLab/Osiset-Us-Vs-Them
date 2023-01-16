import React, { useState } from 'react'
import { Card, IndexTable, Icon, Stack, Button } from '@shopify/polaris';
import {
    MobileMajor, DesktopMajor, CircleTickMinor, CircleCancelMinor,
} from '@shopify/polaris-icons';

const theme2Pc = [
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
    },
    {
        name: 'advantage 7',
        yourBrand: true,
        competitor: false,
    }
]

export function Table22({ handleSelectTemplate, btnloading }) {

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

    const theme2RowsPc = theme2Pc?.map(
        ({ name, yourBrand, competitor }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >
                <IndexTable.Cell>{name}</IndexTable.Cell>
                <IndexTable.Cell>
                    {yourBrand ?
                        <span style={{ fill: '#474B8B' }}>
                            <Icon source={CircleTickMinor} ></Icon>
                        </span> :
                        <span style={{ fill: '#7B7EAC' }}>
                            <Icon source={CircleCancelMinor}></Icon>
                        </span>
                    }
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {competitor ?
                        <span style={{ fill: '#474B8B' }}>
                            <Icon source={CircleTickMinor} ></Icon>
                        </span> :
                        <span style={{ fill: '#7B7EAC' }}>
                            <Icon source={CircleCancelMinor}></Icon>
                        </span>
                    }
                </IndexTable.Cell>

            </IndexTable.Row>
        ),
    );

    const theme2Headings = [
        { title: '' },
        { title: 'Your Brand' },
        { title: 'Competitor' },
    ]

    return (
        <Card sectioned>
            <div className='Theme-Card-Content'>
                <div className={`${'Theme2-Pc-Table'} Theme-Table`}>
                    <IndexTable
                        resourceName={resourceName}
                        itemCount={theme2Pc?.length}
                        selectable={false}
                        headings={theme2Headings}
                    >
                        {theme2RowsPc}
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
                            {btnloading[2] ?
                                <Button loading>Select</Button>
                                :
                                <Button primary onClick={() => handleSelectTemplate(2)}>Select</Button>
                            }
                        </div>
                    </Stack>
                </div>

            </div>
        </Card>

    )
}
