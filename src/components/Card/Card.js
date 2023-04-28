import { Button, Card } from "antd";
import { ShoppingCartOutlined, HeartOutlined, CloseCircleFilled } from "@ant-design/icons";

import {addProduct} from "reducers/cartReducer/cartReducer";
import {addFavoriteProduct, removeFavoriteProduct} from "reducers/favoritesReducer/favoriteReducer";
import { useDispatch, useSelector } from "react-redux";

import useMessages from "hooks/useMessages";


const { Meta } = Card;
export default function ProductCard ({product}) {
    const dispatch = useDispatch();
    const {cartFavorite} = useSelector(state => state.cartFavorite)
    const {showMess, contextHolder} = useMessages();

    const onProductAdd = (e,product) => {
        e.preventDefault()
        dispatch(addProduct(product))
    };
    const onFavoriteProductAdd = (e,product) => {
        e.preventDefault()
        const result = dispatch(addFavoriteProduct(product));
        console.log(result)
        const existingProduct = cartFavorite.find(
            prevProduct=> {
                return prevProduct.id === product.id
            });
        if (!existingProduct) {
            showMess("success", "You added product")
        } else {
            showMess("success", "You have already added product")
        }
    };

    const onFavoriteProductRemove = (e,product) => {
        e.preventDefault()
        dispatch(removeFavoriteProduct(product));
    };



    return (<>{contextHolder}
            <Card className="card"
                  hoverable
                  extra={
                      <div className="action">
                          <a href="/" className="product-link" target="_blank"></a>
                          {product.favorite &&
                          <Button className="btn-del"
                                  type="link"
                                  onClick={(e) => onFavoriteProductRemove(e,product)}>
                              <CloseCircleFilled />
                          </Button>
                          }
                          <Button className="btn-fav"
                                  type="link"
                                  onClick={(e) => onFavoriteProductAdd(e,product)}>
                              <HeartOutlined/>
                          </Button>
                      </div>}
                  cover={<img alt="preview-product" src={product.images} />}>
                <Meta title={product.name}
                      description={product.description} />
                <span className="price">Price:
                    <strong>{product.price}$</strong>
                </span>

                <Button onClick={(e) => onProductAdd(e,product)} type="primary" icon={<ShoppingCartOutlined />} size="large">Buy</Button>
            </Card>
        </>
    )
}