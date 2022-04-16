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
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="h5" component="div">{props.title}</Typography>
                    <Typography variant="body1">{props.desc}</Typography>
                    <Typography variant="body2"><b>Requester: </b>{props.requester}</Typography>
                    <Typography variant="body2"><b>Priority: </b>{props.priority}</Typography>
                    <Typography variant="body2"><b>Location: </b>{props.location}</Typography>
                    <Typography variant="body2"><b>Posted: </b>{formatDate(props.posted.toDate())}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button 
                    size="small" 
                    color="primary"
                    onClick={() => {
                        props.cancelRequest(props.id);
                    }}
                >
                cancel
                </Button>
                <Button 
                    size="small" 
                    color="primary"
                    onClick={() => {
                        props.completeRequest(props.id);
                    }}
                >
                complete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Request;
