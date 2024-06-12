import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import AddItemModal from "./Additemmodal";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "./Item.css";

const Item = () => {
    const [items, setItems] = useState([]);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [searchText, setSearchText] = useState('');

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

    const onSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredItems = items.filter(item =>
        item.productName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.groupName.toLowerCase().includes(searchText.toLowerCase())
    );

    const columnDefs = [
        { headerName: 'Product Name', field: 'productName' },
        { headerName: 'Group Name', field: 'groupName' },
        { headerName: 'Is Active', field: 'isActive', valueGetter: params => params.data.isActive ? 'Yes' : 'No' },
        { headerName: 'HSN Code', field: 'hsnCode' },
        { headerName: 'Unit', field: 'unit' },
        { headerName: 'Description', field: 'description' },
        { headerName: 'Weight', field: 'weight' },
        { headerName: 'Height', field: 'height' },
        { headerName: 'Length', field: 'length' },
        { headerName: 'Barcode', field: 'barcode' },
        { headerName: 'Batch No', field: 'batchNo' },
        { headerName: 'Mfg Date', field: 'mfgDate' },
        { headerName: 'Expiry Date', field: 'expiryDate' },
        { headerName: 'MRP', field: 'mrp' },
        { headerName: 'RSP', field: 'rsp' },
        { headerName: 'Std Rate', field: 'stdRate' },
    ];

    return (
        <>
            <Sidebar />
            <div className="item-page-container">
                <div className="item-page-container1">
                    <h1 className='item-heading'>Items</h1>
                    <button className="item-page-btn" onClick={handleAddItemClick}>Add New Item</button>
                </div>
                <hr></hr>
                <div className="container2" style={{width:'100%',float:'left',display:'flex',alignItems:'right'}}>
                    <input type="text" placeholder="Search..." className="search-input" style={{marginLeft:'1000px'}} value={searchText} onChange={onSearchTextChange} />
                </div>
                <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={filteredItems}
                        pagination={true}
                        paginationPageSize={10}
                    />
                </div>
                {showAddItemModal && <AddItemModal onClose={handleAddItemClose} onSubmit={handleAddItemSubmit} />}
            </div>
        </>
    );
};

export default Item;
