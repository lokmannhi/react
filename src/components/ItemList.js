import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import "./ItemList.css"
import { splitOrder } from "../helper/SplitOrder";

const ItemList = () => {
    const { data, loading, error } = useFetch('https://server-oasg.onrender.com/api/items/all')
    const [selectedItems, setSelectedItems] = useState([]);
    const [orderResult, setOrderResult] = useState(null);

    const handleCheckboxChange = (id) => {
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(itemId => itemId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handlePlaceOrder = () => {
        if (selectedItems.length === 0) {
            alert("Please select at least one item to place an order.");
            setOrderResult(null)
            return;
        }

        const selectedData = data.filter(item => selectedItems.includes(item.id));

        const result = splitOrder(selectedData);

        setOrderResult(result);
    };

    const handleClear = () => {
        setOrderResult(null);
        setSelectedItems([]);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Item List</h1>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
                <button className="clear-btn" onClick={handleClear}>Clear</button>
            </div>

            {orderResult && (
                <div className="order-result">
                    <h2>This order has following packages:</h2>
                    {orderResult.map((pkg, index) => (
                        <div className="package" key={index}>
                            <h3>Package {index + 1}</h3>
                            <p><strong>Items:</strong> {pkg.items.map(item => item.name).join(", ")}</p>
                            <p><strong>Total weight:</strong> {pkg.totalWeight}g</p>
                            <p><strong>Total price:</strong> ${pkg.totalPrice}</p>
                            <p><strong>Courier price:</strong> ${pkg.courierPrice}</p>
                        </div>
                    ))}
                </div>
            )}
            
            <div className="item-list">
                {data.map((item) => (
                    <div className="item" key={item.id}>
                        <input
                            type="checkbox"
                            id={`item-${item.id}`}
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                        <label htmlFor={`item-${item.id}`}>
                            <p><strong>{item.name}</strong></p>
                            <p>Price: {item.price}</p>
                            <p>Weight: {item.weight}</p>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;