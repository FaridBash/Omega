
interface DropdownListProps {
    handleOptionChange: (optionValues: string[]) => void;
}

const DropdownList: React.FC<DropdownListProps> = ({ handleOptionChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const optionValues = Array.from(event.target.selectedOptions, (option) => option.value);
        handleOptionChange(optionValues);
    };

    return (
        <div>
            <select defaultValue={""} onChange={handleChange} >
                <option value="All">View All</option>
                <option value="Admin">Admin</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
            </select>
        </div>
    );
};

export default DropdownList;
