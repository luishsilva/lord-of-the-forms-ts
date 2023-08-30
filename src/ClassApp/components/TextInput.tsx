import { ErrorMessage } from "../../ErrorMessage";

type InputProps = {
	label: string;
	error: string;
	hasError: boolean;
}  & React.InputHTMLAttributes<HTMLInputElement>;

/*
		...props spread operator allows to carry over all the attributes that
		are available for the input field and add those attributes to the 
		component
	*/
const TextInput: React.FC<InputProps> = ({label, error, hasError, ...props}) => (
	<>
		<div className="input-wrap">
			<label>{label}:</label>
			<input className="input-root" {...props}/>
		</div>
		<ErrorMessage message={error} show={hasError} />
	</>
)

export default TextInput;