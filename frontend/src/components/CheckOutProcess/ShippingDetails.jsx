import React, { useState } from "react";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import CheckOutProcessPage from "../../pages/CheckOutProcessPage";

const ShippingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const alert = useAlert()
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [city, setCity] = useState(shippingInfo.city);
  const [phone, setPhone] = useState(shippingInfo.phone);

  const shipppingSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 11 || phone.length > 11) {
      alert("Phone Number must be 11 digits");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, country, pinCode, phone, state })
    );
    navigate("/order/confirm");
  };

  return (
    <div>
      <>
        {/* <MetaData title="Shipping Details" /> */}
        <CheckOutProcessPage aciveStep={0} />
        <div className="shippingContainer">
          <div className="shippingBox">
            <h2 className="shippingHeading">Shipping Details</h2>
            <form
              className="shippingForm"
              encType="multipart/form-data"
              onSubmit={shipppingSubmit}
            >
              <div className="sd">
                <HomeIcon />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <LocationCityIcon />
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <PinDropIcon />
                <input
                  type="text"
                  placeholder="Pin Code"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>
              <div>
                <PhoneIcon />
                <input
                  type="text"
                  placeholder="Phone Number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  size="10"
                />
              </div>
              <div>
                <PublicIcon />
                <input
                  type="text"
                  placeholder="Country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <PublicIcon />
                <input
                  type="text"
                  placeholder="State"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Continue"
                className="shipppingBtn"
                disabled={state ? false : true}
              />
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default ShippingDetails;
