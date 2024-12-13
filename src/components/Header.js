import React, { useState, useEffect, useRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdMenu, MdOutlineClose } from "react-icons/md";

const Header = ({ setSearch, cartCount, wishlistCount }) => {
  const [menuVisibilty, setMenuVisibilty] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const menuClick = () => {
    setMenuVisibilty(!menuVisibilty);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisibilty(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value); // Update search state in parent
    if (value.trim()) {
      navigate("/product"); // Navigate to product page on input change
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="header">
        <div className="header-menu" onClick={menuClick}>
          <MdMenu className="my-icon-menu" />
        </div>

        <div className="header-logo">CraveCart</div>

        <div className="header-search">
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          />
        </div>

        <div className="header-link">
          <div className="header-link-home">
            <Link to={"/"}>Home</Link>
          </div>
          <div className="header-link-products">
            <Link to={"/product"}>Products</Link>
          </div>
          <div className="header-link-wishlist">
            <Link to={"/wishlist"}>
            <div className="cart-icon-container">
              <IoIosHeartEmpty className="my-icon"/>
                {wishlistCount > 0 && 
                  <div className="wish_num">{wishlistCount}</div>
                }
    
              </div>
            </Link>
          </div>
          <div className="header-link-cart">
            <Link to={"/cart"} className="cart-link">
              <div className="cart-icon-container">
                <FiShoppingCart className="my-icon" />
                {cartCount > 0 && <div className="cart_num">{cartCount}</div>}
              </div>
            </Link>

          </div>
        </div>
        <div className="menu-display-cart">
          <Link to={"/cart"}>
          <div className="cart-icon-container">
                <FiShoppingCart className="my-icon" />
                {cartCount > 0 && <div className="cart_num">{cartCount}</div>}
              </div>
          </Link>
        </div>
      </div>

      {/* Menu Display */}
      <div ref={menuRef} className={`menu-display ${menuVisibilty ? "visible" : ""}`}>
        <div className="menu-display-division">
          <div className="menu-display-home">
            <Link to={"/"}>Home</Link>
          </div>
          <div className="menu-display-products">
            <Link to={"/product"}>Products</Link>
          </div>
          <div className="menu-display-wishlist">
            <Link to={"/wishlist"}>Wishlist    ({wishlistCount})</Link>
          </div>
        </div>

        {/* Close menu button */}
        <div className="menu-exit" onClick={menuClick}>
          <MdOutlineClose className="my-icon-cross" />
        </div>
      </div>
    </>
  );
};

export default Header;
