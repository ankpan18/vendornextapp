'use client';
import React,{useState} from 'react';
import axios from 'axios';
import styles from './create.module.css';
import { BASE_URL } from 'src/helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from "next-auth/react"


function CreateVendor(){
  const [vendorInfo,setVendorInfo]=useState({name:"",accno:"",address1:"",address2:"",bankname:"",city:"",zipcode:"",country:""});
  const [show, setShow] = useState(false);
  const [success,setSuccess]=useState(false);
  function handleChange(e) {
    setVendorInfo((data) => ({ ...data, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e)
  {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/vendorapp`,vendorInfo)
    .then((res)=>{
      setVendorInfo({name:"",accno:"",address1:"",address2:"",bankname:"",city:"",zipcode:"",country:""});
      console.log(res.data.message);
      toast.success('Vendor Saved Successfully', {duration: 1000});
      //setSuccess(true);  
    })
      .catch((err)=>{
        console.log("Unable to save Vendor Information");
        console.log(err.message);
        toast.error('Technical Error. Try entering the data correctly. Your account number might be associated with another vendor.');
        //setShow(true);
      }); 
  }
  const { data: session,status } = useSession();
  
  if (session || status==="loading") {
  return (
    <div className={styles.maincont}>
      {/* {show?(
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Technical Error
        </Alert.Heading>
        <p>
          Try entering the data correctly. Your account number might be associated with another vendor.
        </p>
      </Alert>) :("")}

      {
        success?(<Alert variant="success" onClose={() => setSuccess(false)} dismissible>
        <Alert.Heading>Vendor Saved Successfully
        </Alert.Heading>
      </Alert>):("")
      } */}
      <Toaster/>
      <h2 className={styles.heading}>Create Vendor</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.box1}>
          <div>
        <label className={styles.label} htmlFor='name'>Vendor Name</label>
        <input className={styles.input} type='text' name='name' id='name' value={vendorInfo.name} onChange={handleChange} placeholder='Vendor Name' required></input>
        </div>
        <div>
        <label className={styles.label} htmlFor='accno'>Account No.</label>
        <input className={styles.input} type='number' name='accno' id='accno' value={vendorInfo.accno} onChange={handleChange} placeholder='Account Number' required></input>
        </div>
        </div>
        <br/>
        <div className={styles.box1}>
          <div className={styles.pack}>
        <label className={styles.label} htmlFor='address1'>Address Line 1</label>
        <textarea className={styles.box2} type='text' name='address1' id='address1' value={vendorInfo.address1} onChange={handleChange} placeholder='Address Line 1' required></textarea>
        </div>
        </div>
        <br/>
        <div className={styles.box1}>
          <div className={styles.pack}>
        <label className={styles.label} htmlFor='address2'>Address Line 2</label>
        <textarea className={styles.box2} type='text' name='address2' id='address2' value={vendorInfo.address2} onChange={handleChange} placeholder='Address Line 2'></textarea>
        </div>
        </div>
        <br/>
        
        <div className={styles.box1}>
          <div>
        <label className={styles.label}  htmlFor='bankname'>Bank Name</label>
        <input className={styles.input}  type='text' name='bankname' id='bankname' value={vendorInfo.bankname} onChange={handleChange} placeholder='Bank Name' required></input>
        </div>
        <div>
        <label className={styles.label}  htmlFor='city'>City</label>
        <input className={styles.input}  type='text' name='city' id='city' value={vendorInfo.city} onChange={handleChange} placeholder='City' required></input>
        </div>
        </div>
        <br/>
        <div className={styles.box1}>  
        <div>
        <label className={styles.label} htmlFor='zipcode'>Zipcode</label>
        <input className={styles.input} type='number' name='zipcode' id='zipcode' value={vendorInfo.zipcode} onChange={handleChange} placeholder='Zipcode' required></input>
        </div>
         
        <div>
        <label className={styles.label} htmlFor='country'>Country</label>
        <input className={styles.input} type='text' name='country' id='country' value={vendorInfo.country} onChange={handleChange} placeholder='Country' required></input>
        </div>
        </div>
        <br/>
        <button className={styles.button}>Submit</button>
      </form>
    </div>
  )
}
if(status==="unauthenticated")
{ 
return(<div className={styles.warning}>Please Sign In in order to continue creating Vendor</div>)
}
}

export default CreateVendor