import "../css/AboutUs.css";
import createdBy from './icons/createdBy.svg';
import "@fontsource/patua-one";
import "@fontsource/lato";

const AboutUs = () => {

    return (
      <div class="row AUContainer">
        <div class="column">
        <h1 >About Us</h1>
        
          <body> Everyone could use an extra friend to lend them something in times of need... </body>
          <h2> Our Solution </h2>
          <body>Friend in Need connects students to get them the things they need. </body>
          <h2> Mission </h2>
          <body>Provide a community-based app that aims to foster communal wellness and make students' daily lives easier. </body>
        </div>
        <div class="column">
          <h2> Created by </h2>
          <img src={createdBy}></img>
          {/* <GoogleButton/>
          <YellowButton/> */}
        </div>
      </div>
    );
}
export default AboutUs;