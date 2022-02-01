import {useEffect} from 'react';

import {TermsAndConditionsData} from "../default-data/TermsAndConditionsInfo.js"
import Fields from "../default-data/Fields";

const TermsAndConditions = () => {


    return (
        <div>
            <h3>{TermsAndConditionsData.MainTitle}</h3>
            <h4>{TermsAndConditionsData.SecondTitle}</h4>
            <Fields fields={TermsAndConditionsData.Fields}></Fields>
            <h4>{TermsAndConditionsData.ThirdTitle}</h4>
            <p>{TermsAndConditionsData.Data}</p>
            <h4>{TermsAndConditionsData.FourthTitle}</h4>
            <div>
                {TermsAndConditionsData.Finalidades.map((text, index) => <p key={index}>{text}</p>)}
            </div>

        </div>
    )
}

export default TermsAndConditions
