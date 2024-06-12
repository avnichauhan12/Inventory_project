import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Sidebar from "../Components/Sidebar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./GoodsReceipt.css";
import AddGoodsReceiptModal from "./AddGoodsReceiptModal";

const GoodsReceipt = () => {
  const [goodsReceipts, setGoodsReceipts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [vendors, setVendors] = useState([
    { id: "1", name: "Vendor 1" },
    { id: "2", name: "Vendor 2" }
  ]);
  const [items, setItems] = useState([
    { id: "1", name: "Item 1", rate: 100, hsnCode: "1234", mrp: 120 },
    { id: "2", name: "Item 2", rate: 200, hsnCode: "5678", mrp: 240 }
  ]);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleSave = (formData) => {
    setGoodsReceipts([...goodsReceipts, formData]);
    setShowAddModal(false);
  };

  const columnDefs = [
    { headerName: "Vendor", field: "vendor.name" },
    { headerName: "Date", field: "date" },
    { headerName: "Vendor Doc No.", field: "vendorDocNo" },
    { headerName: "Vendor Doc Date", field: "vendorDocDate" },
    { headerName: "Remarks", field: "remarks" },
    { headerName: "Items", field: "items.length" }
  ];

  return (
    <>
      <Sidebar />
      <div className="goods-receipt-container">
      <div style={{display:"flex",gap:"1000px"}}>
        <h1 className="goods-receipt-title">Goods Receipts</h1>
        <Button variant="primary" onClick={handleShowAddModal}>
          Add New Receipt
        </Button>
        </div>
        <hr />
        <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={goodsReceipts}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
        {showAddModal && (
          <AddGoodsReceiptModal
            show={showAddModal}
            handleClose={handleCloseAddModal}
            handleSave={handleSave}
            vendors={vendors}
            items={items}
          />
        )}
      </div>
    </>
  );
};

export default GoodsReceipt;
