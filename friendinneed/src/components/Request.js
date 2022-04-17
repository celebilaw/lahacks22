import React from 'react'
import "./Request.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActions, CardActionArea, Typography } from '@mui/material';

function Request(props) {
    const formatDate = (date) => {
        return date.toISOString().split('T')[0]
    }

    return (
        <div className="RequestContainer">
            <Card onClick={props.onClick} sx={{"border-radius": "15%", "padding-bottom": "5%" }}>
                <CardActionArea className="Individual">
                    <CardMedia
                        component="img"
                        alt="Urgency Color"
                        height="5"
                        image={require(`../imgs/${props.urgency}.png`)}
                        sx={{ "padding-left": "80%", "padding-top": "10%" }}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div"><b>{props.item}</b></Typography>
                        <Typography variant="body2"><i>{props.location}</i></Typography>
                        {/* x */}
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}
//<Typography variant="body2"><b>Posted: </b>{formatDate(props.posted.toDate())}</Typography>
export default Request;
