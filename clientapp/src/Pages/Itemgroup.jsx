import React, { useState } from 'react';
import "./Itemgroup.css";
import Sidebar from '../Components/Sidebar';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ItemGroup = () => {
    const [showAddGroupModal, setShowAddGroupModal] = useState(false);
    const [itemGroups, setItemGroups] = useState([]);

    const handleAddGroupClick = () => {
      console.log("Add Group Clicked");
      setShowAddGroupModal(true);
    };

    const handleAddGroupClose = () => {
      console.log("Close Group Clicked");
      setShowAddGroupModal(false);
    };

    console.log("showAddGroupModal:", showAddGroupModal);

    const handleAddGroupSubmit = (groupData) => {
      setItemGroups([...itemGroups, groupData]);
      setShowAddGroupModal(false);
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
        { headerName: 'Group Name', field: 'name' },
        { headerName: 'Short Name', field: 'shortName' },
        { headerName: 'Attribute 1', field: 'attribute1' },
        { headerName: 'Attribute 2', field: 'attribute2' },
        { headerName: 'Attribute 3', field: 'attribute3' },
        { headerName: 'Attribute 4', field: 'attribute4' },
        { headerName: 'Attribute 5', field: 'attribute5' },
        { headerName: 'Attribute 6', field: 'attribute6' },
    ];

    return (
      <>
        <Sidebar/>
        <div className="item-group-container">
            <div className="container1">
                <h1 className='item-group'>Item Groups</h1>
                <button className="btn" onClick={handleAddGroupClick}>Add New Group</button>
            </div>
            <hr />
        

            {/* AG Grid */}
            <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
            <div className="search-bar" style={{display:'flex',gap:'20px',justifyContent: 'flex-end'}}>
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button className="search-button" style={{width:'fit-content',margin:'2px'}}>Search</button>
                </div>
                <AgGridReact
                    gridOptions={gridOptions}
                    columnDefs={columnDefs}
                    rowData={itemGroups}
                />
            </div>

            {showAddGroupModal && (
                <AddGroupModal show={showAddGroupModal} onClose={handleAddGroupClose} onSubmit={handleAddGroupSubmit} />
            )}

        </div>
      </>
    );
};

const AddGroupModal = ({show, onClose, onSubmit }) => {
    const [groupName, setGroupName] = useState('');
    const [groupShortName, setGroupShortName] = useState('');
    const [attribute1, setAttribute1] = useState('');
    const [attribute2, setAttribute2] = useState('');
    const [attribute3, setAttribute3] = useState('');
    const [attribute4, setAttribute4] = useState('');
    const [attribute5, setAttribute5] = useState('');
    const [attribute6, setAttribute6] = useState('');
  
    console.log("AddGroupModal mounted");

    const handleSubmit = () => {
        console.log("Submit clicked");
        if (!groupName || !groupShortName) {
            alert('Please enter group name and short name');
            return;
        }
    
        onSubmit({
            name: groupName,
            shortName: groupShortName,
            attribute1,
            attribute2,
            attribute3,
            attribute4,
            attribute5,
            attribute6,
        });
    
        setGroupName('');
        setGroupShortName('');
        setAttribute1('');
        setAttribute2('');
        setAttribute3('');
        setAttribute4('');
        setAttribute5('');
        setAttribute6('');
    
        onClose();
    };
  
    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content1">
                <span className="item-group-close" onClick={onClose}>&times;</span>
                <h2 style={{padding:'0px',textAlign:'center'}}>Add New Group</h2>
                <br></br>
                <div className='group-con' style={{display: 'flex',gap: '66px'}}>
                    <div style={{display:'flex',marginLeft:'40px',alignItems:'center',gap:'6px'}}>
                        <label style={{minWidth:"136px"}}>Group Name:</label>
                        <input  className="group-input" type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                        <label style={{minWidth:"136px"}}>Short Name:</label>
                        <input className="group-input" type="text" value={groupShortName} onChange={(e) => setGroupShortName(e.target.value)} />
                    </div>
                </div>
                <div className='group-con' style={{display: 'flex',gap: '66px'}}>
                    <div style={{display:'flex',marginLeft:'40px',alignItems:'center',gap:'6px'}}>
                        <label style={{minWidth:"136px"}} >Attribute 1:</label>
                        <input className="group-input" type="text" value={attribute1} onChange={(e) => setAttribute1(e.target.value)} />
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                        <label style={{minWidth:"136px"}}>Attribute 2:</label>
                        <input className="group-input" type="text" value={attribute2} onChange={(e) => setAttribute2(e.target.value)} />
                    </div>
                    </div>
                    <div className='group-con' style={{display: 'flex',gap: '66px'}}>
                    <div style={{display:'flex',marginLeft:'40px',alignItems:'center',gap:'6px'}}>
                        <label style={{minWidth:"136px"}}>Attribute 3:</label>
                        <input className="group-input" type="text" value={attribute3} onChange={(e) => setAttribute3(e.target.value)} />
                    </div>
                

                    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                        <label style={{minWidth:"136px"}}>Attribute 4:</label>
                        <input className="group-input" type="text" value={attribute4} onChange={(e) => setAttribute4(e.target.value)} />
                    </div>
                    </div>
                    <div className='group-con' style={{display: 'flex',gap: '66px'}}>
                    <div style={{display:'flex',marginLeft:'40px',alignItems:'center',gap:'6px'}}>
                        <label style={{minWidth:"136px"}}>Attribute 5:</label>
                        <input className="group-input"  type="text" value={attribute5} onChange={(e) => setAttribute5(e.target.value)} />
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                        <label style={{minWidth:"136px"}}>Attribute 6:</label>
                        <input className="group-input" type="text" value={attribute6} onChange={(e) => setAttribute6(e.target.value)} />
                    </div>
                </div>
                <div className="button-container" style={{ marginTop:"16px",marginRight:"36px",display: "flex", justifyContent: "flex-end", gap: "10px" }}>
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

export default ItemGroup;
