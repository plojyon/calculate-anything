import React, { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import CalculateButton from "./CalculateButton";
import InputField from "./InputField";

import {MiddleCard, MiddleCardWrapper} from "./MiddleCard"

const Title = styled.div`
    font-size: 1.5em;
    padding:.5em;
`;

export default () => {
    const { search } = useLocation();

    const searchParams = new URLSearchParams(search);
    const weights_string = searchParams.get('weights');
    const title_string = searchParams.get('title');
    const input_array = JSON.parse(searchParams.get('inputs'));
	const maximums_array = JSON.parse(searchParams.get('maximums'));
	const weight_array = JSON.parse(searchParams.get('weights'));

    const inputs = input_array;
    const [selected, setSelected] = useState(-1);
    const [datahook, setDatahook] = useState(inputs.map(() => ""));

    return <MiddleCardWrapper><MiddleCard>
        <Title>{title_string || "Untitled calculator"}</Title>
        {inputs.map((input_name, i) => (
            <InputField
                selected={i == selected}
                setSelected={() => setSelected(i)}
                input_name={input_name + " (points out of "+ maximums_array[i] +")"}
                onBlur={() => {setSelected(-1)}}
                onChange={newText => {setDatahook(datahook.map((v, j) => i == j? newText : v))}}
            ></InputField>
        ))}

        <CalculateButton execute_function={() => new Function(`input_array`, `weight_array`, `maximums_array`, `return new Promise((resolve, reject) => {
			let sum = 0;
			console.log(input_array, weight_array, maximums_array);
			for (let i in input_array) {
				console.log(i);
				sum += input_array[i] * weight_array[i] / maximums_array[i];
			}
			resolve(sum);
        })`).call(null, datahook, weight_array, maximums_array)}>Calculate</CalculateButton>
    </MiddleCard></MiddleCardWrapper>
}
