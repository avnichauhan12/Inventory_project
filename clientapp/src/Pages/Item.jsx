import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./Item.css";

const Item = () => {
    const [items, setItems] = useState([]);
    const [showAddItemModal, setShowAddItemModal] = useState(false);

    const handleAddItemClick = () => {
        // Open the modal in a new tab
        const newTab = window.open('', '_blank');
        if (newTab) {
            // Set the URL to an empty HTML page to prevent security issues
            newTab.document.write('<!DOCTYPE html><html><head><title>Add New Item</title></head><body><div id="modal-root"></div></body></html>');
            ReactDOM.render(<AddItemModal onClose={() => setShowAddItemModal(false)} onSubmit={(itemData) => handleAddItemSubmit(itemData, newTab)} />, newTab.document.getElementById('modal-root'));
        }
    };

    const handleAddItemClose = () => {
        setShowAddItemModal(false);
    };

    const handleAddItemSubmit = (itemData) => {
        setItems([...items, itemData]);
        setShowAddItemModal(false);
        newTab.close();
    };

    return (
        <div className="item-page-container">
        <div className="container1">
            <h1>Items</h1>
            <button onClick={handleAddItemClick}>Add New Item</button>
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
    );
};



const AddItemModal = ({ onClose, onSubmit }) => {
    const [items, setItems] = useState([
        {
            productName: '',
            groupName: '',
            isActive: false,
            hsnCode: '',
            unit: '',
            description: '',
            weight: '',
            height: '',
            length: '',
            barcode: '',
            batchNo: '',
            mfgDate: '',
            expiryDate: '',
            mrp: '',
            rsp: '',
            stdRate: ''
        }
    ]);

    const handleAddRow = () => {
        setItems(prevItems => [
            ...prevItems,
            {
                barcode: '',
                batchNo: '',
                mfgDate: '',
                expiryDate: '',
                mrp: '',
                rsp: '',
                stdRate: '',
                weight: '',
                height: '',
                length: ''
            }
        ]);
    };

    const handleChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleDeleteRow = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const handleSubmit = () => {
        onSubmit(items);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add New Item</h2>
                <div className="form-container">
                    <div className="container">
                        <label>Product Name:</label>
                        <input type="text" value={items[0].productName} onChange={(e) => handleChange(0, 'productName', e.target.value)} />
                        <label>Group Name:</label>
                        <input type="text" value={items[0].groupName} onChange={(e) => handleChange(0, 'groupName', e.target.value)} />
                        </div><br></br>
                        <div className='container'>
                        <label>Is Active:</label>
                        <input type="checkbox" checked={items[0].isActive} onChange={(e) => handleChange(0, 'isActive', e.target.checked)} />
                        <label>HSN Code:</label>
                        <input type="text" value={items[0].hsnCode} onChange={(e) => handleChange(0, 'hsnCode', e.target.value)} />
                        <label>Unit:</label>
                        <input type="text" value={items[0].unit} onChange={(e) => handleChange(0, 'unit', e.target.value)} />
                        </div>
                    <br></br>
                    <div className="container">
                    <label>Description:</label>
                        <input type="text" value={items[0].description} onChange={(e) => handleChange(0, 'description', e.target.value)} />
                        <label>Weight:</label>
                        <input type="text" value={items[0].weight} onChange={(e) => handleChange(0, 'weight', e.target.value)} />
                        <label>Height:</label>
                        <input type="text" value={items[0].height} onChange={(e) => handleChange(0, 'height', e.target.value)} />
                        <label>Length:</label>
                        <input type="text" value={items[0].length} onChange={(e) => handleChange(0, 'length', e.target.value)} />
                    </div>
                </div>
                <br></br><br></br>
                <div className='table'>
                    <table style={{ borderCollapse: 'collapse', border: '1px solid #000' }}>
                        <thead>
                            <tr>
                                <th>Barcode</th>
                                <th>Batch No</th>
                                <th>Mfg Date</th>
                                <th>Expiry Date</th>
                                <th>MRP</th>
                                <th>RSP</th>
                                <th>Std Rate</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
    {items.map((item, index) => (
        <tr key={index}>
            <td>
                <input type="text" value={item.barcode} onChange={(e) => handleChange(index, 'barcode', e.target.value)} />
            </td>
            <td>
                <input type="text" value={item.batchNo} onChange={(e) => handleChange(index, 'batchNo', e.target.value)} />
            </td>
            <td>
                <input type="date" value={item.mfgDate} onChange={(e) => handleChange(index, 'mfgDate', e.target.value)} />
            </td>
            <td>
                <input type="date" value={item.expiryDate} onChange={(e) => handleChange(index, 'expiryDate', e.target.value)} />
            </td>
            <td>
                <input type="text" value={item.mrp} onChange={(e) => handleChange(index, 'mrp', e.target.value)} />
            </td>
            <td>
                <input type="text" value={item.rsp} onChange={(e) => handleChange(index, 'rsp', e.target.value)} />
            </td>
            <td>
                <input type="text" value={item.stdRate} onChange={(e) => handleChange(index, 'stdRate', e.target.value)} />
            </td>
            <td>
                {index !== 0 && <button onClick={() => handleDeleteRow(index)}>Delete</button>}
            </td>
            <td>
                {index === items.length - 1 && <button onClick={handleAddRow}>Add Row</button>}
            </td>
        </tr>
    ))}
</tbody>

                    </table>
                </div>
                <br></br><br></br>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};


export default Item;
