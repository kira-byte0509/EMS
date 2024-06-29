import React from "react";
import { Grid, Header, Icon, Menu } from "semantic-ui-react";

const NHeader = () => {
    const rightPanelOptions = ["settings","bell","search","user"]
    return(
        <Grid style={{minHeight:"120px"}}>
            <Grid.Row columns={1}>
                <Grid.Column width={16}>
                <Grid columns={3} stackable verticalAlign="middle">
                    <Grid.Column width={6}>
                        <Grid columns={2}>
                            <Grid.Column width={3}><Icon name="group" size="huge"></Icon></Grid.Column>
                            <Grid.Column width={13} verticalAlign="middle" style={{fontSize:"1.6em",fontWeight:"bold"}}>
                                EMS
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={6}></Grid.Column>
                    <Grid.Column width={4}>
                        <Menu secondary>
                            {rightPanelOptions.map((itemName) => {
                                return(
                                    <Menu.Item>
                                        <Icon name={itemName} size="big" style={{cursor:"pointer"}}/>
                                    </Menu.Item>
                                )
                            })}
                        </Menu>
                    </Grid.Column>
                </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        
    )
}
export default NHeader