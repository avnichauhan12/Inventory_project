import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Addgood1.css";

const AddGoodsReceiptModal = ({ show, handleClose, handleSave, vendors, items }) => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState({});

  const [formData, setFormData] = useState({
    vendor: "",
    date: new Date(),
    vendorDocNo: "",
    vendorDocDate: new Date(),
    remarks: "",
    items: []
  });

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddItem = (item) => {
    setFormData({
      ...formData,
      items: [...formData.items, item]
    });
  };

  const handleVendorChange = (e) => {
    const vendor = vendors.find(v => v.id === e.target.value);
    setSelectedVendor(vendor);
    handleFormChange("vendor", vendor);
  };

  const handleItemChange = (e) => {
    const selected = items.find(i => i.id === e.target.value);
    setSelectedItem(selected);
    setItemDetails({
      ...selected,
      quantity: 1,
      rate: selected.rate,
      gstRate: 0,
      gstAmount: 0,
      netAmount: selected.rate,
      hsnCode: selected.hsnCode,
      mrp: selected.mrp
    });
  };

  const handleItemDetailChange = (field, value) => {
    const updatedDetails = { ...itemDetails, [field]: value };
    if (field === "rate" || field === "quantity" || field === "gstRate") {
      updatedDetails.netAmount = updatedDetails.rate * updatedDetails.quantity;
      updatedDetails.gstAmount = (updatedDetails.netAmount * updatedDetails.gstRate) / 100;
      updatedDetails.netAmount += updatedDetails.gstAmount;
    }
    setItemDetails(updatedDetails);
  };

  const handleAddItemToForm = () => {
    handleAddItem(itemDetails);
    setSelectedItem(null);
    setItemDetails({});
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
  
    <div className={`custom-container ${show ? "show" : "hide"}`}>
      <div className="modal-header" style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
        <h5 className="modal-title">Add Goods Receipt</h5>
        <button style={{margin: 0, padding: 0,width:"60px",height:"20px"}} type="button" aria-label="Close" onClick={handleClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Form>
          <Form.Group style={{display:"flex",gap:"6px"}}>
            <Form.Label>Vendor</Form.Label>
            <Form.Control as="select" onChange={handleVendorChange}>
              <option value="">Select Vendor</option>
              {vendors.map(vendor => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {selectedVendor && (
            <>
              <div className="add-gooditem-container">
                <div style={{display:'flex',gap:"76px"}}>
                  <Form.Group style={{display:"flex",gap:"26px",alignItems:"center"}}>
                    <Form.Label style={{minWidth:"150px"}}>Date</Form.Label>
                    <DatePicker
                      selected={formData.date}
                      onChange={(date) => handleFormChange("date", date)}
                      className="form-control"
                    />
                  </Form.Group>
                  <Form.Group style={{display:"flex",gap:"26px",alignItems:"center"}}>
                    <Form.Label style={{minWidth:"150px"}}>Vendor Doc No.</Form.Label>
                    <Form.Control
                      className="vendor-tab-input"
                      type="text"
                      value={formData.vendorDocNo}
                      onChange={(e) => handleFormChange("vendorDocNo", e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div style={{display:'flex',gap:"76px"}} >
                  <Form.Group style={{display:"flex",gap:"26px",alignItems:"center"}}>
                    <Form.Label style={{minWidth:"150px"}}>Vendor Doc Date</Form.Label>
                    <DatePicker
                      selected={formData.vendorDocDate}
                      onChange={(date) => handleFormChange("vendorDocDate", date)}
                      className="form-control"
                    />
                  </Form.Group>
                  <Form.Group style={{display:"flex",gap:"26px",alignItems:"center"}}>
                    <Form.Label style={{minWidth:"150px"}}>Remarks</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={formData.remarks}
                      onChange={(e) => handleFormChange("remarks", e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
            </>
          )}
          <h5>Items</h5>
          <Form.Group>
            <Form.Label>Search Item</Form.Label>
            <Form.Control as="select" onChange={handleItemChange}>
              <option value="">Select Item</option>
              {items.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {selectedItem && (
            <>
              <Form.Group>
                <Form.Label>HSN Code</Form.Label>
                <Form.Control type="text" value={itemDetails.hsnCode} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Rate</Form.Label>
                <Form.Control
                  type="number"
                  value={itemDetails.rate}
                  onChange={(e) => handleItemDetailChange("rate", e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>MRP</Form.Label>
                <Form.Control
                  type="number"
                  value={itemDetails.mrp}
                  onChange={(e) => handleItemDetailChange("mrp", e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={itemDetails.quantity}
                  onChange={(e) => handleItemDetailChange("quantity", e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>GST Rate</Form.Label>
                <Form.Control
                  type="number"
                  value={itemDetails.gstRate}
                  onChange={(e) => handleItemDetailChange("gstRate", e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>GST Amount</Form.Label>
                <Form.Control type="number" value={itemDetails.gstAmount} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Net Amount</Form.Label>
                <Form.Control type="number" value={itemDetails.netAmount} readOnly />
              </Form.Group>
              <Button variant="secondary" onClick={handleAddItemToForm}>
                Add Item
              </Button>
            </>
          )}
        </Form>
      </div>
      <div className="modal-footer">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
    
  );
};

export default AddGoodsReceiptModal;


