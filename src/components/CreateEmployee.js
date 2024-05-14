import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../style/style.css";

const CreateEmployee = (props) => {
  const {api} = props;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    gender: '',
    email: '',
    designation: '',
    course: '',
    image: '',
  });
  
  const changeEvent = (event, index) => {
    const { name, value, type, checked } = event.target;
    let updatedFormData = { ...formData }; // Make a copy of the current state

    if (name === "image") {
        updatedFormData[name] = event.target.files[0]; // Update image field directly
    } else if (name === 'course') {
        // If the checkbox is checked, add the course to the formData
        if (checked) {
            // Check if course already exists in formData
            if (updatedFormData.course) {
                updatedFormData.course += `, ${value}`;
            } else {
                updatedFormData.course = value;
            }
        } else {
            // If the checkbox is unchecked, remove the course from the formData
            if (updatedFormData.course) {
                updatedFormData.course = updatedFormData.course
                    .split(', ')
                    .filter(course => course !== value)
                    .join(', ');
            }
        }
    } else {
        updatedFormData[name] = value; // Update other fields directly
    }

    // Update the state with the modified formData
    setFormData(updatedFormData);
};

// const formDataInstance = new FormData();
// useEffect(()=>{
//   console.log("formData",formData);
//   Object.keys(formData).forEach(key => {
//     console.log("key",key, formData[key]);
//     formDataInstance.append(key, formData[key]);
//   })
// },[formData])
  
  const submitEvent = async(e) =>{
    e.preventDefault()
      console.log("formData",formData);
      const formDataInstance = new FormData(); // Create a new FormData instance

    // Append each field from the formData state to the FormData instance
    Object.keys(formData).forEach(key => {
        // If it's an image file, append it separately
        if (key === "image" && formData[key]) {
            formDataInstance.append(key, formData[key], formData[key].name);
        } else {
            formDataInstance.append(key, formData[key]);
        }
    });
    try{
      const response = await api.post("/employee/createemployee",formDataInstance,{
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        },
      } )
      if(response.status === 200){
        navigate("/emloyeelist")
      }else{
        window.alert(response.data.error)
      }
    }catch(err){
      if (err.response){
        window.alert(err.response.data.error);
      }else{
        window.alert("Error occured during employee creation")
      }
    }
  }

  return (
    <div>
    <div className='loginsubH'>Create Employee</div>
     <div className='createemployeecontainer'>
     <form className="row g-3" encType='multipart/form-data' >
      <div className="col-md-6">
        <label for="inputEmail4" className="form-label">Name</label>
        <input name="name" onChange={(event) => changeEvent(event,0)} type="text" className="form-control" id="inputEmail4" />
      </div>
      <div className="col-md-6">
        <label for="inputEmail4" className="form-label">Email</label>
        <input name='email' onChange={(event) => changeEvent(event, 0)} type="email" className="form-control" id="inputEmail4" />
      </div>
      <div className="col-md-6">
        <label for="inputPassword4" className="form-label">Mobile No</label>
        <input name='mobileNo' onChange={(event) => changeEvent(event,0)} type="number" className="form-control" />
      </div>
      <div className="col-md-6">
        <label for="inputState" className="form-label">Designation</label>
        <select name='designation' onChange={(event) => changeEvent(event,0)} id="inputState" className="form-select">
          <option selected>Choose...</option>
          <option>HR</option>
          <option>Manager</option>
          <option>Sales</option>
        </select>
      </div>
      <div className="col-md-6">
          <label for="inputState" className="form-label">Gender</label>
        <div className="form-check">
          <input name="gender" onChange={(event) => changeEvent(event,0)} className="form-check-input" type="radio"  id="gridRadios1" value="Female" />
          <label className="form-check-label" for="gridRadios1">
            Female
          </label>
        </div>
        <div className="form-check">
          <input name="gender" onChange={(event) => changeEvent(event,0)} className="form-check-input" type="radio"  id="gridRadios1" value="Male" />
          <label className="form-check-label" for="gridRadios1">
            Male
          </label>
        </div>
      </div>
      <div className="col-md-6">
        <label for="inputState" className="form-label">Courses</label>
        <div className="form-check">
          <input name="course" onChange={(event) => changeEvent(event,0)} className="form-check-input" type="checkbox" value="MCA" id="flexCheckDefault" />
          <label className="form-check-label" for="flexCheckDefault">
            MCA
          </label>
        </div>
        <div className="form-check">
          <input name="course" onChange={(event) => changeEvent(event,0)} className="form-check-input" type="checkbox" value="BCA" id="flexCheckChecked"  />
          <label className="form-check-label" for="flexCheckChecked">
            BCA
          </label>
        </div>
        <div className="form-check">
          <input name="course" onChange={(event) => changeEvent(event,0)} className="form-check-input" type="checkbox" value="BSC" id="flexCheckChecked"  />
          <label className="form-check-label" for="flexCheckChecked">
            BSC
          </label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <label for="formFile" className="form-label">Image upload</label>
          <input name='image' onChange={(event) => changeEvent(event,0)} className="form-control" type="file" id="formFile" />
        </div>
      </div>
      <div className="col-12 btncontainer">
        <button type="submit" onClick={submitEvent} className="btn btn-primary btnstyle">Create</button>
      </div>
      </form>
      </div>
    </div>
  )
}

export default CreateEmployee 