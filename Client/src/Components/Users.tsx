import {gql, useQuery} from "@apollo/client";

const GET_USERS = gql`
    query getUsers {
    users{
        id
        name
        email
        phone
       } 
    }
    `;
export default function Users() {
    const {loading, error, data }=useQuery(GET_USERS);
    if (loading) return <p>Loading</p>
    if (error) return <p>Something went wrong</p>
    if(data) console.log(data.users) //

    return <>
        <div style={{background:'blue', width:'50rem', height:'20rem', color:'white'}}>
        {!loading && data.users && data.users.map((user:any) => () => {
            return <div key={user.id}>
                {user}
                {/*<p>{user.email}</p>*/}
                {/*<p>{user.phone}</p>*/}
            </div>
        }
        )}
        </div>
    </>
}
