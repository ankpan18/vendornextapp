'use client';
import React,{useEffect, useState} from 'react';
import axios from "axios";
import styles from '../app/create/create.module.css';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';

const UpdateVendor = ({_id,closeHandler,updateHandler}) => {
  const [vendorInfo,setVendorInfo]=useState({name:"",accno:"",address1:"",address2:"",bankname:"",city:"",zipcode:"",country:""});
  const [loading, setLoading] = useState(true); // add a loading state

  const handleChange =(e)=>{
    setVendorInfo((data)=>({...data,[e.target.name]: e.target.value}));

  }

  const submitHandler=(e)=>{
    e.preventDefault();
    axios.put(`${BASE_URL}/api/vendorapp/${_id}`,vendorInfo)
      .then((res)=>{
        
        setVendorInfo({name:"",accno:"",address1:"",address2:"",bankname:"",city:"",zipcode:"",country:""});
        console.log("submitHandler called");
        updateHandler();
        toast.success("Vendor Updated Successfully!",{duration: 3000})
      })
      .catch((err)=>{
        console.error(err);
      });
  };

  useEffect(()=>{
    axios.get(`${BASE_URL}/api/vendorapp/${_id}`)
      .then((res)=>{
        console.log(res.data);
        setVendorInfo(res.data.vendor);
        setLoading(false); // set loading to false after data is fetched
      })
      .catch((err)=>{
        console.log(err.message);
      });
  },[_id]);

  return (
    <div className={styles.maincont}>
      {loading ? ( // check if loading is true
        <p>Loading...</p> // render a loading message
      ) : ( // else
        <form className={styles.form} onSubmit={(e)=>{submitHandler(e);closeHandler(); }}>
          <div className={styles.box1}>
          <div>
          <label className={styles.label} htmlFor='name'>Vendor name</label>
          <input className={styles.input} type='text' name='name' id='name' value={vendorInfo.name} onChange={handleChange} required></input>
          </div>
        <div>
          <label className={styles.label} htmlFor='accno'>Account Number</label>
          <input className={styles.input} type='number' name='accno' id='accno' value={vendorInfo.accno} onChange={handleChange} required></input>
          </div>
        </div><br/>
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
          <button className={styles.button}>Update</button>
        </form>
      )}
    </div>
  )
}

export default UpdateVendor;
