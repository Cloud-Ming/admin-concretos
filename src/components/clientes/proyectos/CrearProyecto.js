import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
// import { Usercontext } from "../../context/Context";
import { useParams } from "react-router-dom";
import {
	makeStyles,
	Grid,
	TextField,
	Button,
	Snackbar,
	// Typography,
} from "@material-ui/core";

// Icons
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import BusinessCenter from "@material-ui/icons/BusinessCenter";

// Styles
const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "30ch",
		},
	},
	grid: {
		marginTop:"25px",
		marginBottom:"25px",
	},
}));

function CrearProyecto() {
	const { id, cliente } = useParams();
	const [datos, setDatos] = useState({
		id_cliente: id,
		nombre: "",
		descripcion: "",
	});

	const [open, setOpen] = useState(false);
	const [errorLogin, setErrorLogin] = useState("A ocurrido un error");

	// Handler forms
	const handleChange = (event) => {
		console.log(event.target.name, event.target.value);

		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		});
	};

	const handleonSubmit = async (event) => {
		event.preventDefault();

		if (
			datos.id_cliente.length === 0 ||
			datos.nombre.length === 0 ||
			datos.descripcion.length === 0
		) {
			setErrorLogin("Completa todo los campos");
			handleClick();
			return;
		}

		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_cliente", datos.id_cliente);
		formData.append("nombre", datos.nombre);
		formData.append("descripcion", datos.descripcion);
		formData.append("fecha", new Date().toLocaleString());

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/clientes/proyectos/crearProyecto.php",
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
					setErrorLogin("Error al crear proyecto");
					handleClick();
					return;
				}

				setDatos({
					nombre: "",
					descripcion: "",
				});

				setErrorLogin("Éxito, proyecto creado");
				handleClick();
			})
			.catch((err) => {
				console.error("Request failed", err);
				setErrorLogin("A ocurrido un error");
				handleClick();
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 1000);
	};

	// Alertas
	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	// Styles
	const classes = useStyles();

	return (
		<Fragment>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				className={classes.grid}
			>
			{/*	<Typography variant="h4" component="h4">
					Crear proyecto ({atob(cliente)})
				</Typography>*/}

				<form
					onSubmit={handleonSubmit}
					className={classes.root}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="nombre_input"
						label="Nombre proyecto"
						variant="outlined"
						name="nombre"
						type="text"
						onChange={handleChange}
						value={datos.nombre}
					/>

					<br />

					<TextField
						id="descripcion_input"
						label="Descripción"
						variant="outlined"
						name="descripcion"
						type="text"
						onChange={handleChange}
						value={datos.descripcion}
					/>

					<br />
					<br />

					<Button
						type="submit"
						variant="contained"
						color="primary"
						startIcon={<BusinessCenter />}
						className={classes.sendButton}
					>
						Crear proyecto
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
						<Fragment>
							{
								<Button
									component={Link}
									to={`/ver-proyectos/${id}/${cliente}`}
									color="secondary"
									size="small"
									onClick={handleClose}
								>
									VER
								</Button>
							}
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={handleClose}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</Fragment>
					}
				/>
			</Grid>
		</Fragment>
	);
}

export default CrearProyecto;
