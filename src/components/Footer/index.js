import './index.css'
import {FaFacebook, FaInstagram} from 'react-icons/fa'
import {FaXTwitter} from 'react-icons/fa6'

const Footer = () => (
  <footer className="footer-container">
    <p className="footer-text">For any queries, contact +91 9876543210</p>

    <ul className="footer-icons">
      <li>
        <FaFacebook size="25" />
      </li>
      <li>
        <FaXTwitter size="25" />
      </li>
      <li>
        <FaInstagram size="25" />
      </li>
    </ul>

    <p className="footer-copy">© 2023 NxtMart Grocery Supplies Pvt Ltd</p>
  </footer>
)

export default Footer
