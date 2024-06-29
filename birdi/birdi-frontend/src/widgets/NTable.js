import React from "react";
import { Checkbox, Table } from "semantic-ui-react";

const NTable = (props) => {
    const columns = props.columns;
    const data = props.data;
    const setSelections = props.setSelections;

    const handleSelection = (e,item) => {
        if(e.target.checked){
            setSelections((prevState) => [...prevState,item])
        } else{
            setSelections((prevState) => prevState.filter(obj => obj.id != item.id))
        }
    }
    return(
        <Table>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                {columns.map((column) => {
                    return(
                        <Table.HeaderCell>{column}</Table.HeaderCell>
                    )
                })}
            </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((item) => {
                    return(
                        <Table.Row>
                            <Table.Cell><input type="checkbox" onChange={(e) => handleSelection(e,item)}/></Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.dob}</Table.Cell>
                            <Table.Cell>{item.gender}</Table.Cell>
                            <Table.Cell>{item.mailId}</Table.Cell>
                            <Table.Cell>{item.mobileNumber}</Table.Cell>
                            <Table.Cell>{item.role}</Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )
}
export default NTable;