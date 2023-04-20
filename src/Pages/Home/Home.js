import {useState, useEffect} from "react";
import useFetch from 'hooks/useFetch';
import {useDispatch} from "react-redux";
import { Col, Row, Button, Layout, Typography, Card} from "antd";
import "./styles.scss";
import "assets/scss/card.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addProduct } from "reducers/cartReducer/cartReducer";

const { Title, Text } = Typography;
const Background = "https://c1.wallpaperflare.com/preview/1017/473/68/clothing-store-shop-boutique-men-s-fashion.jpg";
const { Meta } = Card;

export default function Home() {
    const [products, setProducts] = useState();
    const {get} = useFetch("https://store-18cd4-default-rtdb.firebaseio.com/");
    const dispatch = useDispatch();

    const onProductAdd = (e,product) => {
        e.preventDefault()
        dispatch(addProduct(product));
    };

    useEffect(()=>{
        get("products.json")
            .then(data=> {
                if(data) {
                    setProducts(data)
                }
            })
            .catch(error=>console.log(error))
    },[])


    return (<>
                <Layout className="main">
                    <div className="background" style={{backgroundImage: `url(${Background})`}}></div>
                    <div className="container">
                        <Row>
                            <Col span={24}>
                                <Title className="title">Online shopping simplified</Title>
                                <Text className="desc">Order your groceries from <em>SuperM</em> with our easy to use app,
                                    and get your products delivered straight to your doorstep.</Text>
                                <Button size="large" type="link" to="/products" type="primary">Shop</Button>
                            </Col>
                        </Row>
                    </div>
                </Layout>

                <Layout className="products section">
                    <div className="container">
                        <Title className="title" level={2} style={{textAlign: "center"}}>Online shopping simplified</Title>

                        <Row gutter={16}>
                            {products && Object.values(products).map(product => {
                                return <Col key={product.id} className="gutter-row" span={6}>
                                    <a href="" className="">
                                        <Card className="card" hoverable
                                              cover={<img alt="example" src={product.images} />}
                                        >
                                            <Meta title={product.name} description={product.description} />
                                            <span className="price">Price: <strong>{product.price}$</strong></span>
                                            <Button onClick={(e) => onProductAdd(e,product)} type="primary" icon={<ShoppingCartOutlined />} size="large">Buy</Button>
                                        </Card>
                                    </a>
                                </Col>
                            })}
                        </Row>
                    </div>
                </Layout>
            </>
        )
}