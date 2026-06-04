import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export default function AdminPanel() 
{
  const [items, setItems] = useState([]);

  //Adding form inputs for making a new SCP record
  const [newRecord, setNewRecord] = useState({
    item: "",
    class: "",
    description: "",
    containment: "",
    reference: "",
    image: ""
  });

  //Holds the SCP record currently being edited
  const [editRecord, setEditRecord] = useState(null);

  //Load all SCP records when the compontent has finished loading
  useEffect(() => {
    //Fetch all rows from SCP Supabase Table
    const fetchItems = async () => {
      const { data, error } = await supabase.from("SCP").select("*");
      if (error) {
        console.error(error);
      } else {
        setItems(data);
      }
    };
    fetchItems();
  }, []);

  //Funciton for adding a new SCP Entry to the SCP database
  const addRecord = async () => {
    await supabase.from("SCP").insert([newRecord]);
    setNewRecord({ item: "", class: "", description: "", containment: "", reference: "", image: "" });
    window.location.reload();
  };

  //Function for deleting a SCP Entry from the SCP database
  const deleteRecord = async (id) => {
    await supabase.from("SCP").delete().eq("id", id);
    window.location.reload();
  };

  //Switch UI to edit mode for a selected SCP record
  const startEditing = (item) => {
    setEditRecord(item);
  };

  //Save the edits made to a SCP record and update the database
  const saveEdit = async (id) => {
    await supabase.from("SCP").update(editRecord).eq("id", id);
    setEditRecord(null);
    window.location.reload();
  };

  //Split layout to two - left side for the SCP List and Right side for the Add New SCP form
  return (
    <div className="admin-layout">

      {/* Left side - List of all SCP records with Edit and Delete options */}
      <div className="admin-left">
        <h2>Admin Section</h2>

        <ul>
          {/* Loop through all SCP items */}
          {items.map((item) => (
            <li key={item.id}>
              {/* If this item is being edited show input fields */}
              {editRecord && editRecord.id === item.id ? (
                <div>
                  <input value={editRecord.item} onChange={(e)=>setEditRecord({...editRecord, item: e.target.value})} />
                  <input value={editRecord.class} onChange={(e)=>setEditRecord({...editRecord, class: e.target.value})} />
                  <input value={editRecord.description} onChange={(e)=>setEditRecord({...editRecord, description: e.target.value})} />
                  <input value={editRecord.containment} onChange={(e)=>setEditRecord({...editRecord, containment: e.target.value})} />
                  <input value={editRecord.reference} onChange={(e)=>setEditRecord({...editRecord, reference: e.target.value})} />
                  <input value={editRecord.image} onChange={(e)=>setEditRecord({...editRecord, image: e.target.value})} />
                  <button onClick={() => saveEdit(item.id)}>Save</button>
                  <button onClick={() => setEditRecord(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p>{item.item}</p>
                  <button onClick={() => startEditing(item)}>Edit</button>
                  <button onClick={() => deleteRecord(item.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side- Form for adding a new SCP record to the database */}
      <div className="admin-right">
        <h3>Add New SCP</h3>

        {/* Input fields for all the properties of a SCP record */}
        <input value={newRecord.item} onChange={(e)=>setNewRecord({...newRecord, item: e.target.value})} placeholder="Item" />
        <input value={newRecord.class} onChange={(e)=>setNewRecord({...newRecord, class: e.target.value})} placeholder="Class" />
        <input value={newRecord.description} onChange={(e)=>setNewRecord({...newRecord, description: e.target.value})} placeholder="Description" />
        <input value={newRecord.containment} onChange={(e)=>setNewRecord({...newRecord, containment: e.target.value})} placeholder="Containment" />
        <input value={newRecord.reference} onChange={(e)=>setNewRecord({...newRecord, reference: e.target.value})} placeholder="Reference" />
        <input value={newRecord.image} onChange={(e)=>setNewRecord({...newRecord, image: e.target.value})} placeholder="Image URL" />

        {/* Button to Add the new SCP record to the database */}
        <button onClick={addRecord}>Add SCP</button>
      </div>

    </div>
  );
}
