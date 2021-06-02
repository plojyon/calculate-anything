import React, {useState} from "react";
import styled from "styled-components";
import {MiddleCard, MiddleCardWrapper} from "./MiddleCard"

import InputField, {CodeField} from "./InputField";
import CalculateButton from "./CalculateButton";
import { useLocation } from "react-router";

const Title = styled.div`
    font-size: 1.5em;
    padding:.5em;
`;

const Description = styled.div`
    padding-left:2em;
    padding-bottom:2em;
    padding-right:2em;
    font-size:.8em;
    box-sizing:border-box;
`;

function enquote(text) {
	console.log(text.split(new RegExp(/[^-\w_\.]/, 'i')).filter(function (el) {return el != ""}));
	return JSON.stringify(text.split(new RegExp(/[^-\w_\.]/, 'i')).filter(function (el) {return el != ""}));
}

export default ({}) => {
    const location = useLocation();
    const [selected, setSelected] = useState(-1);
    const [calculatorName, setCalculatorName] = useState("");
    const [inputs, setInputs] = useState("");
	const [weights, setWeights] = useState("");
	const [maxes, setMaxes] = useState("");
    return <MiddleCardWrapper>
        <MiddleCard>
            <Title>Create new calculator</Title>
            <InputField
                input_name={"Calculator name"}
                selected={selected == 0}
                setSelected={() => {setSelected(0)}}
                onChange={new_text => setCalculatorName(new_text)}
                onBlur={() => {setSelected(-1)}}
            ></InputField>
            <InputField
                input_name={"Inputs (ex. 1.dn 2.dn 3.dn 4-6.dn kolokvij)"}
                selected={selected == 1}
                setSelected={() => setSelected(1)}
                onChange={new_text => setInputs(enquote(new_text))}
                onBlur={() => {setSelected(-1)}}
            ></InputField>
			<InputField
				input_name={'Maximums (ex. ["4", "5", "5", "24", "100"])'}
				selected={selected == 2}
				setSelected={() => setSelected(2)}
				onChange={new_text => setMaxes(enquote(new_text))}
				onBlur={() => {setSelected(-1)}}
			></InputField>
			<InputField
				input_name={"Weights (ex. 17.5, 17.5, 25, 40)"}
				selected={selected == 3}
				setSelected={() => setSelected(3)}
				onChange={new_text => setWeights(enquote(new_text))}
				onBlur={() => {setSelected(-1)}}
			></InputField>
            <CalculateButton execute_function={
                () => new Promise((res, rej) => {
					// TODO: check that inputs and weights have the same length
                    const inputs_array_string = encodeURIComponent(`${inputs}`);
					const weights_array_string = encodeURIComponent(`${weights}`);
					const maximums_array_string = encodeURIComponent(`${maxes}`);
                    const title = encodeURIComponent(calculatorName);

                    const relative_link = `#/calculator?title=${title}&inputs=${inputs_array_string}&weights=${weights_array_string}&maximums=${maximums_array_string}`;

                    res(<a href={relative_link}>Generated link</a>)
                })
            }>Generate link</CalculateButton>
        </MiddleCard>
    </MiddleCardWrapper>
}
