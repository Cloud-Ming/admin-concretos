import React, { Fragment, useState } from "react";
import {
	Card,
	CardContent,
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Select,
	Button,
	makeStyles,
} from "@material-ui/core";

function Papelera() {
	const [data, setData] = useState([]);

	const [form, setForm] = useState({
		id: 1,
		nombre: null,
		monto: null,
	});

	const clientes = [
		{
			id: "4",
			nombre: "Liliana",
			email: "liliana@gmail.com",
			celular: "300",
			cedula: "132786327",
			ciudad: "Bogot\u00e1",
		},
		{
			id: "3",
			nombre: "Edward",
			email: "edward@gmail.com",
			celular: "300",
			cedula: "21625976152",
			ciudad: "Bogot\u00e1",
		},
		{
			id: "2",
			nombre: "Cristian",
			email: "ceo@cloudming.co",
			celular: "300",
			cedula: "187280710",
			ciudad: "Pereira",
		},
		{
			id: "1",
			nombre: "Andres",
			email: "cto@cloudming.co",
			celular: "300",
			cedula: "187280718",
			ciudad: "Armenia",
		},
	];
	console.log(clientes);

	const ingresarData = () => {
		// console.log(1);
		setData((newList) => [
			...newList,
			{
				id: form.id++,
				nombre: form.nombre,
				monto: form.monto,
			},
		]);
	};

	const eliminarData = (id) => {
		const newList = data.filter((item) => item.id !== id);
		setData(newList);
	};

	const aggData = (event) => {
		console.log("Name:", event.target.value, "Value:", event.target.value);
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const useStyles = makeStyles({
		titlePrincipal: {
			marginLeft: 15,
		},
		root: {
			minWidth: 275,
			marginBottom: 20,
		},
		bullet: {
			display: "inline-block",
			margin: "0 2px",
			transform: "scale(0.8)",
		},
		title: {
			fontSize: 22,
		},
		pos: {
			marginBottom: 12,
		},
		list: {
			margin: 0,
			padding: 10,
		},
		formControl: {
			width: 200,
		},
	});

	const classes = useStyles();

	return (
		<Fragment>
			<FormControl variant="filled" className={classes.formControl}>
				<InputLabel htmlFor="filled-age-native-simple">
					Comisionistas
				</InputLabel>
				<Select
					native
					inputProps={{
						name: "cliente",
						id: "filled-age-native-simple",
					}}
				>
					{/*<option value="1">1</option>*/}
					{clientes.map((item) => (
						<option key={item.id} value={item.nombre}>
							{item.nombre}
						</option>
					))}
				</Select>
			</FormControl>
			<Card className={classes.root}>
				<CardContent>
					<div>
						<h1>Data</h1>
						{data.map((item) => (
							<div key={item.id}>
								{item.id}
								{item.nombre}
								{item.monto}
								<button onClick={() => eliminarData(item.id)}>
									Eliminar
								</button>
							</div>
						))}
						{/*<button onClick={}>Crear</button>*/}
					</div>
					<br />
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Gastos adicionales
					</Typography>

					<TextField
						id="outlined-basic"
						label="Nombre"
						variant="outlined"
						name="nombre"
						onChange={(el) => aggData(el)}
					/>
					<br />
					<br />
					<TextField
						id="outlined-basic"
						label="Monto"
						variant="outlined"
						name="monto"
						onChange={(el) => aggData(el)}
					/>
					<br />
					<br />
					<Button
						onClick={() => ingresarData()}
						variant="contained"
						color="primary"
					>
						Agregar
					</Button>
				</CardContent>
			</Card>
		</Fragment>
	);
}

export default Papelera;
// https://botanicainternacionalamazonas.com/backend/vista/comisionistas/cargarComisionistas.php?id=1
