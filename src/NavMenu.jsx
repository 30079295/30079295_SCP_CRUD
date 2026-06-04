import { useState, useEffect } from "react";
import { Link } from "react-router";
import { supabase } from "./supabase";

export default function NavMenu() {
  //Store all SCP items from the Database to display in the sidebar menu
  const [items, setItems] = useState([]);

  //Load all SCP list when the component has finished loading
  useEffect(() => {
    //Fetch only ID and Item Name (Sorted by ID in ascending order) from SCP Supabase Table to display in the sidebar menu
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("SCP")
        .select("id, item")
        .order("id", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        //Save results into State
        setItems(data);
      }
    };

    fetchItems();
  }, []);

  //Sidebar menu showing all SCP items
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Item List</h2>

      <ul>
        {/* Loop through SCP items and create links to their detail pages */}
        {items.map((scp) => (
          <li key={scp.id}>
            {/* Link to the selected SCP detail page using its ID */}
            <Link className="sidebar-link" to={`/item/${scp.id}`}>
              {scp.item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
