import { Grid } from '@mui/material';

import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './component/FAQ.css';

const Faq = ({ faqDetailsData, faqData }) => {
    return (
        <>
            <div className="faq-container">
                {faqDetailsData.map((item, index) => (
                    <div key={item.id}>
                        {item.subjectStatus === "math" ? <div className="about-heading-box">
                            <div className="page-heading">
                                <h1 style={{ marginBottom: 0 }}>{item?.faqHead}</h1>
                            </div>
                            <div className="page-heading">
                                <p style={{ maxWidth: '700px', marginTop: '6px', marginBottom: '12px', fontSize: '17px', fontFamily: 'Open Sans' }}>
                                    {item?.faqSubHead}
                                </p>
                            </div>
                        </div> : null}
                    </div>
                ))}


                <div className="accordion-box">
                    <div className="faq-row">
                        <Grid container>
                            {faqData.map((item, index) => (
                                <Grid item md={12} className="faq-col">
                                    <Accordion key={index} className="faq-accordion">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            className="faq-active-color"
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className="faq-question-text">{item?.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="faq-answer-box">
                                            <Typography>{item?.answer}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Faq;
