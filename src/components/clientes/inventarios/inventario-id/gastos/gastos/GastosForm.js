import React, { Fragment, useState, useEffect } from "react";
import uniqid from "uniqid";

import CardApp from "../../../../../cardsApp/CardApp";

import {
	Card,
	CardContent,
	Snackbar,
	Typography,
	TextField,
	Button,
	makeStyles,
} from "@material-ui/core";

// Icons
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

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

function GastosForm(props) {
	const { id_cliente, gastos } = props;

	const [update, setUpdate] = useState(null);

	const [data, setData] = useState(
		gastos[0].gastos ? JSON.parse(gastos[0].gastos) : []
	);

	const [formData, setFormData] = useState({
		id: null,
		monto: 0,
		descripcion: "",
		fecha: new Date().toLocaleString(),
	});

	const [open, setOpen] = useState(false);
	const [error, setError] = useState("A ocurrido un error");

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

	useEffect(() => {
		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id", id_cliente);
		formData.append("objeto", JSON.stringify(data));

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/clientes/inventarios/agregarGastosId.php",
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

				if (update === "succes") {
					setError("Gasto agregado con éxito");
					handleClick();
				} else if (update === "delete") {
					setError("Gasto eliminado con éxito");
					handleClick();
				}
				return;
			})
			.catch((err) => {
				console.error("Request failed", err);
				if (update === "succes") {
					setError("A ocurrido un error");
					handleClick();
				}
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 1000);

		//Controler
	}, [update, data, id_cliente]);

	// Generador de ID unico
	let uniqueId = uniqid();

	const ingresarData = (e) => {
		e.preventDefault();

		setFormData({
			monto: 0,
			descripcion: "",
		});

		setData((newList) => [
			...newList,
			{
				id: uniqueId,
				monto: formData.monto,
				descripcion: formData.descripcion,
				fecha: new Date().toLocaleString(),
			},
		]);

		setUpdate("succes");
	};

	const eliminarData = (id) => {
		let conf = window.confirm("Esta seguro de eliminar este gasto");

		if (conf === false) {
			console.log("Cancel");
			return;
		}

		const newList = data.filter((item) => item.id !== id);
		setData(newList);
		console.log(id);
		setUpdate("delete");
	};

	const onChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	// Styles
	const classes = useStyles();

	return (
		<Fragment>
			<Card className={classes.root}>
				<CardContent>
					<div>
						<Typography
							className={classes.title}
							color="textSecondary"
							gutterBottom
						>
							Gastos adicionales
						</Typography>
						{data === null || data.length === 0
							? "No hay gastos adicionales."
							: data.map((item, i) => (
									<div key={i}>
										<CardApp
											id={item.id}
											fecha={item.fecha}
											descripcion={item.descripcion}
											monto={item.monto}
											funcion={eliminarData}
											icon={<MoneyOffIcon />}
										/>
										<br />
									</div>
							  ))}

						<br />
					</div>
					<br />
					<form onSubmit={(e) => ingresarData(e)}>
						<Typography
							className={classes.title}
							color="textSecondary"
							gutterBottom
						>
							Agregar gastos
						</Typography>
						<TextField
							id="outlined-basic"
							label="Descripcion"
							variant="outlined"
							value={formData.descripcion}
							name="descripcion"
							onChange={(event) => onChange(event)}
						/>
						<br />
						<br />

						<TextField
							id="outlined-basic"
							label="Monto"
							variant="outlined"
							name="monto"
							type="number"
							value={formData.monto}
							onChange={(event) => onChange(event)}
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
						{/*<button onClick={()=>senData()}>Send data</button>*/}
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

export default GastosForm;
// https://botanicainternacionalamazonas.com/backend/vista/comisionistas/cargarComisionistas.php?id=1
