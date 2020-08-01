import React, { Fragment, useState, useEffect } from "react";
import uniqid from "uniqid";
import CardApp from "../../../../../cardsApp/CardApp";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import {
	Card,
	CardContent,
	Typography,
	InputLabel,
	TextField,
	FormControl,
	Select,
	Snackbar,
	Button,
	makeStyles,
} from "@material-ui/core";

// import AdminComisionesId from "./AdminComisionesId";

// Icons
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// Styles
const useStyles = makeStyles({
	titlePrincipal: {
		marginLeft: 15,
	},
	root: {
		minWidth: 275,
		marginBottom: 20,
	},
	title: {
		fontSize: 22,
	},
	list: {
		margin: 0,
		padding: 10,
	},
	formControl: {
		width: 250,
	},
});

function FormComisionistas(props) {
	const { idCliente, nombreProyecto, data, comisionesData } = props;

	// Manejador de comisiones
	const [comisiones, setComisiones] = useState(
		comisionesData ? comisionesData : []
	);

	// Manejador de formulario
	const [datosForm, setDatosForm] = useState({
		id_unico: null,
		id_inventario: idCliente,
		inventario: atob(nombreProyecto),
		comisionista:
			data[0].length === 0 || data === null
				? `data,0`
				: `${data[0].nombre},${data[0].id} `,
		// comisionista: data[0] ? `${data[0].nombre},${data[0].id} ` : [],
		monto: 0,
		fecha: null,
		pago: false,
	});

	const [open, setOpen] = useState(false);
	const [error, setError] = useState("A ocurrido un error");

	useEffect(() => {
		console.log("COMISIONES", comisiones);
	}, [idCliente, data, comisiones]);

	const handleChange = (event) => {
		console.log(event.target.name, ":", event.target.value);

		setDatosForm({
			...datosForm,
			[event.target.name]: event.target.value,
		});
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

	// Generador de ID unico
	const uniqueId = uniqid();

	// Agregar un nuevo comisionista a la lista
	const agregarComisionista = (event) => {
		event.preventDefault();

		nuevaComision(
			datosForm.id_inventario,
			datosForm.inventario,
			datosForm.comisionista.split(",")[1],
			datosForm.comisionista.split(",")[0],
			datosForm.monto,
			new Date().toLocaleString(),
			datosForm.pago
		);
	};

	const eliminarComisionista = (id) => {
		let conf = window.confirm("Esta seguro de eliminar esta comisión?");

		if (conf === false) {
			return;
		}

		eliminarComision(id);
	};

	const nuevaComision = (
		id_inventario,
		inventario,
		id_comisionista,
		comisionista,
		monto,
		fecha,
		pago
	) => {
		// Insertar
		// setComisiones((newList) => [
		// 	...newList,
		// 	{
		// 		id: uniqueId,
		// 		monto: datosForm.monto,
		// 		comisionista: datosForm.comisionista,
		// 		fecha: fecha,
		// 	},
		// ]);

		if(id_inventario.length === 0 || inventario.length === 0){
			return;
		}

		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_unico", uniqueId);
		formData.append("id_inventario", id_inventario);
		formData.append("inventario", inventario);
		formData.append("id_comisionista", id_comisionista);
		formData.append("comisionista", comisionista);
		formData.append("monto", monto);
		formData.append("fecha", fecha);
		formData.append("pago", pago);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/comisionistas/nuevaComision.php",
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
					handleClick();
					setError("Error al crear comision");
					return;
				}

				// Insertar
				setComisiones((newList) => [
					...newList,
					{
						id_unico: uniqueId,
						monto: monto,
						descripcion: comisiones.descripcion,
						fecha: fecha,
					},
				]);

				// Clear form
				setDatosForm({
					monto: 0,
				});

				handleClick();
				setError("Éxito al crear comision");
				return;
			})
			.catch((err) => {
				console.error("Request failed", err);

				handleClick();
				setError("A ocurrido un error");
				return;
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 1000);

		//Controler
	};

	const eliminarComision = (id) => {
		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_unico", id);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/comisionistas/eliminarComisionId.php",
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
					handleClick();
					setError("Error al crear comision");
					return;
				}

				// Delete of list
				const newList = comisiones.filter(
					(item) => item.id_unico !== id
				);
				setComisiones(newList);

				handleClick();
				setError("Comisión eliminada con éxito");
			})
			.catch((err) => {
				console.error("Request failed", err);
				handleClick();
				setError("A ocurrido un error");
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 1000);

		//Controler
	};

	// Styles
	const classes = useStyles();

	return (
		<Fragment>
			<Card className={classes.root}>
				<CardContent>
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Comisiones
					</Typography>

					{comisiones === null || comisiones.length === 0
						? "No hay comisiones."
						: comisiones.map((item, i) => (
								<div key={i}>
									<CardApp
										id={item.id_unico}
										fecha={`${item.fecha}`}
										descripcion={item.comisionista}
										monto={item.monto}
										funcion={eliminarComisionista}
										icon={<PersonAddIcon />}
									/>
									<br />
								</div>
						  ))}

					{/*INHABILITY*/}

					<br />
					<br />
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Agregar comisionistas
					</Typography>

					<form onSubmit={(event) => agregarComisionista(event)}>
						<FormControl
							variant="filled"
							className={classes.formControl}
						>
							<InputLabel htmlFor="filled-age-native-simple">
								Comisionistas
							</InputLabel>
							<Select
								native
								inputProps={{
									name: "comisionista",
									id: "filled-age-native-simple",
								}}
								value={datosForm.comisionista}
								onChange={(event) => handleChange(event)}
							>
								{data === null ? (
									<option value="No hay">
										No hay comisionistas
									</option>
								) : (
									data.map((item) => (
										<option
											key={item.id}
											value={[item.nombre, item.id]}
										>
											{item.nombre}
										</option>
									))
								)}
							</Select>
						</FormControl>
						<br />
						<br />
						<TextField
							id="descripcion_input"
							label="Monto"
							variant="outlined"
							type="number"
							name="monto"
							onChange={(event) => handleChange(event)}
							value={datosForm.monto}
						/>
						<br />
						<br />
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Agregar
						</Button>
					</form>
				</CardContent>
			</Card>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message={error}
				action={
					<Fragment>
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
					</Fragment>
				}
			/>
		</Fragment>
	);
}

export default FormComisionistas;
