import Product from "../Card/Card.js";
import {useState} from 'react';


export default function StoreFront() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [validation, setValidation] = useState(false);

    function handleFormSubmit(e) {
        e.preventDefault();
        if (!name) {
            setValidation(true)
            return;
        }
        if (!description) {
            setValidation(true)
            return;
        }
        setProducts([
            ...products,
            {"id": products.length + 1,
                "name": name,
                "description": description,
            }
        ])
        setName("");
        setDescription("");
    }

    function handleClickDelete(id) {
        setProducts(products.filter(product => product.id !== id));
    }


    return <>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} id="name" type="text" placeholder="Enter the name" className="textfield" />
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <input value={description} onChange={(e)=>setDescription(e.target.value)} id="description" type="text" placeholder="Enter the description" className="textfield" />
            </div>
            <div className="form-footer">
                <div className="validation-message"></div>
                {validation && <p>Error</p>}
                <input type="submit" className="btn btn-primary" value="Add product" />
            </div>
        </form>
        {products.length == 0 && <div><p>Add your first product</p></div>}
        <ul className="store-front">
            {products.map(product =>
                <li key={product.id}>
                    <Product details={product} />
                    <button onClick={() => handleClickDelete(product.id)} className="btn-outline btn-delete">Delete</button>
                </li>
            )}
        </ul>
    </>;
}