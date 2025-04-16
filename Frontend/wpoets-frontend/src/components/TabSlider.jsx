import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TabSlider.css";
import img1 from '../Icons/DL-Learning-1.jpg';
import img2 from '../Icons/DL-Technology.jpg';
import img3 from '../Icons/DL-Communication.jpg';
import learning from '../Icons/DL-learning.svg';
import plus from '../Icons/plus-01.svg';
import minus from '../Icons/minus-01.svg';

const imageMap = {
  Learning: img1,
  Technology: img2,
  Communication: img3,
};

const TabSlider = () => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Learning");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const [openTab, setOpenTab] = useState("Learning");

  useEffect(() => {
    axios.get("https://qjxc217k-5000.inc1.devtunnels.ms/api/projects") 
      .then((response) => {
        const grouped = response.data.reduce((acc, curr) => {
          if (!acc[curr.category]) acc[curr.category] = [];
          acc[curr.category].push({
            title: curr.title,
            tag: curr.tag,
            image: imageMap[curr.category] || img1 
          });
          return acc;
        }, {});
        setData(grouped);
      })
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
      });

    const handleResize = () => setIsMobile(window.innerWidth < 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tabs = Object.keys(data);
  const slides = data[isMobile ? openTab : activeTab] || [];
  const currentSlide = slides[activeIndex] || {};

  return (
    <>
      {isMobile ? (
        <div className="slider-wrapper">
          {tabs.map((tab) => (
            <div key={tab} className="accordion-tab">
              <button
                className={`tab-btn ${tab === openTab ? "active" : ""}`}
                onClick={() => {
                  setOpenTab(openTab === tab ? "" : tab);
                  setActiveIndex(0);
                }}
              >
                <span className="icon">
                  <img src={learning} className="icon-style" alt="icon" />
                </span>
                {tab}
                <span className="toggle-icon">
                  <img src={openTab === tab ? minus : plus} alt="toggle" />
                </span>
              </button>

              {openTab === tab && (
                <div className="accordion-content">
                  <div className="content-column">
                    <div className="tag">{currentSlide.tag}</div>
                    <h3 className="desc">{currentSlide.title}</h3>
                    <a href="#" className="learn-more">Learn More →</a>
                  </div>
                  <div className="image-column">
                    <img src={currentSlide.image} alt="visual" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="slider-wrapper">
          <div className="tabs-column">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${tab === activeTab ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab);
                  setActiveIndex(0);
                }}
              >
                <span className="icon">
                  <img src={learning} className="icon-style" alt="icon" />
                </span>
                {tab}
              </button>
            ))}
          </div>

          {slides.length > 0 && (
            <>
              <div className="content-column">
                <div className="tag">{currentSlide.tag}</div>
                <h3 className="desc">{currentSlide.title}</h3>
                <a href="#" className="learn-more">Learn More →</a>
              </div>
              <div className="image-column">
                <img src={currentSlide.image} alt="visual" />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TabSlider;
