import "../../css/UsersPages/loginPage.css";
import { Register } from "./Register";
import { Login } from "./Login";

export function LoginRegisterPage() {

	return (
		<div className="loginPageSection">
			<div className="switchButtonDiv">
				<h4>
					<span>Log In </span>
				</h4>
				<h4>
					<span>Sign Up</span>
				</h4>
			</div>

			<input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
			<label htmlFor="reg-log"></label>
			<div className="card-3d-wrap">
				<div className="card-3d-wrapper">
					<Login />
					<Register />
				</div>
			</div>
		</div>
	);
}

