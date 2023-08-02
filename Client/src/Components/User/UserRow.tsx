import './UserRow.scss'
import {FaEdit, FaTrash} from "react-icons/fa";

interface UserRowProps {
    name: string;
    email: string;
    phone: string;
}
export default function UserRow( {name, email, phone}: UserRowProps){
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td className={"delete-icon"}>
                <FaTrash/>
            </td>
            <td className={"edit-icon"}>
                <FaEdit/>
            </td>
        </tr>
    )
}
