import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../style/style.css";
// import "../../../server/uploads"
const EmployeeList = (props) => {
  const {api} = props
  const navigate = useNavigate();
  const [employeesData, setEmployeesData] = useState([]);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(()=>{
    employeesData.map((d)=>console.log(d.image))
  },[employeesData])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employee/getemployees',{
        headers: {
          // Your headers here
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.status === 200) {
        setEmployeesData(response.data.employees);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  const restoreBlobUrl = (imageData) => {
    const blob = new Blob([imageData], { type: 'image/jpeg' });
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  };

  const employeesWithBlobUrls = employeesData.map((employee) => {
    const imageBlobUrl = restoreBlobUrl(employee.image);
    return { ...employee, imageBlobUrl };
  });
  const handleEdit = (id) =>{
    console.log("edit", id);
    navigate(`/editemployee/${id}`)
  }
  const handleDelete = async (id) =>{
    console.log("edit", id);
    try{
      const response = await api.delete('/employee/deleteemployee/'+id,{
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      if(response.status === 200){
        window.alert(response.data.deletedEmployee.name+ " " +"deleted successfully")
        fetchEmployees();
      }else{
        window.alert(response.data.error)
      }
    }catch(err){
      if (err.response){
        window.alert(err.response.data.error);
      }else{
        window.alert("Error occured during employee deletion")
      }
    }
  }
  

  const sortedEmployees = [...employeesWithBlobUrls].sort((a, b) => {
    if (sortConfig.key !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });
  const filteredEmployees = sortedEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  return (
    <div className='employeelistcontainer'>
      <div className='loginsubH'>Employee List</div>
      <div className='searchfiltercontainer'>
      <div><Link type="button" to="/createemployee" className="btn btn-primary btnstyle">Create Employee</Link></div>
      <div className='inputstyle'><input type="search" placeholder='enter name...'   value={searchQuery} onChange={handleSearchChange}/></div>
      </div>
      <div className="table-responsive">
      <table className="table caption-top tablestyle">
        <thead>
          <tr>
            <th scope="col">S NO</th>
            <th scope="col">IMAGE</th>
            <th scope="col" onClick={() => requestSort('name')}>NAME{' '}
            {sortConfig.key === 'name' && (
              <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
            )}</th>
            <th scope="col" onClick={() => requestSort('email')}> EMAIL{' '}
            {sortConfig.key === 'email' && (
              <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
            )}
            </th>
            <th scope="col">MOBILE NO</th>
            <th scope="col">DESIGNATION</th>
            <th scope="col">GENDER</th>
            <th scope="col">COURSE</th>
            <th scope="col" onClick={() => requestSort('createdAt')}>CREATED AT{' '}
            {sortConfig.key === 'createdAt' && (
              <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
            )}
            </th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
        {filteredEmployees.map((employee, index) => {
              const date = new Date(employee.createdAt);
              const formattedDate = `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;

            return (
              <tr key={employee._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  {employee.image ? (
                    <div className='imgContainer'>
                      <img
                      src={`mern-project-admin-api.vercel.app/uploads/${employee.image}`} // Assuming uploads directory is accessible at the root
                      alt={employee.name}
                      // style={{ maxWidth: '100px', maxHeight:'4rem' }}
                    />
                    </div>
                  ) : (
                    "No Image Available"
                  )}
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNo}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>{formattedDate}</td>
                <td> {/* Actions column */}
                  <button className='btnstyle1' onClick={() => handleEdit(employee._id)}>Edit</button> {/* Edit button */}
                  <button className='btnstyle1' onClick={() => handleDelete(employee._id)}>Delete</button> {/* Delete button */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default EmployeeList