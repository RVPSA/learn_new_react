import {  gql } from "@apollo/client";
import { useQuery,useMutation } from "@apollo/client/react";

const GET_EMPLOYEE = gql`
  query GetEmployee {
    allEmployees {
      name
    }
  }
`;

const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeByID($ID: Int!) {
    employeeById(id: $ID) {
      name
    }
  }
`;

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($name: String!, $gender: String!, $salary: Int!) {
    addEmployee(name: $name, gender: $gender,salary:$salary) {
      name
    }
  }
`;

function App() {
  const { data, error, loading } = useQuery(GET_EMPLOYEE);
  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { ID: 1 },
  });
  const [createEmployee] = useMutation(CREATE_EMPLOYEE);

  const handleNewEmployee = async () => {
    createEmployee({
      variables: {
        name: "Akesh",
        salary: Number(10),
        gender:"Male"
      },
    });
  };

  if (loading)
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  if (error)
    return (
      <>
        <h1>Error: {error.message}</h1>
      </>
    );
  return (
    <>
      <h1> Employees</h1>
      <div>{data.allEmployees.map((n,index)=>{return<>{n.name}<br></br></>})}</div>
      <button onClick={handleNewEmployee}>Add Employee</button>
      <div>{getUserByIdData.employeeById?.name}</div>
    </>
  );
}

export default App;
