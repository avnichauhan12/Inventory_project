// ItemGroup.jsx
import React, { useState } from 'react';
import "./Itemgroup.css";

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

    return (
      <div className="item-group-container">
        <div className="container1">
          <h1>Item Groups</h1>
          <button onClick={handleAddGroupClick}>Add New Group</button>
        </div>
        <hr />
        <div className="container2">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">Search</button>
        </div>
  
        {/* Display item groups in a table */}
        <table>
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Short Name</th>
              <th>Attribute 1</th>
              <th>Attribute 2</th>
              <th>Attribute 3</th>
              <th>Attribute 4</th>
              <th>Attribute 5</th>
              <th>Attribute 6</th>
            </tr>
          </thead>
          <tbody>
            {itemGroups.map((group, index) => (
              <tr key={index}>
                <td>{group.name}</td>
                <td>{group.shortName}</td>
                <td>{group.attribute1}</td>
                <td>{group.attribute2}</td>
                <td>{group.attribute3}</td>
                <td>{group.attribute4}</td>
                <td>{group.attribute5}</td>
                <td>{group.attribute6}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {showAddGroupModal && (
  <AddGroupModal show={showAddGroupModal} onClose={handleAddGroupClose} onSubmit={handleAddGroupSubmit} />
)}

      </div>
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
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Add New Group</h2>
          <label>Group Name:</label>
          <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
          <label>Short Name:</label>
          <input type="text" value={groupShortName} onChange={(e) => setGroupShortName(e.target.value)} />
          <label>Attribute 1:</label>
          <input type="text" value={attribute1} onChange={(e) => setAttribute1(e.target.value)} />
          <label>Attribute 2:</label>
          <input type="text" value={attribute2} onChange={(e) => setAttribute2(e.target.value)} />
          <label>Attribute 3:</label>
          <input type="text" value={attribute3} onChange={(e) => setAttribute3(e.target.value)} />
          <label>Attribute 4:</label>
          <input type="text" value={attribute4} onChange={(e) => setAttribute4(e.target.value)} />
          <label>Attribute 5:</label>
          <input type="text" value={attribute5} onChange={(e) => setAttribute5(e.target.value)} />
          <label>Attribute 6:</label>
          <input type="text" value={attribute6} onChange={(e) => setAttribute6(e.target.value)} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    );
};

export default ItemGroup;
