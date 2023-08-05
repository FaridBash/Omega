import UsersTable from "../Components/User/UsersTable.tsx";
import './UsersPage.scss'
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import DropdownList from "../Components/DropDownList/DropDownList.tsx";
import {useEffect, useState} from "react";


const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
});
function UsersPage() {
    // const [selectedRoleOption, setSelectedRoleOption] = useState<string>('');
    const [optionArray, setOptionArray] = useState<string[]>(["Admin","Teacher"]);

    useEffect(() => {
console.log("optionArray", optionArray);
    }, [optionArray]);
    function handleOption(selectedOption: string[]) {
        console.log('selectedOption',selectedOption);
        if(selectedOption[0] === 'All') {
            // setSelectedRoleOption('All');
            setOptionArray(["All"]);
            return;
        }
        if(optionArray.includes("All")) {
            setOptionArray([selectedOption[0]]);
            return;
        }
        if(optionArray.includes(selectedOption[0])) return;
        // setSelectedRoleOption(selectedOption[0]);

        setOptionArray((optionArray) => [...optionArray, selectedOption[0]]);
        console.log(optionArray);
    }

    return (
        <ApolloProvider client={client}>
        <div className={"users-page-container"}>
            <div className={"users-table-conatiner"}>
                <div className={"table-filter-panel"}>
                    <div className={"select-container"}>
                        <DropdownList handleOptionChange={handleOption}/>
                    </div>
                    <div className={"filter-options"}>
                    {optionArray.length > 0 && (optionArray.map((option) => {
                        return <div className={"option-container"}  key={option}>{option}</div>
                    }
                    ))}
                    </div>
                </div>

                <UsersTable usersToDisplay={optionArray} />
            </div>

            </div>
        </ApolloProvider>
    )
}


export default UsersPage;