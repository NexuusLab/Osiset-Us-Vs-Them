import React, { useState, useEffect } from 'react'
import { Card, IndexTable, Icon, Stack } from '@shopify/polaris';
import {
    MobileMajor, DesktopMajor, CircleTickMinor, CircleCancelMinor,
} from '@shopify/polaris-icons';


export function Table4({ yourBrand, competitorName, advantageLoading, allValues, valueType,
    competitorsCount, brandValue, competitorValue, advantagesCount, colorValues, btnShow }) {

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
        singular: 'theme4',
        plural: 'themes4',
    };

    useEffect(() => {

    }, [colorValues])


    const themeRowsPc = [...Array(Number(advantagesCount))]?.map(
        (item1, index1) => {
            return (
                <IndexTable.Row
                    id={index1}
                    key={index1}
                    position={index1}
                >
                    <IndexTable.Cell>
                        <div style={{ color: `${colorValues?.text_advantages_color}` }}>
                            {allValues[index1]}
                        </div>
                    </IndexTable.Cell>
                    <IndexTable.Cell >
                        <div style={{ backgroundColor: `${colorValues?.background_color2}` }}>
                        {valueType[index1] === 'icon' ?
                            brandValue[index1] ?
                                <span style={{ fill: `${colorValues.brand_checkbox_color1}` }}>
                                    <Icon source={CircleTickMinor}></Icon>
                                </span>
                                :
                                <span style={{ fill: `${colorValues.brand_checkbox_color2}` }} >
                                    <Icon source={CircleCancelMinor}></Icon>
                                </span>
                            :
                            !brandValue[index1] === true || !brandValue[index1] === false &&
                            <span>{brandValue[index1]}</span>

                        }
                        </div>
                    </IndexTable.Cell>
                    {[...Array(Number(competitorsCount))]?.map((item2, index2) => (
                        <IndexTable.Cell>
                            {valueType[index1] === 'icon' ?
                                competitorValue[index1] && competitorValue[index1][index2] ?
                                    <span style={{ fill: `${colorValues.competitors_checkbox_color1}` }}>
                                        <Icon source={CircleTickMinor}></Icon>
                                    </span> :
                                    <span style={{ fill: `${colorValues.competitors_checkbox_color2}` }}>
                                        <Icon source={CircleCancelMinor}></Icon>
                                    </span>
                                :
                                competitorValue[index1] && !competitorValue[index1][index2] === true ||
                                competitorValue[index1] && !competitorValue[index1][index2] === false &&
                                <span>{competitorValue[index1] && competitorValue[index1][index2]}</span>
                            }
                        </IndexTable.Cell>
                    ))}
                </IndexTable.Row>
            )
        });


    const themeHeadingsPc = [];
    themeHeadingsPc.push({ title: 'Advantages' }),
        themeHeadingsPc.push({ title: `${yourBrand}` }),
        [...Array(Number(competitorsCount))].map((item, index) => (
            themeHeadingsPc.push({ title: `${competitorName[index]}` })
        ))



    return (
        <>
            {!advantageLoading &&

                <div className='Theme-Card-Content'>
                    <div className={`${screen ? 'Theme4-Pc-Table' : 'Theme4-Mobile-Table'} Theme-Table`}>
                        <IndexTable
                            resourceName={resourceName}
                            itemCount={advantagesCount?.length}
                            selectable={false}
                            headings={themeHeadingsPc}
                        >
                            {themeRowsPc}
                        </IndexTable>
                    </div>

                    <div className='Screen-Selection'>
                        {btnShow &&
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
                                <span></span>
                            </Stack>
                        }
                    </div>
                </div>

            }
        </>

    )
}
