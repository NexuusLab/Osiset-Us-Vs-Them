import React, { useContext, useEffect, useState } from 'react';
import { Page, Card, MediaCard, Modal, ResourceList, ResourceItem, Avatar, Text, EmptyState ,Toast} from '@shopify/polaris';
import { AppContext } from '../Context'


export function TemplatePage1() {
    const { setActivePage, templateUserId, setTemplateUserId, setSelectedTemplate, url,config } = useContext(AppContext);

    let host = config?.shopOrigin;

    const [products, setProducts] = useState([]);
    const [assignedItems, setAssignedItems] = useState([]);
    const [productsModal, setProductsModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [productsToastActive, setProductsToastActive] = useState(false);
    const [btnloading, setBtnLoading] = useState(false);


    useEffect(() => {
        setActivePage(1)
        setSelectedTemplate()
        setTemplateUserId()
    }, [])
    const toastProducts = productsToastActive ? (
        <Toast content="Products Updated Sucessfully" onDismiss={()=>setProductsToastActive(false)} duration={1500} />
    ) : null;
    const handleProductsModal = () => {
        setProductsModal(false)
        setTemplateUserId()
    }

    const handleSelectProducts = async () => {
        let id= null;

        setBtnLoading(true);
        setProducts([])
        setSelectedItems([])
        const response = await axios
            .get(
                `${url}/products?user_template_id=${id}&shop_name=${host}`
            )
            .then(res => {
                console.log('select products response', res.data.result);
                let arr = []
                let arr2 = []
                res.data.result?.map((item) => {
                    if (item.selected === true && item.assigned === true) {
                        arr2.push(item.id)
                    }
                })
                res.data.result?.map((item) => {
                    if (item.selected === true && item.assigned === true) {
                        arr.push(item.id)
                    }
                    else if (item.selected === false) {
                        arr.push(item.id)
                    }
                })
                setProducts(res.data.result)
                setTemplateUserId(id)
                setAssignedItems(arr)
                setSelectedItems(arr2)
                setBtnLoading(false)
                setProductsModal(true)
            })
            .catch(error => {
                alert('Error', error);
                setBtnLoading(false)
                setProductsModal(false);
                setProducts([])
                setSelectedItems([])
            });
    }
    const handleSubmitProduct = async () => {
        setBtnLoading(true)
        var unSelected = assignedItems.filter(function (item) {
            return selectedItems.indexOf(item) === -1;
        });
        let data = {
            user_template_id: templateUserId,
            product_ids: selectedItems,
            unSelected_ids: unSelected,
            shop_name: host,
        };
        try {
            const response = await axios.post(`${url}/selected-products`, data)
            console.log('submit products response', response);
            setBtnLoading(false)
            setProductsModal(false);
            setProductsToastActive(!productsToastActive)
            setTemplateUserId()
            setActivePage(2)
        } catch (error) {
            alert('Error', error);
            setBtnLoading(false)
            setTemplateUserId()
            setProductsModal(false);
        }
    }

    return (
        <div className='Template-Page1'>
            {productsModal &&
                products?.length ?
                <Modal
                    open={productsModal}
                    onClose={handleProductsModal}
                    title="Select Products"
                    primaryAction={{
                        content: 'Save',
                        disabled: btnloading ? true : false,
                        onAction: handleSubmitProduct,
                    }}
                    secondaryActions={[
                        {
                            content: 'Cancel',
                            onAction: handleProductsModal,
                        },
                    ]}
                >
                    <Modal.Section>
                        <span className='Polaris-MediaCard-Table'>
                            <ResourceList
                                resourceName={{
                                    singular: 'product',
                                    plural: 'products'
                                }}
                                items={products}
                                loading={btnloading ? true : false}
                                renderItem={(item) => {
                                    const { id, image, title, selected, assigned, template_name } = item;
                                    const media = <Avatar size="small"
                                        shape="square"
                                        name={title}
                                        source={image} />;
                                    return (
                                        <span className={selected ? !assigned ? 'Selected-Product ResourceItem-ListItem' : 'ResourceItem-ListItem' : 'ResourceItem-ListItem'}>
                                            <ResourceItem
                                                id={id}
                                                media={media}
                                                accessibilityLabel={`View details for ${title}`}
                                            >
                                                <Text variant="bodyMd"
                                                    fontWeight="bold" as="h3">
                                                    {title}
                                                    {selected ? !assigned ?
                                                        <p className='Product-Assigned'>
                                                            {`Product assigned to ${template_name}`}
                                                        </p>
                                                        : '' : ''
                                                    }
                                                </Text>
                                            </ResourceItem>
                                        </span>
                                    );
                                }}
                                selectedItems={selectedItems}
                                onSelectionChange={setSelectedItems}
                                selectable
                            />
                        </span>
                    </Modal.Section>
                </Modal>
                :

                <Modal
                    open={productsModal}
                    onClose={handleProductsModal}
                    title="Select Products"
                    primaryAction={{
                        content: 'Save',
                        disabled: true,
                    }}
                    secondaryActions={[
                        {
                            content: 'Cancel',
                            onAction: handleProductsModal,
                        },
                    ]}
                >
                    <Modal.Section>
                        <EmptyState
                            heading="No Products to Show"
                            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                        >
                        </EmptyState>
                    </Modal.Section>
                </Modal>
            }

            <Page title="Welcome to Us vs Them" fullWidth>

                <Card sectioned>
                    <h5>Getting Started</h5>
                    <p>
                        Choose the template that best suits your needs. You will then be able to
                        fully customize it.
                    </p>
                </Card>

                <MediaCard
                    title="Select Your Product"
                    primaryAction={{
                        content: 'Select Your Product',
                        loading: btnloading ? true : false,
                        onAction: handleSelectProducts
                    }}
                    description={`Choose the template that best suits your needs. You will then be able to fully customize it.`}>
                    <img
                        alt="table1"
                        className='MediaCard-Img'
                        src="https://i.ibb.co/QXcJW8V/image.png"
                    />
                </MediaCard>
                {toastProducts}
            </Page>

        </div>
    )
}
