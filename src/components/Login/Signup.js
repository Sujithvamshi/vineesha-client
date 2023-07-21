import React from 'react'
import {
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
function Signup({error,justifyActive,setJustifyActive,loginForm,handleLoginFormChange,handleLoginSubmit}) {
  return (
    <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'tab2'}>

          <MDBInput wrapperClass='mb-4' label='Employee ID'  type='text'/>
          <MDBInput wrapperClass='mb-4' label='Name' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Email' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Phone Number' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Department' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Password' type='password'/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
  )
}

export default Signup