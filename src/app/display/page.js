'use client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import styles from './display.module.css';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import VendorCard from 'src/components/VendorCard';
import UpdateVendor from 'src/components/UpdateVendor';
import { BASE_URL } from 'src/helper/helper';
import ReactPaginate from 'react-paginate';
import { Toaster } from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';


function DisplayVendor() {

  const [infoVendor,setInfoVendor]=useState([]);
  const [id,setId]=useState("");
  const [update,setUpdate]=useState(false);
  const [modal,setModal]=useState(false);
  const [page,setPage]=useState(1);

  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

    const handlePageChange = (selectedObject) => {
      // Get the selected page number from the object
      let selectedPage = selectedObject.selected + 1;
      // Update the state
      setPage(selectedPage);
    };

  useEffect(()=>{
    axios.get(`${BASE_URL}/api/vendorapp/page/${page}`)
    .then((res)=>{
      console.log(res.data);
      console.log("Total Pages:",Math.ceil(res.data.page/5))
      setTotalPages(Math.ceil(res.data.page/5));

      setInfoVendor(res.data.vendor);
      
    })
    .catch((err)=>{
      console.log(err.message);
    });
  },[update,page]);

  const updateHandler=()=>{
    setUpdate(!update);
    console.log("Updated",update);
    // router.push('display');
    
  }


  const editHandler =(e)=>{
    setId(e.target.name);
    setModal(true);
  }
  


  const closeHandler=()=>{
    setId("");
    setModal(false);
  }

  const deleteHandler = (e) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
    axios.delete(`${BASE_URL}/api/vendorapp/${e.target.name}`);
    setInfoVendor((data) => {
      return data.filter((banking) => banking._id !== e.target.name);
    });
  }
  else{
    return;
  }
  };
  const { data: session,status } = useSession()
  if (session || status==="loading") {
 return(
  <>
        {modal ? (
          <div className={styles.close}>
          <p onClick={closeHandler}>🔙</p>
          <h2>Edit Vendor</h2>
          <UpdateVendor _id={id} closeHandler={closeHandler} updateHandler={updateHandler}/>
          </div>
        ):(
        <>
        <Toaster/>
        {/* <p>{session.user.name}</p> */}
        <Table striped bordered hover size="sm" responsive="sm" style={{  marginInline:'auto', marginTop:'5vh' }}>
        <thead>
          <tr>
          <th>S No.</th>
        <th>Vendor Name</th>
        <th>Bank Account No.</th>
        <th>Bank Name</th>
        <th>Edit</th>
        <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {infoVendor.map((vendorInfo,index)=>(
          
          <VendorCard key={index} sno={index+1} vendorInfos={vendorInfo} editHandler={editHandler} deleteHandler={deleteHandler}/>
        ))}
        </tbody>
      </Table>


{/* Using React Paginate for Pagination */}
      <div className={styles.pagination1}>
          
<ReactPaginate
        pageCount={totalPages} // Total number of pages
        pageRangeDisplayed={2} // Number of page numbers to display
        marginPagesDisplayed={2} // Number of pages to display at the start and end of the pagination
        onPageChange={handlePageChange} // Function to handle page change event
        containerClassName={'pagination'} // Class name for the container
        previousLabel={'Back'} // Label for the previous button
        nextLabel={'Next'} // Label for the next button
        activeClassName={styles.active} // Class name for the active page number
        initialPage={page-1}
      />
      </div>
      
  </>
      )}
  
  </>
 )
        }
        else
{
return(<div className={styles.warning}>Please Sign In in order to continue viewing Vendor List</div>)
}
}

export default DisplayVendor