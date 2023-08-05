import './UserRow.scss'
import {FaEdit, FaTrash, FaEye} from "react-icons/fa";
import {useMutation} from "@apollo/client";
import {Delete_User} from "../../mutations/userMutations";
import {GET_ALL_USERS} from "../../queries/userQueries";

interface UserRowProps {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthdate: string;
    address: string;
    gender: string;
    qualification: string;
    role: string;
}

const UserRow: React.FC<UserRowProps>=(props) => {
    const [deleteUser] = useMutation(Delete_User, {
        variables: {id: props.id},
        update(cache, {data: {deleteUser}}) {
            const {users} = cache.readQuery({query: GET_ALL_USERS});
            cache.writeQuery({
                query: GET_ALL_USERS,
                data: {users: users.filter((user: any) => user.id !== deleteUser.id)},
            });
        }
    });
    const handleDelete = async () => {
        try {
            await deleteUser();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td className={"icons-container"}>
                <div className={"view-container"}>
                <FaEye/>
                </div>
                <div className={"edit-container"}>
                    <FaEdit/>
                </div>
                <div className={"trash-container"}>
                    <FaTrash onClick={handleDelete}/>
                </div>
            </td>
        </tr>
    )
}

export default UserRow;