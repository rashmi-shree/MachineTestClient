import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/style.css";

const EditEmployeeList = (props) => {
    const {api} = props;
    const navigate = useNavigate();
    const {id} = useParams();
    const [employeeData, setEmployeeData] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});

    const changeEvent = (event) => {
      const { name, value, type, checked } = event.target;
      let newData = { ...formData };
    
      if (type === 'checkbox') {
        if (checked) {
          newData[name] = newData[name] ? `${newData[name]}, ${value}` : value;
        } else {
          newData[name] = newData[name]
            .split(', ')
            .filter((course) => course !== value)
            .join(', ');
        }
      } else if (name === 'image') {
        const file = event.target.files[0];
        const objectURL = URL.createObjectURL(file);
        const fileName = file.name;
        const extension = fileName.split('.').pop(); // Extracting the file extension
        newData[name] = objectURL + '.' + extension;
      } else {
        newData[name] = value;
      }
    
      setFormData(newData);
    };
    
      const submitEvent = async(e) =>{
        e.preventDefault()
        try{
          const response = await api.put("/employee/updateemployee/"+id,formData,{
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
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
      const fetchEmployees = async () => {
        try {
          const response = await api.get('/employee/getemployeebyid/'+id,{
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          if (response.status === 200) {
            setEmployeeData(response.data.employee);
          }
        } catch (error) {
          setError(error.message);
        }
      };
    
      useEffect(() => {
        fetchEmployees();
      }, []);
  return (
    <div>
    <div className='loginsubH'>Employee Edit</div>
    <div className='createemployeecontainer'>
        <form className="row g-3">
        <div className="col-md-6">
            <label for="inputEmail4" className="form-label">Name</label>
            <input name="name" defaultValue={employeeData.name} onChange={(event) => changeEvent(event,0)} type="text" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-6">
            <label for="inputEmail4" className="form-label">Email</label>
            <input name='email' defaultValue={employeeData.email} onChange={(event) => changeEvent(event, 0)} type="email" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-6">
            <label for="inputPassword4" className="form-label">Mobile No</label>
            <input name='mobileNo' defaultValue={employeeData.mobileNo} onChange={(event) => changeEvent(event,0)} type="number" className="form-control" />
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
            <button type="submit" onClick={submitEvent} className="btn btn-primary btnstyle">Submit</button>
        </div>
        </form>
    </div>
    </div>
  )
}

export default EditEmployeeList