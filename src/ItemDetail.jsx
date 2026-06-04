import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { supabase } from "./supabase";
import NavMenu from "./NavMenu";

function ItemDetail() {
  //Get SCP ID fom the URL parameters to know which SCP details to load from the database
  const { id } = useParams();

  //Store the selected SCPs data
  const [itemData, setItemData] = useState(null);

  //Load all SCP Detao;s when the ID changes (When a new SCP is selected from the sidebar menu)
  useEffect(() => {
    //Fetch one SCP by the ID 
    const fetchItemDetails = async () => {
      const { data, error } = await supabase
        .from("SCP")
        .select("*")
        .eq("id", id)
        .single();

      //Debugging Log to check the data being fetched from the database
      console.log("SUPABASE DATA:", data);

      if (error) console.error(error);
      //Save the SCP data into State to display on the page
      else setItemData(data);
    };

    fetchItemDetails();
  }, [id]);

  //Main content layout with the NavMenu on the left and the SCP details on the right
  return (
    <div className="content-layout">
      <NavMenu />

      {/* If the SCP data has been loaded, display the details, otherwise show a loading message */}
      {itemData ? (
        <div className="content-panel">
          {/* Only show image if one exists for the SCP record in the database */}
          {itemData.image && (
            <div className="image-panel">
              <img
                src={itemData.image}
                alt={itemData.item}
                className="detail-image"
              />
            </div>
          )}

          <h2 className="featured-title">Featured Item:</h2>
          <h1 className="scp-title">{itemData.item}</h1>

          <h3>Class:</h3>
          <p className="class-data">{itemData.class}</p>

          <h3>Special Containment Procedures:</h3>
          <p className="info-text">{itemData.containment}</p>

          <h3>Description:</h3>
          <p className="info-text">{itemData.description}</p>

          <h3>Reference:</h3>
          <p className="reference-text">{itemData.reference}</p>
        </div>
      ) : (
        <div className="content-panel">
          {/* Show this message while the SCP data is being loaded from the database */}
          <p>Loading SCP data...</p>
        </div>
      )}
    </div>
  );
}

export default ItemDetail;
