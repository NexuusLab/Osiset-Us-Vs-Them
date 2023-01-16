import React, { useState } from 'react'
import { Card, IndexTable, Icon, Stack, Button } from '@shopify/polaris';
import {
    MobileMajor, DesktopMajor, CircleTickMinor, CircleCancelMinor,
} from '@shopify/polaris-icons';

const theme3Pc = [
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
    }
]

export function Table33({ handleSelectTemplate, btnloading }) {

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

    const theme3RowsPc = theme3Pc?.map(
        ({ name, yourBrand, competitor }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >
                <IndexTable.Cell>{name}</IndexTable.Cell>
                <IndexTable.Cell>
                    {yourBrand ?
                        <span>
                            <svg width="40" height="40" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                                <path d="m491.79 181.89c4.6211 4.1211 5.1172 11.176 1.1172 15.906l-183.01 212.8c-2.1289 2.4688-5.2461 3.8633-8.5117 3.8047-3.2969 0.003906-6.4219-1.4766-8.5117-4.0312l-85.793-100.8h0.003906c-1.9414-2.2383-2.8945-5.168-2.6406-8.1211 0.25391-2.9531 1.6875-5.6797 3.9844-7.5586 2.2383-1.9414 5.168-2.8906 8.1211-2.6367 2.9531 0.25 5.6797 1.6875 7.5586 3.9805l77.281 90.719 174.5-202.95-0.003906 0.003906c4.1211-4.6211 11.176-5.1172 15.906-1.1211zm93.406 98.113c0 62.379-24.777 122.2-68.887 166.31s-103.93 68.887-166.31 68.887-122.2-24.777-166.31-68.887-68.887-103.93-68.887-166.31 24.777-122.2 68.887-166.31 103.93-68.887 166.31-68.887c62.359 0.058594 122.15 24.859 166.25 68.953 44.094 44.098 68.895 103.89 68.953 166.25zm-22.398 0c0-56.438-22.422-110.57-62.328-150.47s-94.035-62.328-150.47-62.328-110.57 22.422-150.47 62.328-62.328 94.035-62.328 150.47 22.422 110.57 62.328 150.47 94.035 62.328 150.47 62.328c56.418-0.058593 110.51-22.5 150.41-62.395s62.336-93.988 62.395-150.41z" />
                            </svg>
                        </span>
                        :
                        <span >
                            <svg width="35" height="40" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                                <path d="m570.64 484.96c2.1641 2.0312 3.3945 4.8672 3.3945 7.8398 0 2.9688-1.2305 5.8086-3.3945 7.8398-2.0312 2.1641-4.8711 3.3945-7.8398 3.3945-2.9727 0-5.8086-1.2305-7.8398-3.3945l-204.96-204.74-204.96 204.74c-2.0312 2.1641-4.8672 3.3945-7.8398 3.3945-2.9688 0-5.8086-1.2305-7.8398-3.3945-2.1641-2.0312-3.3945-4.8711-3.3945-7.8398 0-2.9727 1.2305-5.8086 3.3945-7.8398l204.73-204.96-204.73-204.96c-4.3281-4.3281-4.3281-11.348 0-15.68 4.332-4.3281 11.352-4.3281 15.68 0l204.96 204.73 204.96-204.73c4.3281-4.3281 11.348-4.3281 15.68 0 4.3281 4.332 4.3281 11.352 0 15.68l-204.74 204.96z" />
                            </svg>
                        </span>
                    }
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {competitor ?
                        <span>
                            <svg width="40" height="40" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                                <path d="m491.79 181.89c4.6211 4.1211 5.1172 11.176 1.1172 15.906l-183.01 212.8c-2.1289 2.4688-5.2461 3.8633-8.5117 3.8047-3.2969 0.003906-6.4219-1.4766-8.5117-4.0312l-85.793-100.8h0.003906c-1.9414-2.2383-2.8945-5.168-2.6406-8.1211 0.25391-2.9531 1.6875-5.6797 3.9844-7.5586 2.2383-1.9414 5.168-2.8906 8.1211-2.6367 2.9531 0.25 5.6797 1.6875 7.5586 3.9805l77.281 90.719 174.5-202.95-0.003906 0.003906c4.1211-4.6211 11.176-5.1172 15.906-1.1211zm93.406 98.113c0 62.379-24.777 122.2-68.887 166.31s-103.93 68.887-166.31 68.887-122.2-24.777-166.31-68.887-68.887-103.93-68.887-166.31 24.777-122.2 68.887-166.31 103.93-68.887 166.31-68.887c62.359 0.058594 122.15 24.859 166.25 68.953 44.094 44.098 68.895 103.89 68.953 166.25zm-22.398 0c0-56.438-22.422-110.57-62.328-150.47s-94.035-62.328-150.47-62.328-110.57 22.422-150.47 62.328-62.328 94.035-62.328 150.47 22.422 110.57 62.328 150.47 94.035 62.328 150.47 62.328c56.418-0.058593 110.51-22.5 150.41-62.395s62.336-93.988 62.395-150.41z" />
                            </svg>
                        </span>
                        :
                        <span>
                            <svg width="35" height="40" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                                <path d="m570.64 484.96c2.1641 2.0312 3.3945 4.8672 3.3945 7.8398 0 2.9688-1.2305 5.8086-3.3945 7.8398-2.0312 2.1641-4.8711 3.3945-7.8398 3.3945-2.9727 0-5.8086-1.2305-7.8398-3.3945l-204.96-204.74-204.96 204.74c-2.0312 2.1641-4.8672 3.3945-7.8398 3.3945-2.9688 0-5.8086-1.2305-7.8398-3.3945-2.1641-2.0312-3.3945-4.8711-3.3945-7.8398 0-2.9727 1.2305-5.8086 3.3945-7.8398l204.73-204.96-204.73-204.96c-4.3281-4.3281-4.3281-11.348 0-15.68 4.332-4.3281 11.352-4.3281 15.68 0l204.96 204.73 204.96-204.73c4.3281-4.3281 11.348-4.3281 15.68 0 4.3281 4.332 4.3281 11.352 0 15.68l-204.74 204.96z" />
                            </svg>
                        </span>
                    }
                </IndexTable.Cell>

            </IndexTable.Row>
        ),
    );

    const theme3Headings = [
        { title: '' },
        { title: 'Your Brand' },
        { title: 'Competitor' },
    ]

    return (
        <Card sectioned>
            <div className='Theme-Card-Content'>
                <div className={`${'Theme3-Mobile-Table'} Theme-Table`}>
                    <IndexTable
                        resourceName={resourceName}
                        itemCount={theme3Pc?.length}
                        selectable={false}
                        headings={theme3Headings}
                    >
                        {theme3RowsPc}
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
                            {btnloading[3] ?
                                <Button loading>Select</Button>
                                :
                                <Button primary onClick={() => handleSelectTemplate(3)}>Select</Button>
                            }
                        </div>
                    </Stack>
                </div>

            </div>
        </Card>

    )
}
