import React, { Fragment, useContext, useState } from "react";
import { Usercontext } from "../../context/Context";
import { withRouter, Redirect } from "react-router-dom";
import {
	makeStyles,
	Grid,
	Typography,
	TextField,
	Button,
	Snackbar,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// Styles
const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "30ch",
		},
	},
}));

function Login() {
	const { user, login } = useContext(Usercontext);

	const [datos, setDatos] = useState({
		email: "",
		contrasena: "",
	});

	const [open, setOpen] = useState(false);

	const [errorLogin, setErrorLogin] = useState("A ocurrido un error");

	// Handler forms
	const handleChange = (event) => {
		console.log(event.target.value);

		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		});
	};

	const handleonSubmit = async (event) => {
		event.preventDefault();
		// event.target.reset();
		if (datos.email.length === 0 || datos.contrasena.length === 0) {
			setErrorLogin("Ingresa tu email y contraseña");
			handleClick();
			return;
		}

		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("email", datos.email);
		formData.append("contrasena", datos.contrasena);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/LoginAdministrador.php",
			{
				method: "POST",
				mode: "cors",
				signal: abortController.signal,
				body: formData,
			}
		)
			.then((res) => res.json())
			.then((res) => {
				if (res === 401) {
					setErrorLogin("Usuario o contraseña incorrecta");
					handleClick();
					return;
				}

				login(res[0].nombre);
			})
			.catch((err) => {
				console.error("Request failed", err);
				setErrorLogin("A ocurrido un error, revisa tu conexion");
				handleClick();
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 1000);
	};

	// Handler alerts
	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	//


	// Styles
	const classes = useStyles();


	const button = (
		<Fragment>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: "100vh" }}
			>
				{/*<Grid>*/}
				<Typography variant="h4" component="h4">
					Iniciar sesión
				</Typography>

				<form
					onSubmit={handleonSubmit}
					className={classes.root}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="nombre_input"
						label="Email"
						variant="outlined"
						name="email"
						onChange={handleChange}
						required
					/>

					<br />

					<TextField
						id="email_input"
						label="Contraseña"
						variant="outlined"
						name="contrasena"
						type="password"
						onChange={handleChange}
						required
					/>

					<br />

					<Button type="submit" variant="contained" color="primary">
						Iniciar
					</Button>
				</form>

				{/*<Button onClick={handleClick}>A ocurrido un error</Button>*/}

				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
					message={errorLogin}
					action={
						<React.Fragment>
							{/*
							<Button
								color="secondary"
								size="small"
								onClick={handleClose}
							>
								UNDO
							</Button>
							*/}
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={handleClose}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</React.Fragment>
					}
				/>

				{/*	</Grid>*/}
				{/*<h3>{datos.email}</h3>*/}
				{/*<h3>{datos.contrasena}</h3>*/}
			</Grid>
		</Fragment>
	);

	
	return (
		<Fragment>
			{user.loggedIn ? (
				<Redirect to="/clientes" />
			) : (
				<Fragment>{button}</Fragment>
			)}
		</Fragment>
	);
}
export default withRouter(Login);
