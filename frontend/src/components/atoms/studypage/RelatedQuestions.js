import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function RelatedQuestions(props) {
  const [expanded, setExpanded] = React.useState(false);
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  
  
  const RelatedQuestions = props.data.map((data, index) => 
    <Accordion 
      expanded={expanded === `panel${index + 1}`} 
      onChange={handleChange(`panel${index + 1}`)}
      key ={index}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index + 1}bh-content`}
        id={`panel${index + 1}bh-header`}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>{data.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {data.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  
  )
  
  return (
    <div>
      {RelatedQuestions}
    </div>
  );
}