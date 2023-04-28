import { Col, Layout, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ProductCard from "../../components/Card/Card";
const {Title} = Typography;

export default function Products() {
    const [products, setProducts] = useState();
    const {get} = useFetch(process.env.REACT_APP_FIREBASE_DATABASEURL);

    useEffect(()=>{
        get("/products.json")
            .then(data=> {
                if(data) {
                    setProducts(data)
                }
            })
            .catch(error=>console.log(error))
    },[]);

    return (
        <Layout>
            <div className="container">
                <Layout className="products section">
                    <div className="container">
                        <Title style={{marginTop: 0}}>All products</Title>

                        <Row gutter={16}>
                            {products && Object.values(products).map(product => {
                                return <Col key={product.id} className="gutter-row" span={6}>
                                    <ProductCard product={product}/>
                                </Col>
                            })}
                        </Row>
                    </div>
                </Layout>
            </div>
        </Layout>
    )
}