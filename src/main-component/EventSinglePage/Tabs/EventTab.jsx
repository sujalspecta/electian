import React, { useState } from "react";
import Description from "./description";
import Donation from "./Donation";
import Comments from "./Comments";

const EventTab = ({ EventsDetails }) => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <div>
      {/* Tabs */}
      <div className="wpo-event-details-tab">
        <ul className="nav nav-tabs">

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "1" ? "active" : ""}`}
              onClick={() => setActiveTab("1")}
              type="button"
            >
              Description
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "2" ? "active" : ""}`}
              onClick={() => setActiveTab("2")}
              type="button"
            >
              Donations
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "3" ? "active" : ""}`}
              onClick={() => setActiveTab("3")}
              type="button"
            >
              Comments
            </button>
          </li>

        </ul>
      </div>

      {/* Tab Content */}
      <div className="wpo-event-details-text mt-4">

        {activeTab === "1" && (
          <div className="row">
            <div className="col-12">
              <Description EventsDetails={EventsDetails} />
            </div>
          </div>
        )}

        {activeTab === "2" && (
          <div className="row">
            <div className="col-12">
              <Donation />
            </div>
          </div>
        )}

        {activeTab === "3" && (
          <div className="row">
            <div className="col-12">
              <Comments />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EventTab;
