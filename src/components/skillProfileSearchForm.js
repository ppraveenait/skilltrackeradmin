import React, { useState } from 'react';
import '../style.css';
import appConfigData from './../config/appconfig.json';

function SkillProfileSearchForm() {
    const [name, setName] = useState('');
    const [associateId, setAssociateId] = useState('');
    const [skill, setSkill] = useState('');
    let [responseData, setResponseData] = React.useState('')

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        console.log(id);
        if (id === "name") {
            setName(value);
        }
        if (id === "associateId") {
            setAssociateId(value);
        }
        if (id === "skill") {
            setSkill(value);
        }

    }

    const handleSubmit = (searchCriteria) => {
        console.log(name, associateId, skill);
        let pathParam = searchCriteria + "/";
        if ("name" === searchCriteria) {
            pathParam = pathParam + name;
        } else if ("associateId" === searchCriteria) {
            pathParam = pathParam + associateId;
        } else {
            pathParam = pathParam + skill;
        }
        //const serviceUrl = 'https://querypatterensvc.azurewebsites.net/admin/' + pathParam;
        const serviceUrl = appConfigData.development.SKILLTRACKER_API_URL + pathParam;
        console.log(serviceUrl);
        fetch(serviceUrl)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data.result)
                setResponseData(data.result);
            })
    }


    return (
        <div className="form">
            <div className="form-body">
                <table className="search">
                    <tr>
                        <th colSpan="2">Search Value</th>
                    </tr>
                    <tr>
                        <td><div className="name">

                            <input className="form__input" type="text" value={name} onChange={(e) => handleInputChange(e)} id="name" placeholder="Assicate Name" />
                        </div></td>
                        <td><div className="name">
                            <button onClick={() => handleSubmit("name")} type="submit" className="btn">NAME</button>

                        </div></td>
                    </tr>

                    <tr>
                        <td> <div className="associateId">
                            <input type="text" name="" value={associateId} onChange={(e) => handleInputChange(e)} id="associateId" className="form__input" placeholder="Associate Id" />
                        </div></td>

                        <td> <div className="associateId">
                            <button onClick={() => handleSubmit("associateId")} type="submit" className="btn">ASSOCIATE ID</button>
                        </div></td>

                    </tr>
                    <tr>
                        <td><div className="skill">

                            <input type="text" value={skill} onChange={(e) => handleInputChange(e)} id="skill" className="form__input" placeholder="Skill" />
                        </div></td>

                        <td><div className="skill">
                            <button onClick={() => handleSubmit("skillName")} type="submit" className="btn">SKILL</button>

                        </div></td>
                    </tr>
                </table>
            </div>
            <div className="form-body">
                {responseData.length > 0 && responseData.map((data, key) => {
                    return (
                        <table className="result">
                            <tr key={key}>
                                <td width="500px">
                                    <table >
                                        <tr>
                                            <th colSpan="2">Profile Details</th>
                                        </tr>
                                        <tr>
                                            <th> Name  </th>
                                            <td> {data.name}</td>
                                        </tr>
                                        <tr>
                                            <th> Associate Id   </th>
                                            <td> {data.associateId}</td>
                                        </tr>
                                        <tr>
                                            <th> Email  </th>
                                            <td> {data.email}</td>
                                        </tr>
                                        <tr>
                                            <th> Mobile  </th>
                                            <td> {data.mobile}</td>
                                        </tr>
                                        <tr>
                                            <th> Length  </th>
                                            <td> {data.technicalSkills.length}</td>

                                        </tr>
                                    </table>
                                </td>
                                <td width="250px">
                                    <table>
                                        <tr>
                                            <th colSpan="2">Technical Details</th>
                                        </tr>
                                        {data.technicalSkills.length > 0 && data.technicalSkills.map((res) => {
                                            return (
                                                <tr>
                                                    <td> {res.skillName}</td>
                                                    <td> {res.expertiseLevel}</td>
                                                </tr>
                                            )
                                        })}
                                    </table>
                                </td>
                                <td width="250px">
                                    <table>
                                        <tr>
                                            <th colSpan="2">Non Technical Details</th>
                                        </tr>
                                        {data.nonTechnicalSkills.length > 0 && data.nonTechnicalSkills.map((res) => {
                                            return (
                                                <tr>
                                                    <td> {res.skillName}</td>
                                                    <td> {res.expertiseLevel}</td>
                                                </tr>
                                            )
                                        })}
                                    </table>
                                </td>
                            </tr>
                        </table>
                    )
                }
                )}
            </div>
        </div>
    )
}
export default SkillProfileSearchForm;