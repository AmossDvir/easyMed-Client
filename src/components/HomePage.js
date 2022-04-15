import React, { useEffect, useRef, useState } from "react";
import Map from "./Map";
import Filters from "./Filters";
import Suggestions from "./Suggestions";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const HomePage = ({ location }) => {
  const [careChoice, setCareChoice] = useState([]);
  const [careChoiceList, setCareChoiceList] = useState();
  const [careSelection, setCareSelection] = useState("");
  const [serverValidationErrors, setServerValidationErrors] = useState([]);


  const [serviceType, setServiceType] = useState([]);
  const [serviceTypeList, setServiceTypeList] = useState();
  const [serviceTypeSelection, setServiceTypeSelection] = useState("");

  const [submitData, setSubmitData] = useState([]);

  const [sliderValue, setSliderValue] = useState(0);
  const resultsRef = useRef();

  const makeCareChoiceReq = async () => {
    const { data } = await axios.get("https://easymed-app.herokuapp.com/care_choice/");
    setCareChoice(data);
  };

  const makeServiceTypeReq = async () => {
    const { data } = await axios.get("https://easymed-app.herokuapp.com/er_type/");
    setServiceType(data);
  };

  const makeOnSubmitReq = async () => {
    await axios
      .get("https://easymed-app.herokuapp.com/by_params/", {
        params: {
          radius: sliderValue,
          care: careSelection,
          er: serviceTypeSelection,
          north: 351924458,
          east: 31779513,
          // north: location.split(",")[0],
          // east: location.split(",")[1],
        },
      })
      .then(({data}) => {
        setSubmitData(data);
        resultsRef.current.scrollIntoView();
      })
      .catch((err) => setServerValidationErrors(err.response.data.filters));
  };

  const onSubmitClick = () => {
    makeOnSubmitReq();
  };
  useEffect(() => {
    makeCareChoiceReq();
    makeServiceTypeReq();
  }, []);

  useEffect(() => {
    setCareChoiceList(Object.entries(careChoice));
  }, [careChoice]);

  useEffect(() => {
    setServiceTypeList(Object.entries(serviceType));
  }, [serviceType]);

  return (
    <Container maxWidth="xl">
      <div className="main-grid">
        <Grid className="hp-grid" container spacing={4}>
          <Grid item xs={5}>
            <Item className="single-item">
              <Filters
                careChoiceList={careChoiceList}
                onCareSelection={setCareSelection}
                serviceTypeList={serviceTypeList}
                onServiceTypeSelection={setServiceTypeSelection}
                setSliderValue={setSliderValue}
                sliderValue={sliderValue}
                onSubmitClick={onSubmitClick}
                serverValidationErrors={serverValidationErrors}
                setServerValidationErrors={setServerValidationErrors}
              ></Filters>
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item className="single-item">
              <Map location={location}></Map>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item ref={resultsRef} className="single-item">
              <Suggestions data={submitData}></Suggestions>
            </Item>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default HomePage;
