import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AddItemModal from "./Additemmodal";
import "./Item.css";
import Sidebar from '../Components/Sidebar';

const Item = () => {
    const [items, setItems] = useState([]);
    const [showAddItemModal, setShowAddItemModal] = useState(false);

    const handleAddItemClick = () => {
        setShowAddItemModal(true);
    };

    const handleAddItemClose = () => {
        setShowAddItemModal(false);
    };

    const handleAddItemSubmit = (itemData) => {
        setItems([...items, itemData]);
        setShowAddItemModal(false);
    
    };

    return (
        <>
            <Sidebar/>
        <div className="item-page-container">
        <div className="item-page-container1">
            <h1 className='item-heading'>Items</h1>
            <button className="item-page-btn" onClick={handleAddItemClick}>Add New Item</button>
            </div>
            <hr></hr>
            <div className="container2">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">Search</button>
        </div>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Group Name</th>
                        <th>Is Active</th>
                        <th>HSN Code</th>
                        <th>Unit</th>
                        <th>Description</th>
                        <th>Weight</th>
                        <th>Height</th>
                        <th>Length</th>
                        <th>Barcode</th>
                        <th>Batch No</th>
                        <th>Mfg Date</th>
                        <th>Expiry Date</th>
                        <th>MRP</th>
                        <th>RSP</th>
                        <th>Std Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.productName}</td>
                            <td>{item.groupName}</td>
                            <td>{item.isActive ? 'Yes' : 'No'}</td>
                            <td>{item.hsnCode}</td>
                            <td>{item.unit}</td>
                            <td>{item.description}</td>
                            <td>{item.weight}</td>
                            <td>{item.height}</td>
                            <td>{item.length}</td>
                            <td>{item.barcode}</td>
                            <td>{item.batchNo}</td>
                            <td>{item.mfgDate}</td>
                            <td>{item.expiryDate}</td>
                            <td>{item.mrp}</td>
                            <td>{item.rsp}</td>
                            <td>{item.stdRate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddItemModal && <AddItemModal onClose={handleAddItemClose} onSubmit={handleAddItemSubmit} />}
        </div>
        </>
    );
};


export default Item;
