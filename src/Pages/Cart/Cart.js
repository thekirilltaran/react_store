import { useDispatch, useSelector } from "react-redux";
import {cartValueSelector} from 'reducers/cartReducer/cartReducer'
import {removeProduct} from "reducers/cartReducer/cartReducer";
import { Layout, Typography, Table, Button } from "antd";
import "./cart.scss"
import { CloseCircleFilled } from "@ant-design/icons";

const { Title } = Typography;



export default function Cart() {
    const {cart} = useSelector(state => state.cart);
    const totalPrice = useSelector(cartValueSelector);
    const dispatch = useDispatch();

    function onRemoveProduct(e, product) {
        e.preventDefault()
        dispatch(removeProduct(product));
    }
    const columns = [
        {
            title: 'Product',
            dataIndex: 'name',
            render: (name, cart) => <div className="product-view">
                <div className="img">
                    <img src={cart.images} alt="preview"/>
                </div>
                <span className="name-product">{cart.name}</span>
            </div>,
            filters: [
                {
                    text: 'name',
                    value: 'name',
                },
                {
                    text: 'Low to High',
                    value: 'chipper',
                },
                {
                    text: 'High to Low',
                    value: 'expensive',
                },
            ],
            width: '40%',
        },
        {
            title: 'Unit price',
            dataIndex: 'price',
            width: '20%',
            render: (price) => <div className="product-total">${price}</div>,
        },
        {
            title: 'Quanity',
            dataIndex: 'quantity',
        },
        {
            title: 'Total price',
            dataIndex: 'total',
            render: (total, cart) => <><div className="product-total">${cart.quantity * cart.price}</div>
                <Button className="btn-del"
                        type="link"
                        onClick={e => onRemoveProduct(e, cart)}>
                    <CloseCircleFilled />
                </Button>
            </>,
        },
    ];

    return <Layout className="section">
                <div className="container">
                    <Title style={{marginTop: 0}}>Cart</Title>
                    <Table
                        rowKey={(record) => record.id}
                        columns={columns}
                        dataSource={cart}
                    />
                    <span className="total-price">{totalPrice != 0 && `Total price: $${totalPrice}`}</span>
                </div>
            </Layout>
}