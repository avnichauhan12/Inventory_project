import React, { useState } from 'react';
import "./Additemmodal.css";

const Additemmodal = ({ onClose, onSubmit }) => {
    const [items, setItems] = useState([
        {
            productName: '',
            groupName: '', // Change this to accept dropdown selection
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
    const [activeTab, setActiveTab] = useState('details');

    const handleTabChange = (tab) => {
        setActiveTab(tab === activeTab ? '' : tab);
    };

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
                length: '',
                createdBy: '',
                createdOn: '',
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

    // Define dropdown options for Group Name
    const groupOptions = ["Group 1", "Group 2", "Group 3"];

    return (
        <>
        <div className="modal-item">
            <div className="modal-content-item">
                <span className="close" onClick={onClose}>&times;</span>
                <h1 style={{color: 'blue',textAlign:'center',padding:'10px', textDecoration:'solid'}}>Add New Item</h1>
                <div className="item-form-container">
                    <div className="item-container" style={{display:'flex',gap:'83px'}}>
                        <div style={{display:'flex' ,gap:'6px',alignItems:'center'}}>
                            <label >Product Name:</label>
                            <input type="text" style={{border:"none",borderBottom:"2px solid rgb(200, 185, 185)",background:"#faf8f8"}} value={items[0].productName} onChange={(e) => handleChange(0, 'productName', e.target.value)} />
                        </div>
                        <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                            <label>Group Name:</label> 
                            {/* Dropdown for Group Name */}
                            <select value={items[0].groupName} onChange={(e) => handleChange(0, 'groupName', e.target.value)} style={{ minWidth: '200px',border:"none",borderBottom:"2px solid rgb(200, 185, 185)",background:"#faf8f8",height:'33px' }}>
                                {groupOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    {/* Rest of your form */}
                    <div className='item-container' style={{display:'flex',gap:'160px'}}>
                        <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
                            <label>Is Active:</label>
                            <input style={{width:'fit-content'}} type="checkbox" checked={items[0].isActive} onChange={(e) => handleChange(0, 'isActive', e.target.checked)} />
                        </div>
                        <div style={{display:'flex',gap:'6px',alignItems:'left',marginLeft:'100px'}}>
                            <label>HSN Code:</label>
                            <input type="text" style={{border:"none",borderBottom:"2px solid rgb(200, 185, 185)",background:"#faf8f8"}} value={items[0].hsnCode} onChange={(e) => handleChange(0, 'hsnCode', e.target.value)} />
                        </div>
                        <div style={{display:'flex',gap:'6px',alignItems:'center',marginRight:'50px'}}>
                            <label>Unit:</label>
                            <input type="text" style={{border:"none",borderBottom:"2px solid rgb(200, 185, 185)",background:"#faf8f8"}} value={items[0].unit} onChange={(e) => handleChange(0, 'unit', e.target.value)} />
                        </div>
                    </div>
                    
                    <div className="item-container" style={{display:'flex',gap:'100px'}}>
                        <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                            <label>Description:</label>
                            <input type="text" style={{border:"none",borderBottom:"2px solid rgb(200, 185, 185)",background:"#faf8f8"}} value={items[0].description} onChange={(e) => handleChange(0, 'description', e.target.value)}  />
                        </div>
                        <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                            <label>Weight:</label>
                            <input type="text" style={{border:"none",borderBottom:"2px solid rgb(200, 185, 185)",background:"#faf8f8"}} value={items[0].weight} onChange={(e) => handleChange(0, 'weight', e.target.value)} />
                        </div>
                        <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                            <label>Height:</label>
                            <input type="text" style={{border:"none",borderBottom:"2px solid rgb(200, 185, 185)",background:"#faf8f8"}} value={items[0].height} onChange={(e) => handleChange(0, 'height', e.target.value)} />
                        </div>
                        <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                            <label>Length:</label>
                            <input type="text" style={{border:"none",borderBottom:"2px solid rgb(200, 185, 185)",background:"#faf8f8"}} value={items[0].length} onChange={(e) => handleChange(0, 'length', e.target.value)} />
                        </div>
                    </div>
                </div>
                <br /><br />
                <hr style={{color:'black',bordertop: '3px solid black'}}></hr>
                <div className="tab-container">
                    <div className={`tab ${activeTab === 'details' ? 'active' : ''}`} onClick={() => handleTabChange('details')}>
                        Details
                    </div>
                    <div className={`tab ${activeTab === 'account' ? 'active' : ''}`} onClick={() => handleTabChange('account')}>
                        Account
                    </div>
                    <div className={`tab ${activeTab === 'display' ? 'active' : ''}`} onClick={() => handleTabChange('display')}>
                        Payment
                    </div>
                </div>
                <br></br>
                {activeTab === 'details' && (
                    <>
                        <div className='item-table'>
                            <table style={{ borderCollapse: 'collapse', border: '1px solid #000', width: '100%',margin: '10px' }}>
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
                    </>
                )}
                <br /><br />
                <button className="item-submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
        </>
    );
};

export default Additemmodal;
