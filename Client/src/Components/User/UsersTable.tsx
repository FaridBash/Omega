import {useQuery} from "@apollo/client";
import './UsersTable.scss'
import UserRow from "./UserRow.tsx";
import {GET_ALL_USERS, GET_USERS_BY_ROLE, GET_USERS_BY_SINGLE_ROLE} from "../../queries/userQueries.ts";
import Spinner from "../Spinner/Spinner.tsx";
import {useState} from "react";


interface UsersTableProps {
    usersToDisplay: string[];
}
export default function UsersTable({usersToDisplay}: UsersTableProps) {
    const [usersKey, setUsersKey] = useState<string>("");
    let dataKey="";
    const {loading, error, data }=useQuery(usersToDisplay[0]==="All"? GET_ALL_USERS : GET_USERS_BY_ROLE, {
        variables: { role: usersToDisplay} });
    if (loading) return <div className={"spinner-container"}><Spinner/></div>
    if (error) return <p>Something went wrong</p>
    if(data) dataKey=(Object.keys(data)[0]);
    // setUsersKey(dataKey);
    console.log(dataKey)


    return <>
        <div className={"users-container"}>

        {!loading && !error && data[dataKey] &&
            (<table className={"table-container"}>
                <thead className={"table-head"}>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
                </thead>

            <tbody className={"fixed-height-tbody"}>

            {data[dataKey].map((user:any) =>{return (
                <UserRow  {...user} key={user.id}/>
                )} )}

            </tbody>
            </table>)
        }
        </div>
    </>
}
