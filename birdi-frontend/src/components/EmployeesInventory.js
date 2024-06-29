import React, { useEffect, useState } from "react";
import { Button, Checkbox, Container, Divider, Form, Grid, Image, Input, Modal, Table } from "semantic-ui-react";
import axios from "axios";
import NTable from "../widgets/NTable";
import { cancelButton, cardTitle, completeHeight, dividerStyle, noMarginLR, noMarginTB, noPadding, toolBarStyle } from "../utils/constants";
import Calendar from 'react-calendar';
import addLine from '../assets/icons/add.svg';
import minusLine from '../assets/icons/minus.svg';
import editLine from '../assets/icons/edit.svg';

const EmployeesInventory = () => {
    const [employees,setEmployees] = useState([]);
    const [selections, setSelections] = useState([]);
    const [disableButton, setDisableButton] = useState(false);

    const getData = () => {
		axios.get("/employees")
		.then(function (response) {
            setEmployees(response.data)
		});
	}

    const clearSelections = () => {
        setSelections([])
    }

    useEffect(() => {
        if (selections.length > 1 || selections.length == 0){
            setDisableButton(true)
        } else {
            setDisableButton(false)
        }
    },[selections]);

	useEffect(() => {
		getData()
	},[])
    return(
        <Grid style={completeHeight}>
            <Grid.Row style={{maxHeight:"25%"}}>
                <Grid.Column>
                <Grid columns={2}>
                    <Grid.Column width={12} textAlign='left' style={{fontSize:"1.5em"}}>
                        Employees
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='right'>
                        <EmployeesToolbar selections={selections}
                                    clearSelections={clearSelections}
                                    getData={getData}
                                    disableButton={disableButton}
                        />
                    </Grid.Column>
                </Grid>
                </Grid.Column>
            </Grid.Row>
            <Divider style={dividerStyle} />
            <Grid.Row style={{minHeight:"75%"}}>
                <Grid.Column>
                    <EmployeesTable employees={employees} setSelections={setSelections} clearSelections={clearSelections}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const EmployeesToolbar = (props) => {
    const selections = props.selections;
    const getData = props.getData;
    const clearSelections = props.clearSelections;
    const disableButton = props.disableButton;

    return(
        <Grid>
            <AddEmployee getData={getData}/>
            <UpdateEmployee selections={selections}
                            clearSelections={clearSelections}
                            getData={getData}
                            disableButton={disableButton}/>
            <DeleteEmployee selections={selections} 
                            clearSelections={clearSelections}
                            getData={getData}
                            disableButton={disableButton}/>
        </Grid>
    )
}

const EmployeesTable = (props) => {
    const employees = props.employees;
    const setSelections = props.setSelections;
    
    const columns = ["Name","DOB","Gender","EmailID","Mobile Number","Role"]
    return(
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <NTable columns={columns} data={employees} setSelections={setSelections}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const AddEmployee = (props) => {
    const getData = props.getData;

    const [open, setOpen] = useState(false)
    const [userDetails, setUserDetails] = useState({});

    const genderOptions = [
        { key: 'm', text: 'Male', value: 'Male' },
        { key: 'f', text: 'Female', value: 'Female' },
        { key: 'o', text: 'Other', value: 'Other' },
    ]

    const roleOptions = [
        { key: 'a', text: 'Administrator', value: 'Admin' },
        { key: 'u', text: 'User', value: 'User' },
        { key: 'd', text: 'Default', value: 'Default' },
    ]

    const handleChange = (name,value) => {
        setUserDetails((prevalue) => {
        return {
            ...prevalue,
            [name]: value
        }
        })
    }

    const handleAddUser = () => {
        axios.put('/employees', userDetails)
        .then((response) => {
            setOpen(false);
            getData();
        })
        .catch((error) => {
            console.error(error);
        });
    }
    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Image src={addLine} style={{ cursor: "pointer",maxWidth:"80px" }}/>}
        >
            <Modal.Header>Add Employee</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Full Name</label>
                        <Input placeholder='Full Name' name="name" value={userDetails.name} 
                                onChange={(event) => handleChange("name",event.target.value)}/>
                    </Form.Field>
                    
                    <Form.Field>
                        <Form.Select
                            fluid
                            label='Gender'
                            options={genderOptions}
                            placeholder='Gender'
                            onChange={(event,data) => handleChange("gender",data.value)}
                            name="gender"
                            value={userDetails.gender}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Email ID</label>
                        <Input placeholder='EmailID' name="mailId" value={userDetails.mailId} 
                                onChange={(event) => handleChange("mailId",event.target.value)}/>
                    </Form.Field>

                    <Form.Field>
                        <label>Mobile Number</label>
                        <Input placeholder='Mobile Number' name="mobileNumber" value={userDetails.mobileNumber} 
                                onChange={(event) => handleChange("mobileNumber",event.target.value)}/>
                    </Form.Field>

                    <Form.Field>
                        <label>DOB</label>
                        <Calendar onChange={(value) => handleChange("dob",value.toLocaleDateString('en-GB'))} name="dob"/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Select
                            fluid
                            label='Role'
                            options={roleOptions}
                            placeholder='Role'
                            onChange={(event,data) => handleChange("role",data.value)}
                            name="role"
                            value={userDetails.role}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button color="blue" onClick={handleAddUser}>Save</Button>
            </Modal.Actions>
        </Modal>
    )
}

const UpdateEmployee = (props) => {
    const selections = props.selections;
    const getData = props.getData;
    const clearSelections = props.clearSelections;
    const disableButton = props.disableButton;

    const [open, setOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    const genderOptions = [
        { key: 'm', text: 'Male', value: 'Male' },
        { key: 'f', text: 'Female', value: 'Female' },
        { key: 'o', text: 'Other', value: 'Other' },
    ]

    const roleOptions = [
        { key: 'a', text: 'Administrator', value: 'Admin' },
        { key: 'u', text: 'User', value: 'User' },
        { key: 'd', text: 'Default', value: 'Default' },
    ]

    useEffect(() => {
        if(open) {
            let id = selections[0].id;
            axios.get("/employees/" + id)
            .then(function (response) {
                setUserDetails(response.data)
            });
        }
    },[open]);
    
    const handleUpdateUser = () => {
        axios.post('/employees/' + userDetails.id, userDetails)
        .then((response) => {
            setOpen(false);
            clearSelections();
            getData();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const handleChange = (name,value) => {
        setUserDetails((prevalue) => {
        return {
            ...prevalue,
            [name]: value
        }
        })
    }
    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Image src={editLine} style={{ cursor: "pointer",maxWidth:"80px" }} disabled={disableButton}/>}
        >
            <Modal.Header>Update Employee</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Full Name</label>
                        <Input placeholder='Full Name' name="name" value={userDetails.name} 
                                onChange={(event) => handleChange("name",event.target.value)}/>
                    </Form.Field>
                    
                    <Form.Field>
                        <Form.Select
                            fluid
                            label='Gender'
                            options={genderOptions}
                            placeholder='Gender'
                            onChange={(event,data) => handleChange("gender",data.value)}
                            name="gender"
                            value={userDetails.gender}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Email ID</label>
                        <Input placeholder='EmailID' name="mailId" value={userDetails.mailId} 
                                onChange={(event) => handleChange("mailId",event.target.value)}/>
                    </Form.Field>

                    <Form.Field>
                        <label>Mobile Number</label>
                        <Input placeholder='Mobile Number' name="mobileNumber" value={userDetails.mobileNumber} 
                                onChange={(event) => handleChange("mobileNumber",event.target.value)}/>
                    </Form.Field>

                    <Form.Field>
                        <Form.Select
                            fluid
                            label='Role'
                            options={roleOptions}
                            placeholder='Role'
                            onChange={(event,data) => handleChange("role",data.value)}
                            name="role"
                            value={userDetails.role}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button color="blue" onClick={handleUpdateUser}>Save</Button>
            </Modal.Actions>
        </Modal>
    )
}

const DeleteEmployee = (props) => {
    const selections = props.selections;
    const getData = props.getData;
    const clearSelections = props.clearSelections;
    const disableButton = props.disableButton;

    const [open, setOpen] = useState(false)
    
    const handleDeleteUser = () => {
        axios.delete('/employees/' + selections[0].id)
            .then((response) => {
                getData();
                clearSelections();
                setOpen(false)
        })
        .catch((error) => {
            console.error(error);
        });
        
    }

    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Image src={minusLine} style={{ cursor: "pointer",maxWidth:"80px" }} disabled={disableButton}/>}
        >
            <Modal.Header>Delete Employee</Modal.Header>
            <Modal.Content>
                Are you sure you want to delete this employee?
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button color="blue" onClick={handleDeleteUser}>Save</Button>
            </Modal.Actions>
        </Modal>
    )
}
export default EmployeesInventory;