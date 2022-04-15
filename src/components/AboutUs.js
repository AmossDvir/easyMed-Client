import React from "react";
import amosspic from "../images/Amoss.png";
import omerpic from "../images/Hamotz.png";
import orpic from "../images/Or.png"
import amirpic from "../images/Amir.png"
import yonatanpic from "../images/Yonatan.png"
import "./AboutUs.css"

const AboutUs = () => {
  return (
    <div className="main-div">
      <div className="about-section">
        <h1>EasyMed, Who are we?</h1>
        <p>A young innovative startup, trying to improve the PRODUCTIVITY of Health systems.</p>
      </div>
      <div className="secondery-div">


        <h2 className="header-team">Our Team</h2>
        <div className="row">
          <div className="column">
            <div className="card">
              <div className="container">
                <img className="amosspic" src={amosspic} alt="Creator" />
                <h2>Amoss Dvir</h2>
                <p className="title">CEO & Master</p>
                <p>3rd year Computer Science student at the Hebrew University</p>
                <p>amoss.dvir@mail.huji.ac.il</p>
                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <img className="orpic" src={orpic} alt="Creator"/>
              <div className="container">
                <h2>Ore Snir</h2>
                <p className="title">CTO</p>
                <p>3rd year Computer Science student at the Hebrew University</p>
                <p>ore.snir@mail.huji.ac.il</p>
                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <img className="omerpic" src={omerpic} alt="Creator"/>
              <div className="container">
                <h2>Omer Beeri-Shani</h2>
                <p className="title">Software Manager</p>
                <p>2nd year Electrical Engeneer student at the Hebrew University</p>
                <p>omer.beerishani@mail.huji.ac.il</p>
                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img className="amirpic" src={amirpic} alt="Creator"/>
              <div className="container">
                <h2>Amir Kelman</h2>
                <p className="title">Product Manager</p>
                <p>2nd year Computer Science student at the Hebrew University</p>
                <p>amir.kelman@mail.huji.ac.il</p>
                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img className="yonatanpic" src={yonatanpic} alt="Creator"/>
              <div className="container">
                <h2>Yonatan Sugarmen</h2>
                <p className="title">Chairman & Founder</p>
                <p>2nd year Electrical Engeneer student at the Hebrew University</p>
                <p>yonatan.sugarmen@mail.huji.ac.il</p>
                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs