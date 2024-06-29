import React from "react";
import { Grid } from "semantic-ui-react";
import NHeader from "../widgets/NHeader";
import NBody from "../widgets/NBody";
import NFooter from "../widgets/NFooter";

const AppLayout = () => {
    return(
        <Grid columns={3}>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
            <Grid>
                <Grid.Row style={{marginTop:"1em"}}>
                    <Grid.Column>
                        <NHeader />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{minHeight:"80Vh"}}>
                    <Grid.Column>
                        <NBody />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <NFooter />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
        </Grid>
    )
}

export default AppLayout