import { Button, Card } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";

import {addProduct} from "reducers/cartReducer/cartReducer";
import { useDispatch } from "react-redux";


const { Meta } = Card;
export default function ProductCard ({product}) {
    const dispatch = useDispatch();

    const onProductAdd = (e,product) => {
        e.preventDefault()
        dispatch(addProduct(product));
    };


    return (
            <Card className="card"
                  hoverable
                  extra={
                      <div className="action">
                          <a href="/" className="product-link"></a>
                          <Button><HeartOutlined/></Button>
                      </div>}
                  cover={<img alt="preview-product" src={product.images} />}>
                <Meta title={product.name}
                      description={product.description} />
                <span className="price">Price:
                    <strong>{product.price}$</strong>
                </span>
                <Button onClick={(e) => onProductAdd(e,product)} type="primary" icon={<ShoppingCartOutlined />} size="large">Buy</Button>
            </Card>
    )
}