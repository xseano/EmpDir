import Facebook from "../img/Facebook.svg";
import Instagram from "../img/Instagram.svg";
import Twitter from "../img/Twitter.svg";

const Footer = ({ }) => {

    return (
        <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-4 text-left copyright">
                    <ul class="list-inline">
                        <li class="list-inline-item">© 2022 XSEANO.IO</li>
                    </ul>
                </div>
                <div class="col-lg-4 text-center socialmedia">
                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <a href="#"><img src={Facebook} /></a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#"><img src={Instagram} /></a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#"><img src={Twitter} /></a>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-4 text-right otherlinks">
                    <ul class="list-inline">
                        <li class="list-inline-item">Privacy Policy</li>
                        <li class="list-inline-item">Terms of Use</li>
                    </ul>
                </div>
            </div>
        </div>
      </footer>
    );

};

export default Footer;