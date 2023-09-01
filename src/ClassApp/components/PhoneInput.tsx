import { ErrorMessage } from "../../ErrorMessage";

type PhoneProps = {
	error: string;
	hasError: boolean;
}  & React.InputHTMLAttributes<HTMLInputElement>;

/*
		...props spread operator allows to carry over all the attributes that
		are available for the input field and add those attributes to the 
		component
	*/
const PhoneInput: React.FC<PhoneProps> = ({error, hasError, ...props}) => (
	<>
		<div className="input-wrap">
        <input className="input-root" {...props}/>
		</div>
		<ErrorMessage message={error} show={hasError} />
	</>
)

export default PhoneInput;