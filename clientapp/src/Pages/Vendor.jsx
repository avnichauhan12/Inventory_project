import React, { useState } from "react";
import "./Vendor.css";
import Sidebar from "../Components/Sidebar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Vendor = () => {
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [vendors, setVendors] = useState([]);

  const handleAddVendorClick = () => {
    setShowAddVendorModal(true);
  };

  const handleAddVendorClose = () => {
    setShowAddVendorModal(false);
  };

  const handleAddVendorSubmit = (vendorData) => {
    // Check if Short Name is unique
    if (vendors.some((vendor) => vendor.shortName === vendorData.shortName)) {
      alert("Short Name must be unique.");
      return;
    }

    setVendors([...vendors, vendorData]);
    setShowAddVendorModal(false);
  };

  const gridOptions = {
    pagination: true,
    paginationPageSize: 10, // Number of rows per page
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
  };

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Short Name", field: "shortName" },
    { headerName: "Address", field: "address" },
    { headerName: "City", field: "city" },
    { headerName: "State", field: "state" },
    { headerName: "Pin", field: "pin" },
    { headerName: "GSTIN", field: "gstin" },
    { headerName: "GST State", field: "gstState" },
    { headerName: "MSME Reg No.", field: "msmeRegNo" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phone" },
  ];

  return (
    <>
      <Sidebar />
      <div className="vendor-container">
        <div className="vendor-container1">
          <h1 className="vendor-title">Vendors</h1>
          <button className="btn" onClick={handleAddVendorClick}>
            Add New Vendor
          </button>
        </div>
        <hr />
        <div
          className="ag-theme-alpine"
          style={{ height: "500px", width: "100%" }}
        >
          <div
            className="search-bar"
            style={{ display: "flex", gap: "20px", justifyContent: "flex-end" }}
          >
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <button
              className="search-button"
              style={{ width: "fit-content", margin: "2px" }}
            >
              Search
            </button>
          </div>
          <AgGridReact
            gridOptions={gridOptions}
            columnDefs={columnDefs}
            rowData={vendors}
          />
        </div>

        {showAddVendorModal && (
          <AddVendorModal
            show={showAddVendorModal}
            onClose={handleAddVendorClose}
            onSubmit={handleAddVendorSubmit}
          />
        )}
      </div>
    </>
  );
};

const AddVendorModal = ({ show, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [gstin, setGstin] = useState("");
  const [gstState, setGstState] = useState("");
  const [msmeRegNo, setMsmeRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState("address"); // Set the initial state to "address"

  const gstStateMap = {
    "01": "Jammu & Kashmir",
    "02": "Himachal Pradesh",
    "03": "Punjab",
    // Add more mappings as needed
  };

  const handleGstinChange = (e) => {
    const value = e.target.value;
    setGstin(value);
    const gstCode = value.substring(0, 2);
    setGstState(gstStateMap[gstCode] || "");
  };

  const handleSubmit = () => {
    if (!name || !shortName) {
      alert("Please enter name and short name");
      return;
    }

    onSubmit({
      name,
      shortName,
      address,
      city,
      state,
      pin,
      gstin,
      gstState,
      msmeRegNo,
      email,
      phone,
    });

    setName("");
    setShortName("");
    setAddress("");
    setCity("");
    setState("");
    setPin("");
    setGstin("");
    setGstState("");
    setMsmeRegNo("");
    setEmail("");
    setPhone("");

    onClose();
  };

  const handleTabClick = (tabName) => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  return (
    <div className={`Vendor-modal ${show ? "show" : ""}`}>
      <div className="vendor-modal-content1">
        <span className="vendor-close" style={{ position: "right", width: "content-fit" }} onClick={onClose}>
          &times;
        </span>
        <h2 style={{ padding: "0px", textAlign: "center" }}>Add New Vendor</h2>
        <div className="vendor-form" style={{ padding: "10px 40px" }}>
          <div style={{ display: "flex", gap: "60px" ,alignItems:"center"}}>
            <div className="form-group">
              <label className="vendor-text">Name:</label>
              <input
                type="text"
                className="vendor-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ gap: "26px" }}>
              <label className="vendor-text">ShortName:</label>
              <input
                type="text"
                className="vendor-input"
                style={{width:"190px"}}
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "60px" }}>
            <div className="form-group" style={{ gap: "26px" }}>
              <label className="vendor-text">Email:</label>
              <input
                type="email"
                className="vendor-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ gap: "26px" }}>
              <label className="vendor-text">Phone:</label>
              <input
                type="text"
                className="vendor-input"
                style={{width:"190px"}}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div
            className="tab-buttons"
            style={{
              display: "flex",
              borderBottom: "0.5px solid #C0C0C0",
              // border: "0.5px solid #C0C0C0",
              borderLeft: "none",
              borderRight: "none",
              // lineHeight:  "1px",
              gap: "26px",
              padding: "0px",
              marginTop: "6px",
            }}
          >
            <button
              style={{
                width: "160px",
                border: "none",
                background: "white",
                color: "blue",
                cursor: "pointer",
                padding: "0px",
                transition: "background 0.3s, color 0.3s",
              }}
              onClick={() => handleTabClick("address")}
              className={activeTab === "address" ? "active" : ""}
              onMouseEnter={(e) => {
                e.target.style.background = "#007bff";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "blue";
              }}
            >
              Address
            </button>
            <button
              style={{
                width: "160px",
                border: "none",
                background: "white",
                color: "blue",
                cursor: "pointer",
                transition: "background 0.3s, color 0.3s",
              }}
              onClick={() => handleTabClick("statutory")}
              className={activeTab === "statutory" ? "active" : ""}
              onMouseEnter={(e) => {
                e.target.style.background = "#007bff";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "blue";
              }}
            >
              Statutory
            </button>
          </div>
          {activeTab === "address" && (
            <div className="vendor-tab-con">
              <div
                style={{
                  display: "flex",
                  gap: "60px",
                  marginTop: "26px",
                  alignItems: "center",
                }}
              >
      <div className="form-tab-group" style={{ gap: "26px" }}>
  <label style={{minWidth:"110px"}}>Address:</label>
  <textarea
    className="vendor-tab-input"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    rows="4" // You can adjust the number of rows as needed
    style={{ resize: "vertical", width: "400px" }} 
  ></textarea>
</div>
                <div className="form-tab-group" style={{ gap: "26px" }}>
                  <label style={{minWidth:"110px"}}>State:</label>
                  <input
                    type="text"
                    className="vendor-tab-input"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "146px",
                  marginTop: "28px",
                  alignItems: "center",
                }}
              >
                <div className="form-tab-group" style={{ gap: "26px" }}>
                  <label style={{minWidth:"110px"}}>City:</label>
                  <input
                    type="text"
                    className="vendor-tab-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="form-tab-group" style={{ gap: "26px" }}>
                  <label style={{minWidth:"110px"}}>Pin:</label>
                  <input
                    type="text"
                    className="vendor-tab-input"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === "statutory" && (
            <div className="vendor-tab2-con" style={{ marginTop: "28px" }}>
            <div style={{display:"flex",gap:"150px"}}>
              <div className="form-tab2-group" style={{gap:"26px"}}>
                <label style={{minWidth:"110px"}}>GSTIN:</label>
                <input
                  type="text"
                  className="vendor-tab2-input"
                  value={gstin}
                  onChange={handleGstinChange}
                />
              </div>
              <div className="form-tab2-group" style={{ gap: "26px" }}>
                <label style={{minWidth:"110px"}}>GST State:</label>
                <input
                  type="text"
                  className="vendor-tab2-input"
                  value={gstState}
                  readOnly
                />
              </div>
              </div>
              <div className="form-tab2-group" style={{ gap: "23px" }}>
                <label style={{minWidth:"110px"}}>MSME Reg No.:</label>
                <input
                  type="text"
                  className="vendor-tab2-input"
                  value={msmeRegNo}
                  onChange={(e) => setMsmeRegNo(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="button-container" style={{ marginTop: activeTab ? "10px" : "90px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button className="vendor-submit-btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


export default Vendor;
