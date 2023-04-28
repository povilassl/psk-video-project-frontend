import "../../css/LoginPage/loginPage.css";

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
						
			<input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
					<label htmlFor="reg-log"></label>
						  <div className="card-3d-wrap">
							<div className="card-3d-wrapper">
								<div className="card-front">
									<div className="center-wrap">
										<div className="inputSection">
											<h3>Log In</h3>
											<div className="form-group">
												<input type="username" className="form-style" placeholder="Username"/>
												<i className="input-icon uil uil-user"></i>
											</div>	
											<div className="form-group">
												<input type="password" className="form-style" placeholder="Password"/>
												<i className="input-icon uil uil-lock-alt"></i>
											</div>
											<a href="/login" className="btn">Login</a>
                      						<p><a href="/video" className="link">Want to change your password?</a></p>
				      					</div>
										  </div>
			      				</div>  
								<div className="card-back">
									<div className="center-wrap">
										<div className="inputSection">
											<h3>Sign Up</h3>
											<div className="form-group">
												<input type="text" className="form-style" placeholder="Username"/>
												<i className="input-icon uil uil-user"></i>
											</div>	
											<div className="form-group">
												<input type="email" className="form-style" placeholder="Email"/>
												<i className="input-icon uil uil-at"></i>
											</div>
											<div className="form-group">
												<input type="password" className="form-style" placeholder="Password"/>
												<i className="input-icon uil uil-lock-alt"></i>
											</div>
											<div className="form-group">
												<input type="text" className="form-style" placeholder="Name"/>
												<i className="input-icon uil uil-user"></i>
											</div>
											<div className="form-group">
												<input type="text" className="form-style" placeholder="Surname"/>
												<i className="input-icon uil uil-user"></i>
											</div>
											<a href="/login" className="btn mt-4">Register</a>
				      					</div>
			      				     

			      					</div>
			      				</div>

			      			</div>
			      		</div>
		</div>
    );
}

