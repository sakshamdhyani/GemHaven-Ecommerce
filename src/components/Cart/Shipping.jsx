import React ,{Fragment , useState}from 'react';
import "./Shipping.css";
import { useDispatch , useSelector } from 'react-redux';
import MetaData from '../Layout/MetaData.jsx';
import { PinDrop } from '@mui/icons-material';
import { Home } from '@mui/icons-material';
import { LocationCity } from '@mui/icons-material';
import { Public } from '@mui/icons-material';
import { Phone } from '@mui/icons-material';
import { TransferWithinAStation } from '@mui/icons-material';
import {Country , State} from "country-state-city";
import CheckoutSteps from "./CheckoutSteps.jsx"
import { useNavigate } from 'react-router';
import Loader from '../Layout/Loader/Loader.jsx';
import { saveShippingInformation } from '../../redux/slices/cartSlice.js';
import toast from 'react-hot-toast';


const Shipping = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.userAuth);
    const {shippingInfo} = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);


    const shippingSubmit = (event) => {
        event.preventDefault();

        if(phoneNo.length < 10 || phoneNo.length > 10) {
            toast.error("Phone Number should be of 10 digits.");
            return;
        }

        dispatch(
            saveShippingInformation({address , city , state , country , pinCode , phoneNo})
        );
        
        navigate("/order/confirm");
    };

  return (
    <Fragment>
        {loading ? <Loader/> : 

        <Fragment>
            <MetaData title="Shipping Details" />

            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className='shippingHeading' >Shipping Details</h2>

                    <form
                    className='shippingForm'
                    encType='multipart/form-data'
                    onSubmit={shippingSubmit}
                    >

                        <div>
                            <Home/>
                            <input 
                            type="text" 
                            placeholder='Address'
                            required
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}   
                            />
                        </div>

                        <div>
                            <LocationCity/>
                            <input 
                            type="text" 
                            placeholder='City'
                            required
                            value={city}
                            onChange={(event) => setCity(event.target.value)}   
                            />
                        </div>

                        <div>
                            <PinDrop/>
                            <input 
                            type="number" 
                            placeholder='Pin Code'
                            required
                            value={pinCode}
                            onChange={(event) => setPinCode(event.target.value)}   
                            />
                        </div>

                        <div>
                            <Phone/>
                            <input 
                            type="number" 
                            placeholder='Phone Number'
                            required
                            value={phoneNo}
                            onChange={(event) => setPhoneNo(event.target.value)}   
                            size="10"
                            />
                        </div>

                        <div>
                            <Public/>
                            
                            <select 
                            required
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                            >

                            <option value="">Country</option>

                            {Country && 
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        {country && (
                            <div>
                                <TransferWithinAStation/>

                                <select 
                                    required
                                    value={state}
                                    onChange={(event) => setState(event.target.value)}
                                >

                                <option value="">State</option>

                                {State && 
                                    State.getStatesOfCountry(country).map((item) => (

                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>

                                    ))}

                                </select>
                            </div>
                        )}

                        <input 
                        type="submit"
                        value="Continue"
                        className='shippingBtn'
                        disabled = {state ? false : true}
                        />

                    </form>
                </div>
            </div>

        </Fragment>
        
    }
    </Fragment>
  )
}

export default Shipping