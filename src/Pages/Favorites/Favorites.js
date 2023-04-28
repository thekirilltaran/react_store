import {useSelector} from "react-redux"

import { Col, Layout, Row, Typography } from "antd";
import ProductCard from "../../components/Card/Card";

const {Title} = Typography;

export default function Favorites () {
    const {cartFavorite} = useSelector(state => state.cartFavorite)
    return (
        <Layout className="section">
            <div className="container">
                <Title style={{marginTop: 0}}>Favorites</Title>

                <Row gutter={16}>
                    {cartFavorite && cartFavorite.map(product => {
                        return <Col key={product.id} className="gutter-row" span={6}>
                            <ProductCard product={product}/>
                        </Col>
                    })}
                </Row>
            </div>
        </Layout>
    )
}