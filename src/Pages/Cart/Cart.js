import {useSelector} from "react-redux";
import {cartValueSelector} from 'reducers/cartReducer/cartReducer'
import {Layout, Typography, Table} from "antd";
import "./cart.scss"
const { Title } = Typography;

const columns = [
    {
        title: 'Product',
        dataIndex: 'name',
        render: (name, record) => <div className="product-view">
                                    <div className="img">
                                        <img src={record.images} alt="preview"/>
                                    </div>
                                   <span className="name-product">{record.name}</span>
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
        render: (total, record) => <div className="product-total">${record.quantity * record.price}</div>,
    },
];

export default function Cart() {
    const {cart} = useSelector(state => state.cart);
    const totalPrice = useSelector(cartValueSelector);

    return <Layout>
                <div className="container">
                    <Title>Cart</Title>
                    <Table
                        rowKey={(record) => record.id}
                        columns={columns}
                        dataSource={cart}
                    />
                    <span className="total-price">{totalPrice != 0 && `Total price: $${totalPrice}`}</span>
                </div>
            </Layout>
}