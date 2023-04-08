import {useState} from "react";

export default function Product({details}) {
    const [count, setCount] = useState(0);

    const {name, image, description} = details;
    function handleIncrementClick() {
        setCount(count + 1);
    }
    function handleDecrementClick() {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    return <div className="product">
        <img width="50" alt="" src={image} />
        <div className="product-info">
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
        <div className="product-buttons">
            <button className="product-sub"
                    onClick={handleDecrementClick} disabled={count ===0}>-</button>
            <h3 className="product-count">{count}</h3>
            <button className="product-add"
                    onClick={handleIncrementClick}>+</button>
        </div>
    </div>
}