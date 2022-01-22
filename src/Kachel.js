import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardActionArea } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <Icon {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Kachel({title,subtitle, content, expand,expandToggle}) {

  const handleExpandClick = () => {
    expandToggle(!expand);
  };

  return (
    <Card sx={{border: "1px solid black"}}>
          <CardActionArea sx={{bgcolor: "lightblue"}} onClick={handleExpandClick}>
      <CardHeader
        
        action={
            <ExpandMore
            expand={expand}
            onClick={handleExpandClick}
            aria-expanded={expand}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
        title={title}
        subheader={subtitle}
      />
      <CardActions disableSpacing>

      </CardActions>
      </CardActionArea>
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <CardContent>
            {content}
        </CardContent>
      </Collapse>
    </Card>
  );
}
