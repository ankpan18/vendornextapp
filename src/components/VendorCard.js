'use client';
import React from 'react';
import Button from 'react-bootstrap/Button';


const VendorCard = ({sno,vendorInfos,editHandler,deleteHandler}) => {
    const {_id,name,accno,bankname}=vendorInfos;
   
  return ( 
     
        <tr key={_id}>
          
        <td>{sno}</td>
        <td>{name}</td>
        <td>{accno}</td>
        <td>{bankname}</td>
        <td><Button variant="warning" name={_id} onClick={editHandler}>Edit</Button></td>
       <td> <Button variant="danger" name={_id} onClick={deleteHandler}>Delete</Button></td>
        </tr>

  )
}

export default VendorCard