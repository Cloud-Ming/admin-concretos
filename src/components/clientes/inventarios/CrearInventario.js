import React, { Fragment, useState } from "react";
// import { Usercontext } from "../../context/Context";
import { useParams } from "react-router-dom";
import {
	makeStyles,
	Grid,
	Typography,
	TextField,
	Button,
	Snackbar,
	Divider,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function CrearInventario() {
	const { id } = useParams();
	console.log(id);

	const [datos, setDatos] = useState({
		id_proyecto: id,
		fecha: "",
		descripcion: "",
	});

	const [servicesState, setServicesState] = useState([]);

	const [datosForm, setDatosForm] = useState({
		id: 1,
		client: "",
		service: "",
		price: 0,
		count: 0,
	});

	// CREACION SERVICIOS

	const handleChangeServices = (event) => {
		console.log(event.target.name, datosForm);
		setDatosForm({
			...datosForm,
			[event.target.name]: event.target.value,
		});
	};

	const addService = () => {
		setServicesState((newList) => [
			...newList,
			{
				id: datosForm.id++,
				service: datosForm.service,
				price: datosForm.price,
				count: datosForm.count,
			},
		]);
	};

	const removeService = (id) => {
		console.log(id);
		const newList = servicesState.filter((item) => item.id !== id);
		setServicesState(newList);
	};
	// CREACION SERVICIOS

	const [open, setOpen] = useState(false);
	const [errorLogin, setErrorLogin] = useState("A ocurrido un error");

	const useStyles = makeStyles((theme) => ({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				width: "30ch",
			},
		},
	}));

	const classes = useStyles();

	const handleChange = (event) => {
		console.log(event.target.name, event.target.value);

		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		});
	};

	const handleonSubmit = async (event) => {
		event.preventDefault();
		//event.target.reset();
		console.log(datos);

		if (
			datos.id_proyecto.length === 0 ||
			datos.fecha.length === 0 ||
			servicesState.length === 0 ||
			datos.descripcion.length === 0
		) {
			setErrorLogin("Completa todo los campos");
			handleClick();
			return;
		}

		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_proyecto", datos.id_proyecto);
		formData.append("fecha", datos.fecha);
		formData.append("inventario", JSON.stringify(servicesState));
		formData.append("descripcion", datos.descripcion);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/clientes/inventarios/nuevoInventario.php",
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
					setErrorLogin("Error al crear usuario");
					handleClick();
					return;
				}

				console.log(res);
			})
			.catch((err) => {
				console.error("Request failed", err);
				setErrorLogin("A ocurrido un error");
				handleClick();
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 5000);
	};

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
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
					Crear inventario
				</Typography>

				<form
					onSubmit={handleonSubmit}
					className={classes.root}
					noValidate
					autoComplete="off"
				>
					{/*<input type="hidden" name="id_proyecto" value={id} />*/}

					{/*label="Fecha"*/}
					<TextField
						id="fecha_input"
						variant="outlined"
						name="fecha"
						type="date"
						onChange={handleChange}
						required
					/>

					<Divider />

					{servicesState.map((el) => (
						<div key={el.id} className="itemSevice">
							{el.service} &nbsp; - &nbsp;
							{el.price} &nbsp; - &nbsp;
							{el.count} &nbsp; - &nbsp;
							<button onClick={() => removeService(el.id)}>
								x
							</button>
						</div>
					))}

					{/* <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Servicio</InputLabel>
        <Select
          native
          value={datosForm.service}
          onChange={handleChange}
          label="Servicio"
          name="service"
        >
          <option aria-label="None" value="" />
          <option value={`Concreto`}>Concreto</option>
          <option value={`Bomba`}>Bomba</option>
          <option value={`Bomba estacionaria`}>Bomba estacionaria</option>
        </Select>
      </FormControl>*/}

					<TextField
						id="descripcion_input"
						label="Servicio"
						variant="outlined"
						type="text"
						name="service"
						onChange={handleChangeServices}
						required
					/>
					<br />
					<TextField
						id="descripcion_input"
						label="Precio"
						variant="outlined"
						type="text"
						name="price"
						onChange={handleChangeServices}
						required
					/>
					<br />
					<TextField
						id="descripcion_input"
						label="Cantidad"
						variant="outlined"
						type="text"
						name="count"
						onChange={handleChangeServices}
						required
					/>
					<br />
					<Button
						type="button"
						onClick={() => addService()}
						variant="contained"
						color="primary"
					>
						Añadir
					</Button>
					<br />
					<button
						type="button"
						onClick={() => console.log(servicesState)}
					>
						Contar estado servicios
					</button>

					<Divider />

					<TextField
						id="descripcion_input"
						label="Descripción"
						variant="outlined"
						name="descripcion"
						type="text"
						onChange={handleChange}
						required
					/>

					<br />

					<Button type="submit" variant="contained" color="primary">
						Crear inventario
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
}

export default CrearInventario;
