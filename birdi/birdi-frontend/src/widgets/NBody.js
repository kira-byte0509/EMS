import React from "react";
import { Grid } from "semantic-ui-react";
import EmployeesInventory from "../components/EmployeesInventory";
import { completeHeight } from "../utils/constants";

const NBody = () => {
    return(
        <Grid style={completeHeight}>
            <Grid.Row>
                <Grid.Column>
                    <EmployeesInventory />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
export default NBody