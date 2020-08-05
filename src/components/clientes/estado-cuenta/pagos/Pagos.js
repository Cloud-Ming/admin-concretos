import React, { Fragment, useState } from "react";
import uniqid from "uniqid";
import {
	Card,
	CardContent,
	Typography,
	TextField,
	Snackbar,
	Button,
	makeStyles,
} from "@material-ui/core";

// Icons
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DescriptionIcon from "@material-ui/icons/Description";

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
});

function Pagos(props) {
	const { idCliente, pagos } = props;

	const [dataPagos, setDataPagos] = useState(pagos ? pagos : []);

	const [inputs, setInputs] = useState({ monto: 0, descripcion: "" });

	// Alertas
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("A ocurrido un error");

	// Forms handler
	const onChange = (event) => {
		console.log(event.target.name, event.target.value);
		setInputs({
			...inputs,
			[event.target.name]: event.target.value,
		});
	};

	// Generador IDs únicos
	const uniqueId = uniqid();

	const crearPago = (event) => {
		event.preventDefault();

		//send to backend
		sendData(
			uniqueId,
			new Date().toLocaleString(),
			inputs.monto,
			inputs.descripcion
		);
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

	const eliminarPago = (id) => {
		let conf = window.confirm("Esta seguro de eliminar este pago?");

		if (conf === false) {
			console.log("Se cancelo la eliminación");
			return;
		}

		// controller
		const abortController = new AbortController();

		var formData = new FormData();

		formData.append("id_unico", id);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/estados-cuenta/eliminarPagos.php",
			{
				method: "POST",
				mode: "cors",
				signal: abortController.signal,
				body: formData,
			}
		)
			.then((res) => res.text())
			.then((res) => {
				setError("Se elimino con éxito");
				handleClick();

				// Eliminar
				const newList = dataPagos.filter(
					(item) => item.id_unico !== id
				);
				setDataPagos(newList);
			})
			.catch((err) => {
				console.error("Request failed", err);
				setError("No se pudo eliminar");
				handleClick();
			});

		// Cancel the request if it takes more than 1 seconds
		setTimeout(() => abortController.abort(), 1000);
		//Controler
	};

	// Controler send
	const sendData = (id_unico, fecha, monto, descripcion) => {
		if (monto.length === 0) {
			setError("Agrega un monto mayor a 0");
			handleClick();
			return;
		}

		if (descripcion.length === 0) {
			setError("Agrega una descripción");
			handleClick();
			return;
		}
		// controller
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_cliente", idCliente);
		formData.append("id_inventario", idCliente);
		formData.append("id_unico", id_unico);
		formData.append("fecha", fecha);
		formData.append("monto", monto);
		formData.append("descripcion", descripcion);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/estados-cuenta/crearPago.php",
			{
				method: "POST",
				mode: "cors",
				signal: abortController.signal,
				body: formData,
			}
		)
			.then((res) => res.text())
			.then((res) => {
				if (res === 401) {
					setError("A ocurrido un error");
					handleClick();
					return;
				}

				// Reset form
				setInputs({
					monto: 0,
					descripcion: "",
				});

				setError("Pago creado con éxito");
				handleClick();

				// Agregar
				setDataPagos((newList) => [
					...newList,
					{
						id_unico: id_unico,
						fecha: fecha,
						monto: monto,
						descripcion: descripcion,
					},
				]);
			})
			.catch((err) => {
				console.error("Request failed", err);
				setError("A ocurrido un error");
				handleClick();
			});

		// Cancel the request if it takes more than 1 second
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
						Pagos
					</Typography>

					<div style={{ display: "flex", flexWrap: "wrap" }}>
						{dataPagos === null || dataPagos.length === 0
							? "No hay pagos registrados."
							: dataPagos.map((pago, index) => (
									<div
										key={index}
										style={{
											border: "1px solid #ddd",
											padding: 10,
											marginBottom: 10,
											marginLeft: 20,
										}}
									>
										<p>
											<b>Fecha:</b> {pago.fecha}
										</p>
										<p>
											<b>Descripción:</b>{" "}
											{pago.descripcion}
										</p>
										<p>
											<b>Monto:</b> ${pago.monto}
										</p>

										<div style={{ display: "flex" }}>
											<button
												onClick={() =>
													eliminarPago(pago.id_unico)
												}
											>
												Eliminar
											</button>
										</div>
									</div>
							  ))}
					</div>
					<br />
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Crear pago
					</Typography>

					<form onSubmit={(event) => crearPago(event)}>
						<TextField
							type="text"
							id="outlined-basic"
							label="Descripción"
							variant="outlined"
							value={inputs.descripcion}
							name="descripcion"
							onChange={(event) => onChange(event)}
						/>
						<br />
						<br />
						<TextField
							type="number"
							id="outlined-basic"
							label="Monto"
							variant="outlined"
							value={inputs.monto}
							name="monto"
							onChange={(event) => onChange(event)}
						/>
						<br />
						<br />
						<div>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								startIcon={<DescriptionIcon />}
							>
								Crear pago
							</Button>
						</div>
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

export default Pagos;
