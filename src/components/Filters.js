import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Slider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./Filters.css";
const Filters = ({
  careChoiceList,
  onCareSelection,
  serviceTypeList,
  onServiceTypeSelection,
  setSliderValue,
  sliderValue,
  onSubmitClick,
  serverValidationErrors,
  setServerValidationErrors,
}) => {
  const [injuryType, setInjuryType] = useState("");
  const [service, setService] = useState("");
  const [renderedCareChoiceList, setRenderedCareChoiceList] = useState([]);
  const [renderedServiceTypeList, setRenderedServiceTypeList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [injuryErrors, setInjuryErrors] = useState(false);
  const [serviceErrors, setServiceErrors] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  useEffect(() => {
    setRenderedCareChoiceList(
      careChoiceList?.map((choice) => {
        return <MenuItem value={choice[1]}>{choice[1]}</MenuItem>;
      })
    );
  }, [careChoiceList]);

  useEffect(() => {
    setRenderedServiceTypeList(
      serviceTypeList?.map((choice) => {
        return <MenuItem value={choice[1]}>{choice[1]}</MenuItem>;
      })
    );
  }, [serviceTypeList]);

  useEffect(() => {if (!injuryErrors && !serviceErrors) {
    setSubmitDisabled(false);
  }}, [injuryErrors, serviceErrors]);

  const handleDistanceChange = (p) => (isExpanded) => {
    setExpanded(isExpanded ? p : false);
  };

  const validateInjuryChange = (e) => {
    if (e.target.value === 0 || injuryType !== "") {
      setInjuryErrors(false);

      
      setServerValidationErrors(
        serverValidationErrors.includes("er") ? ["er"] : []
      );
    } else {
      setInjuryErrors(true);
    }
  };

  const validateServiceChange = (e) => {
    if (e.target.value === 0 || service !== "") {
      setServiceErrors(false);
      setServerValidationErrors(
        serverValidationErrors.includes("care") ? ["care"] : []
      );
    } else {
      setServiceErrors(true);
    }
  };

  const handleInjuryChange = (e) => {
    setInjuryType(e.target.value);
    onCareSelection(e.target.value[0]);
  };

  const checkoutSubmit = () => {
    if (injuryType && service) {
      setSubmitDisabled(false);
      onSubmitClick();
    } else {
      setSubmitDisabled(true);
      if (!injuryType) {
        setInjuryErrors(true);
      }
      if (!service) {
        setServiceErrors(true);
      }
    }
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
    onServiceTypeSelection(e.target.value[0]);
  };
  return (
    <div>
      <FormControl fullwidth className="field-selector">
        <Typography className="filters-title">
          <label>Select Filters:</label>
        </Typography>
      </FormControl>
      <FormControl
        fullWidth
        className="field-selector"
        error={serverValidationErrors.includes("care") || injuryErrors}
      >
        <InputLabel id="demo-simple-select-label">Injury Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={injuryType}
          label="Injury Type"
          onClick={validateInjuryChange}
          onChange={handleInjuryChange}
        >
          {renderedCareChoiceList}
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        className="field-selector"
        error={serverValidationErrors.includes("er") || serviceErrors}
      >
        <InputLabel id="demo-simple-select-error-label">
          Service Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
          value={service}
          label="Service Type"
          onClick={validateServiceChange}
          onChange={handleServiceChange}
        >
          {renderedServiceTypeList}
        </Select>
      </FormControl>
      <FormControl fullWidth className="field-selector">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleDistanceChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Set Distance
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {sliderValue}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Slider
              aria-label="Distance"
              defaultValue={20}
              valueLabelDisplay="auto"
              step={5}
              getAriaValueText={setSliderValue}
              marks={true}
              min={0}
              max={100}
            />{" "}
            Km
          </AccordionDetails>
        </Accordion>
        <FormControl className="field-selector submit">
          <Button
            variant="outlined"
            onClick={() => checkoutSubmit()}
            disabled={submitDisabled}
          >
            Submit
          </Button>
        </FormControl>
      </FormControl>
    </div>
  );
};

export default Filters;
