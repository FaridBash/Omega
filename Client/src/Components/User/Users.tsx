import {useQuery} from "@apollo/client";
import './Users.scss'
import UserRow from "./UserRow.tsx";
import {GET_USERS} from "../../queries/userQueries.ts";
import Spinner from "../Spinner/Spinner.tsx";

export default function Users() {

    const {loading, error, data }=useQuery(GET_USERS);
    if (loading) return <Spinner/>
    if (error) return <p>Something went wrong</p>
    if(data) console.log(data.users) //

    return <>
        <div className={"users-container"}>

        {!loading && !error && data.users &&
            (<table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
                </thead>

            <tbody>
            {data.users.map((user:any) =>{return (
                <UserRow {...user}/>
                )} )}
            </tbody>
            </table>)
        }
        </div>
    </>
}
